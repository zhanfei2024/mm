// debug
const debug = require('debug')('APP:ENTERPRISE_AUTH');

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
const url = require('url');
// method
const modelHelper = require('../../methods/model');
const jobs = require('../../jobs');
const rateLimitMethod = require('../../methods/RateLimitMethod');

// jwt
const jwt = require('jsonwebtoken');
const jwtConfig = require('../../config/auth');
const uuidV4 = require('uuid/v4');

// email
const enterpriseRoute = require('../../routes/enterprise');

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const JwtStrategyOption = {
  jwtFromRequest: ExtractJwt.fromAuthHeader(),
  secretOrKey: jwtConfig.secret,
  issuer: jwtConfig.issuer,
  audience: 'yoov.com',
  algorithms: 'HS256',
  expiresIn: 240000, // minutes
};

function passportJwtStrategy(options = {}) {
  return new JwtStrategy(_.extend(JwtStrategyOption, options), async (jwtPayload, done) => {
    try {
      const result = await models.Enterprise.findOne({where: {id: jwtPayload.subjectId}});
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

    let result = await models.Enterprise.findOne({
      where: {
        email: input.email,
      },
      transaction: t
    });
    if (result === null) throw new MainError('auth', 'doNotHaveAccount');

    const matchPassword = result.validatePassword(input.password);
    if (matchPassword === false) throw new MainError('auth', 'emailOrPasswordIncorrect');

    let token = jwt.sign({type: 'enterprise', subjectId: result.id}, jwtConfig.secret, {
      algorithm: JwtStrategyOption.algorithms,
      issuer: JwtStrategyOption.issuer,
      audience: JwtStrategyOption.audience,
      expiresIn: `${JwtStrategyOption.expiresIn}m`
    });

    const refreshToken = randomstring.generate(64);
    await models.EnterpriseSession.create({
      enterpriseId: result.id,
      token: refreshToken,
      agent: req.headers['user-agent'],
      ip: req.ip,
      lastUsedAt: new Date()
    }, {transaction: t});

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

    if (payload.subjectId !== String(res.locals.enterpriseAuth.id)) throw new MainError('common', 'notFound');

    const session = await models.EnterpriseSession.findOne({
      where: {
        enterpriseId: res.locals.enterpriseAuth.id,
        token: input.refreshToken,
      },
      transaction: t,
    });
    if (session === null) throw new MainError('auth', 'emailOrPasswordIncorrect');

    let token = jwt.sign({type: 'enterprise', subjectId: session.enterpriseId}, jwtConfig.secret, {
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
    email: 'required|email|min:6|max:100',
    password: 'required|min:6',
    lastName: 'nullable|string|min:1|max:50',
    firstName: 'nullable|string|min:1|max:50',
    languageId: 'nullable|integer|exists:Language,id',
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

    const result = await models.Enterprise.findOne({where: {email: input.email}, transaction: t});
    if (result !== null) throw new MainError('auth', 'accountAlreadyExist');

    let enterprise = await models.Enterprise.create(input, {transaction: t});

    await t.commit();

    req.params.enterpriseId = enterprise.id;
    return enterpriseRoute.show(req, res, next);
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

    let enterprise = await models.Enterprise.findOne({where: {email: input.email}, transaction: t});
    if (enterprise === null) throw new MainError('common', 'notFound');

    if (moment.utc().diff(moment.utc(enterprise.emailTokenUpdatedAt), 'seconds') < 60) throw new MainError('auth', 'forgetPasswordEmailSentAlready');

    const token = randomstring.generate(40);
    await enterprise.updateAttributes({
      emailToken: token,
      emailTokenUpdatedAt: moment.utc().toISOString(),
    }, {transaction: t});

    await jobs.create('email::auth::enterprise_forget_password', {
      enterprise: enterprise,
      token: token,
      lang: enterprise.languageId
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

    let enterprise = await models.Enterprise.findOne({
      where: {
        email: input.email,
        emailToken: input.token,
      },
      transaction: t
    });
    if (enterprise === null) throw new MainError('common', 'notFound');

    if (moment.utc().diff(moment.utc(enterprise.emailTokenUpdatedAt), 'hours') > 24) throw new MainError('auth', 'emailTokenExpired');

    await Promise.all([
      enterprise.updateAttributes({
        password: input.password,
        emailToken: null,
        emailTokenUpdatedAt: null,
      }, {transaction: t}),
      models.EnterpriseSession.destroy({
        where: {
          enterpriseId: enterprise.id
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
    if (!res.locals.enterpriseAuth.validatePassword(input.oldPassword)) throw new MainError('auth', 'passwordIncorrect');

    await Promise.all([
      res.locals.enterpriseAuth.updateAttributes({
        password: input.password,
      }, {transaction: t}),
      models.EnterpriseSession.destroy({
        where: {
          enterpriseId: res.locals.enterpriseAuth.id
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
    isActivated: res.locals.enterpriseAuth.active && res.locals.enterpriseAuth.verifiedEmail,
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
    const enterprise = await models.Enterprise.findOne({
      where: {
        email: String(input.email).toLowerCase(),
        emailToken: input.token
      },
      transaction: t
    });
    if (enterprise === null) throw new MainError('common', 'notFound');

    await enterprise.updateAttributes({
      emailToken: null,
      emailTokenUpdatedAt: null,
      verifiedEmail: true,
    }, {transaction: t});

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
      enterpriseId: res.locals.enterpriseAuth.id
    };

    const result = await modelHelper.findAll('EnterpriseSession', scope, filter, listScope);

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
    const result = await models.EnterpriseSession.findOne({
      where: {
        id: req.params.enterpriseSessionId
      },
      transaction: t
    });
    if (result === null) throw new MainError('common', 'notFound');

    await result.destroy({transaction: t});

    await t.commit();

    return res.return();
  } catch (err) {
    await t.rollback();
    return next(err);
  }
}

async function loginZendesk(req, res, next) {
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

    let result = await models.Enterprise.findOne({
      where: {
        email: input.email,
      },
      transaction: t
    });
    if (result === null) throw new MainError('auth', 'doNotHaveAccount');

    const matchPassword = result.validatePassword(input.password);
    if (matchPassword === false) throw new MainError('auth', 'emailOrPasswordIncorrect');

    let token = jwt.sign({
        jti: uuidV4(),
        external_id: result.id,
        name: result.fullName(),
        email: result.email,
      }, 'WN2BGzWMlWqlgS1dXv1f1GlD7lzILi6AKfUrfpeQZpZeGE5D',
      {
        algorithm: JwtStrategyOption.algorithms,
        issuer: JwtStrategyOption.issuer,
        audience: JwtStrategyOption.audience,
        expiresIn: `${JwtStrategyOption.expiresIn}m`
      });

    await t.commit();
    let redirect = `https://yoov.zendesk.com/access/jwt?jwt=${token}`;

    const query = url.parse(req.url, true).query;

    if (query['return_to']) {
      redirect += '&return_to=' + encodeURIComponent(query['return_to']);
    }

    res.writeHead(302, {
      'Location': redirect
    });
    res.end();
  } catch (err) {
    await t.rollback();
    return next(err);
  }
}


module.exports = {
  loginZendesk,
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
