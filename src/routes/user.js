// debug
const debug = require('debug')('APP:USER');

// model
const models = require('../models');

// validate
const inputCheck = require('input-check');
const validateHelper = require('../helpers/ValidateHelper');

// library
const _ = require('lodash');
const moment = require('moment');

async function index(req, res, next) {
  debug('Enter index method!');

  const rules = {
    search: 'nullable|string|min:1',
    registerTime: 'nullable|string|in:one,three,six,more'
  };
  const input = validateHelper.pick(req.query, rules);
  try {
    await inputCheck.validate(input, rules, res.validatorMessage);
  } catch (err) {
    return res.validateError(err);
  }

  const filter = await res.paginatorHelper.initFilter(req.query);

  if (!_.isNil(input.registerTime)) {
    let timeBase = [moment(), moment()];
    switch (input.registerTime) {
      case 'one':
        timeBase[0].subtract(1, 'months');
        break;
      case 'three':
        timeBase[0].subtract(3, 'months');
        timeBase[1].subtract(1, 'months');
        break;
      case 'six':
        timeBase[0].subtract(6, 'months');
        timeBase[1].subtract(3, 'months');
        break;
      default:
        timeBase[1].subtract(6, 'months');
        timeBase.shift();
        break;
    }
    if (timeBase.length === 1) {
      filter.where.createdAt = {
        $lt: timeBase[0].toDate()
      };
    } else {
      filter.where.createdAt = {
        $gt: timeBase[0].toDate(),
        $lt: timeBase[1].toDate()
      }
    }

  }
  if (!_.isNil(input.search) && input.search !== '') {
    filter.where.$or = {
      lastName: {
        $iLike: `%${input.search}%`,
      },
      firstName: {
        $iLike: `%${input.search}%`,
      },
      email: {
        $iLike: `%${input.search}%`,
      },
    };
  }

  filter.order = [['createdAt', 'DESC']];
  // attribute handle
  filter.attributes = validateHelper.readAttributeFilter(req.query.attributes, models.User.getAttributes(), ['createdAt']);
  const scopes = ['includeLanguage', 'includeCountry', 'includeUserProfile'];
  try {
    const result = await models.User.scope(scopes).findAndCountAll(filter);
    return res.paginatorWithCount(result, {}, filter);
  } catch (err) {
    return next(err);
  }
}

async function show(req, res, next) {
  debug('Enter show method!');

  const filter = {
    where: {
      id: req.params.userId,
    },
  };
  const scopes = [];
  // 按需要附带信息
  if (req.params.includeUserProfile) scopes.push('includeUserProfile');
  if (req.params.includeUserExperience) scopes.push('includeUserExperience');
  if (req.params.includeUserCompany) scopes.push('includeUserCompany');
  if (req.params.includeUserEducation) scopes.push('includeUserEducation');

  // attribute handle
  filter.attributes = validateHelper.readAttributeFilter(req.query.attributes, models.User.getAttributes(), ['createdAt', 'userId']);
  try {
    const result = await models.User.scope(scopes).findOne(filter);
    if (_.isNull(result)) throw new MainError('common', 'notFound');
    let cocs = await models.Candidate.scope(['includeCocs', 'includeGroups']).findAll({where: {userId: result.id}});

    return res.item(result, {cocs: cocs});
  } catch (err) {
    return next(err);
  }
}


async function checkUserIsExists(req, res, next) {
  debug('Enter get user method!');

  const filter = {
    where: {
      email: req.query.email
    }
  };

  try {
    const result = await models.User.findOne(filter);

    if (!_.isNil(result)) {
      return res.return({status: true});
    } else {
      return res.return({status: false});
    }
  } catch (err) {
    return next(err);
  }
}

async function create(req, res, next) {
  debug('ENTER create method!');

  const rules = {
    languageId: 'nullable|integer|exists:Language,id',
    password: 'required|string|min:6',
    email: 'required|email|min:6',
    lastName: 'required|string|min:1',
    firstName: 'required|string|min:1',
    phone: 'nullable|string|min:1',
    gender: 'nullable|string|in:M,F',
    birth: 'nullable|date_iso8601',
    active: 'boolean',
  };
  const input = validateHelper.pick(req.body, rules);
  try {
    await inputCheck.validate(input, rules, res.validatorMessage);
  } catch (err) {
    return res.validateError(err);
  }

  const t = await models.sequelize.transaction();
  try {
    const result = await models.User.create(input, {transaction: t});
    await t.commit();

    req.params.userId = result.id;
    return show(req, res, next);
  } catch (err) {
    await t.rollback();
    return next(err);
  }
}

async function update(req, res, next) {
  debug('ENTER update method!');

  const rules = {
    lastName: 'nullable|string|min:1',
    firstName: 'nullable|string|min:1',
    phone: 'nullable|string|min:1',
    gender: 'nullable|string|in:M,F',
    birth: 'nullable|date_iso8601',
    languageId: 'nullable|integer|exists:Language,id',
  };
  const input = validateHelper.pick(req.body, rules, [], rules);
  try {
    await inputCheck.validate(input, rules, res.validatorMessage);
  } catch (err) {
    return res.validateError(err);
  }

  const t = await models.sequelize.transaction();
  try {
    const result = await models.User.findById(req.params.userId, {
      transaction: t
    });
    if (_.isNull(result)) throw new MainError('common', 'notFound');

    await result.updateAttributes(input, {transaction: t});
    await t.commit();

    req.params.userId = result.id;
    return show(req, res, next);
  } catch (err) {
    await t.rollback();
    return next(err);
  }
}

async function destroy(req, res, next) {
  debug('Enter destroy method!');

  const t = await models.sequelize.transaction();
  try {
    const userResult = await models.User.findById(req.params.userId, {transaction: t});
    if (_.isNull(userResult)) throw new MainError('common', 'notFound');

    await userResult.destroy({transaction: t});
    await t.commit();

    return res.return();
  } catch (err) {
    await t.rollback();
    return next(err);
  }
}

module.exports = {
  index,
  show,
  create,
  update,
  destroy,
  checkUserIsExists
};
