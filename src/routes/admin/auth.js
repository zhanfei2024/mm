// debug
const debug = require('debug')('APP:ADMIN_AUTH');

// model
const models = require('../../models');

// validate
const inputCheck = require('input-check');
const validateHelper = require('../../helpers/ValidateHelper');

// library
const _ = require('lodash');
const randomstring = require("randomstring");
const moment = require("moment");
const passport = require('passport');

// method
const modelHelper = require('../../methods/model');
const jobs = require('../../jobs');
const rateLimitMethod = require('../../methods/RateLimitMethod');

// jwt
const jwt = require('jsonwebtoken');
const jwtConfig = require('../../config/auth');
const uuid = require('node-uuid');

// email
const adminRoute = require('../../routes/admin');

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const JwtStrategyOption = {
  jwtFromRequest: ExtractJwt.fromAuthHeader(),
  secretOrKey: jwtConfig.secret,
  issuer: jwtConfig.issuer,
  audience: 'yoov.com',
  algorithms: 'HS256',
  expiresIn: 240, // minutes
};

function passportJwtStrategy(options = {}) {
  return new JwtStrategy(_.extend(JwtStrategyOption, options), async (jwtPayload, done) => {
    try {
      const result = await models.Admin.findOne({ where: { id: jwtPayload.subjectId } });
      if (result === null) return done(null, false);
      return done(null, result);
    } catch (err) {
      return done(err, false);
    }
  });
}

async function login(req, res, next) {
  debug('Enter login method!');

  const rules = {
    email: 'required|email|min:6|max:100',
    password: 'required|min:6',
  };
  const input = validateHelper.pick(req.body, rules);

  try {
    await inputCheck.validate(input, rules, res.validatorMessage);
  } catch (err) {
    return res.validateError(err);
  }

  let t = await models.sequelize.transaction();
  try {
    input.email = String(input.email).toLowerCase();

    let result = await models.Admin.findOne({
      where: {
        email: input.email,
      },
      transaction: t
    });
    if (result === null) throw new MainError('auth', 'doNotHaveAccount');

    if (result.active === false) throw new MainError('auth', 'frozen');

    const matchPassword = result.validatePassword(input.password);
    if (matchPassword === false) throw new MainError('auth', 'emailOrPasswordIncorrect');

    let token = jwt.sign({ type: 'admin', subjectId: result.id }, jwtConfig.secret, {
      algorithm: JwtStrategyOption.algorithms,
      issuer: JwtStrategyOption.issuer,
      audience: JwtStrategyOption.audience,
      expiresIn: `${JwtStrategyOption.expiresIn}m`
    });

    const refreshToken = randomstring.generate(64);
    await models.AdminSession.create({
      adminId: result.id,
      token: refreshToken,
      agent: req.headers['admin-agent'],
      ip: req.ip,
      lastUsedAt: new Date()
    }, { transaction: t });

    await rateLimitMethod.reset(`publicLoginLimit:${req.ip}`);
    await t.commit();

    return res.item({
      tokenType: 'JWT',
      accessToken: token,
      expiresIn: JwtStrategyOption.expiresIn,
      refreshToken,
    });
  } catch (err) {
    await t.rollback();
    return next(err);
  }
}

async function refreshToken(req, res, next) {
  debug('Enter refreshToken method!');

  const rules = {
    refreshToken: 'required|string|min:40',
  };
  const input = validateHelper.pick(req.body, rules);

  try {
    await inputCheck.validate(input, rules, res.validatorMessage);
  } catch (err) {
    return res.validateError(err);
  }

  let t = await models.sequelize.transaction();
  try {
    const accessToken = ExtractJwt.fromAuthHeader()(req);
    const payload = jwt.decode(accessToken);

    if (payload.subjectId !== String(res.locals.adminAuth.id)) throw new MainError('common', 'notFound');

    const session = await models.AdminSession.findOne({
      where: {
        adminId: res.locals.adminAuth.id,
        token: input.refreshToken,
      },
      transaction: t,
    });
    if (session === null) throw new MainError('auth', 'emailOrPasswordIncorrect');

    let token = jwt.sign({ type: 'admin', subjectId: session.adminId }, jwtConfig.secret, {
      algorithm: 'HS256',
      issuer: JwtStrategyOption.issuer,
      audience: JwtStrategyOption.audience,
      expiresIn: `${JwtStrategyOption.expiresIn}m`
    });

    await session.updateAttributes({
      lastUsedAt: moment.utc().toISOString(),
    });

    await t.commit();

    return res.item({
      tokenType: 'JWT',
      accessToken: token,
      expiresIn: JwtStrategyOption.expiresIn,
    });

  } catch (err) {
    await t.rollback();
    return next(err);
  }
}

async function register(req, res, next) {
  debug('Enter register method!');

  const rules = {
    firstName: 'min:1',
    lastName: 'min:1',
    email: 'required|email|min:6|max:100',
    password: 'required|min:6',
    superToken: 'required|in:yoovteamadmin'
  };
  const input = validateHelper.pick(req.body, rules);

  try {
    await inputCheck.validate(input, rules, res.validatorMessage);
  } catch (err) {
    return res.validateError(err);
  }

  let t = await models.sequelize.transaction();
  try {
    input.email = String(input.email).toLowerCase();

    const result = await models.Admin.findOne({ where: { email: input.email }, transaction: t });
    if (result !== null) throw new MainError('auth', 'accountAlreadyExist');

    let admin = await models.Admin.create(input, { transaction: t });

    await t.commit();

    req.params.adminId = admin.id;
    return adminRoute.show(req, res, next);
  } catch (err) {
    await t.rollback();
    return next(err);
  }
}

async function forgetPassword(req, res, next) {
  debug('Enter forgetPassword method!');

  const rules = {
    email: 'required|email|min:6|max:100'
  };
  const input = validateHelper.pick(req.body, rules);

  try {
    await inputCheck.validate(input, rules, res.validatorMessage);
  } catch (err) {
    return res.validateError(err);
  }

  let t = await models.sequelize.transaction();
  try {
    input.email = String(input.email).toLowerCase();

    let admin = await models.Admin.findOne({ where: { email: input.email }, transaction: t });
    if (admin === null) throw new MainError('common', 'notFound');

    if (moment.utc().diff(moment.utc(admin.emailTokenUpdatedAt), 'seconds') < 60) throw new MainError('auth', 'forgetPasswordEmailSentAlready');

    const token = randomstring.generate(40);
    await admin.updateAttributes({
      emailToken: token,
      emailTokenUpdatedAt: moment.utc().toISOString(),
    }, { transaction: t });

    await jobs.create('email::auth::forget_password', {
      admin: admin, token: token
    });

    await t.commit();

    return res.return();
  } catch (err) {
    await t.rollback();
    return next(err);
  }
}

async function resetPassword(req, res, next) {
  debug('Enter resetPassword method!');

  const rules = {
    email: 'required|email|string|min:6|max:100',
    token: 'required|string|min:1',
    password: 'required|string|min:6',
  };
  const input = validateHelper.pick(req.body, rules);

  try {
    await inputCheck.validate(input, rules, res.validatorMessage);
  } catch (err) {
    return res.validateError(err);
  }

  let t = await models.sequelize.transaction();

  try {
    input.email = String(input.email).toLowerCase();

    let admin = await models.Admin.findOne({
      where: {
        email: input.email,
        emailToken: input.token,
      },
      transaction: t
    });
    if (admin === null)  throw new MainError('common', 'notFound');

    if (moment.utc().diff(moment.utc(admin.emailTokenUpdatedAt), 'hours') > 24) throw new MainError('auth', 'emailTokenExpired');

    await Promise.all([
      admin.updateAttributes({
        password: input.password,
        emailToken: null,
        emailTokenUpdatedAt: null,
      }, { transaction: t }),
      models.AdminSession.destroy({
        where: {
          adminId: admin.id
        },
        transaction: t,
      }),
    ]);


    await t.commit();
    return res.return();
  } catch (err) {
    await t.rollback();
    return next(err);
  }
}

async function changePassword(req, res, next) {
  debug('Enter changePassword method!');

  const rules = {
    oldPassword: 'required|string|min:6',
    password: 'required|string|min:6',
    verifyPassword:'required|string|min:6'

  };
  const input = validateHelper.pick(req.body, rules);

  try {
    if(input.password !== input.verifyPassword) throw new MainError('auth', 'passwordError');

    await inputCheck.validate(input, rules, res.validatorMessage);
  } catch (err) {
    return res.validateError(err);
  }

  let t = await models.sequelize.transaction();

  try {
    if (!res.locals.adminAuth.validatePassword(input.oldPassword)) throw new MainError('auth', 'passwordIncorrect');

    await Promise.all([
      res.locals.adminAuth.updateAttributes({
        password: input.password,
      }, { transaction: t }),
      models.AdminSession.destroy({
        where: {
          adminId: res.locals.adminAuth.id
        },
        transaction: t,
      }),
    ]);

    await t.commit();
    return res.return();
  } catch (err) {
    await t.rollback();
    return next(err);
  }
}

function isActivated(req, res, next) {
  return res.item({
    isActivated: res.locals.adminAuth.active && res.locals.adminAuth.verifiedEmail,
  });
}

async function verifyEmail(req, res, next) {
  const rules = {
    email: 'required|email|string|min:6',
    token: 'required|string|min:10',
  };
  const input = validateHelper.pick(req.query, rules);

  try {
    await inputCheck.validate(input, rules, res.validatorMessage);
  } catch (err) {
    return res.validateError(err);
  }

  const t = await models.sequelize.transaction();
  try {
    const admin = await models.Admin.findOne({
      where: {
        email: String(input.email).toLowerCase(),
        emailToken: input.token
      },
      transaction: t
    });
    if (admin === null) throw new MainError('common', 'notFound');

    await admin.updateAttributes({
      emailToken: null,
      emailTokenUpdatedAt: null,
      verifiedEmail: true,
    }, { transaction: t });

    await t.commit();

    return res.return();
  } catch (err) {
    await t.rollback();
    return next(err);
  }
}

async function indexSession(req, res, next) {
  debug('Enter index method!');

  try {
    const filter = await res.paginatorHelper.initFilter2(req.query);
    const scope = [];
    const listScope = [];

    filter.order = [['lastUsedAt', 'DESC']];
    filter.limit = 5;
    filter.where = {
      adminId: res.locals.adminAuth.id
    };

    const result = await modelHelper.findAll('AdminSession', scope, filter, listScope);

    _.forEach(result, session => {
      if (moment.utc().diff(moment.utc(session.lastUsedAt), 'minutes', true) <= JwtStrategyOption.expiresIn) {
        session.setDataValue('using', true);
      } else {
        session.setDataValue('using', false);
      }
    });

    return res.paginatorLimitPlusStyle(result, {}, filter);
  } catch (err) {
    return next(err);
  }
}

async function revokeSession(req, res, next) {

  const t = await models.sequelize.transaction();
  try {
    const result = await models.AdminSession.findOne({
      where: {
        id: req.params.adminSessionId
      },
      transaction: t
    });
    if (result === null) throw new MainError('common', 'notFound');

    await result.destroy({ transaction: t });

    await t.commit();

    return res.return();
  } catch (err) {
    await t.rollback();
    return next(err);
  }
}

module.exports = {
  login,
  register,
  resetPassword,
  forgetPassword,
  changePassword,
  verifyEmail,
  isActivated,
  refreshToken,
  passportJwtStrategy,
  indexSession,
  revokeSession,
};
