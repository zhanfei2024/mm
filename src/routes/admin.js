// debug
const debug = require('debug')('APP:ADMIN');

// model
const models = require('../models');

// validate
const inputCheck = require('input-check');
const validateHelper = require('../helpers/ValidateHelper');

// library
const _ = require('lodash');
const modelHelper = require('../methods/model');

async function index(req, res, next) {
  debug('Enter index method!');

  const rules = {
    search: 'nullable|string|min:1',
  };
  const input = validateHelper.pick(req.query, rules);
  try {
    await inputCheck.validate(input, rules, res.validatorMessage);
  } catch (err) {
    return res.validateError(err);
  }

  const filter = await res.paginatorHelper.initFilter(req.query);
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
  filter.attributes = validateHelper.readAttributeFilter(req.query.attributes, models.Admin.getAttributes(), ['createdAt']);
  try {
    const result = await models.Admin.findAndCountAll(filter);
    return res.paginatorWithCount(result, {}, filter);
  } catch (err) {
    return next(err);
  }
}

async function show(req, res, next) {
  debug('Enter show method!');

  const filter = {
    where: {
      id: req.params.adminId,
    },
  };
  // attribute handle
  filter.attributes = validateHelper.readAttributeFilter(req.query.attributes, models.Admin.getAttributes(), ['createdAt', 'adminId']);
  try {
    const result = await models.Admin.findOne(filter);
    return res.item(result);
  } catch (err) {
    return next(err);
  }
}

async function create(req, res, next) {
  debug('ENTER create method!');

  if (req.body.email) req.body.email = String(req.body.email).toLowerCase();

  const rules = {
    email: 'required|email|min:6|unique:Admin,email',
    password: 'required|string|min:6',
    lastName: 'nullable|string|min:1',
    firstName: 'nullable|string|min:1',
    phone: 'nullable|string|min:1',
    gender: 'nullable|string|in:M,F',
    birth: 'nullable|date_iso8601',
    active: 'nullable|boolean'
  };
  const input = validateHelper.pick(req.body, rules);
  try {
    await inputCheck.validate(input, rules, res.validatorMessage);
  } catch (err) {
    return res.validateError(err);
  }

  const t = await models.sequelize.transaction();
  try {
    if (+res.locals.adminAuth.id !== 1) throw new MainError('auth', 'doNotHavePermissionAccess');
    const result = await models.Admin.create(input, {transaction: t});
    await t.commit();

    req.params.adminId = result.id;
    return show(req, res, next);
  } catch (err) {
    await t.rollback();
    return next(err);
  }
}

async function update(req, res, next) {
  debug('ENTER update method!');

  if (+res.locals.adminAuth.id === 1) {
    if (+req.params.adminId === 1) {
      req.body.active = true;
    }
  } else {
    req.params.adminId = res.locals.adminAuth.id
  }

  const rules = {
    lastName: 'nullable|string|min:1',
    firstName: 'nullable|string|min:1',
    phone: 'nullable|string|min:1',
    gender: 'nullable|string|in:M,F',
    birth: 'nullable|date_iso8601',
    active: 'nullable|boolean',
  };
  const input = validateHelper.pick(req.body, rules);
  try {
    await inputCheck.validate(input, rules, res.validatorMessage);
  } catch (err) {
    return res.validateError(err);
  }

  const t = await models.sequelize.transaction();
  try {

    const result = await models.Admin.findById(req.params.adminId, {
      transaction: t
    });
    if (_.isNull(result)) throw new MainError('common', 'notFound');

    await result.updateAttributes(input, {transaction: t});
    await t.commit();

    req.params.adminId = result.id;
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
    if (+res.locals.adminAuth.id !== 1) throw new MainError('auth', 'doNotHavePermissionAccess');
    if (+req.params.adminId === 1) throw new MainError('auth', 'invalidDomain');

    const adminResult = await models.Admin.findById(req.params.adminId, {transaction: t});
    if (_.isNull(adminResult)) throw new MainError('common', 'notFound');

    await adminResult.destroy({transaction: t});
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
};
