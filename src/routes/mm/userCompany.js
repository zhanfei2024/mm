const debug = require('debug')('APP:USERCOMPANY');

// model
const models = require('../../models');
const modelHelper = require('../../methods/model');


// validate
const inputCheck = require('input-check');
const validateHelper = require('../../helpers/ValidateHelper');

// library
const _ = require('lodash');


async function index(req, res, next) {
  debug('Enter index method!');

  const rules = {
    userId: 'integer|min:1|exists:User,id',
  };
  const input = validateHelper.pick(req.query, rules);
  try {
    await inputCheck.validate(input, rules, res.validatorMessage);
  } catch (err) {
    return res.validateError(err);
  }
  const scopes = ['includeIndustries'];
  const filter = await res.paginatorHelper.initFilter(req.query);
  if (!_.isNil(input.userId)) filter.where.userId = input.userId;
  filter.order = [['createdAt', 'DESC']];
  try {
    const result = await models.UserCompany.scope(scopes).findAndCountAll(filter);
    return res.paginatorWithCount(result, {}, filter);
  } catch (err) {
    return next(err);
  }
}


async function show(req, res, next) {
  debug('Enter show method!');

  const filter = {
    where: {
      id: req.query.userCompanyId,
      userId: req.query.userId
    }
  };
  try {
    const result = await models.UserCompany.findOne(filter);

    return res.item(result);
  } catch (err) {
    return next(err);
  }

}


async function create(req, res, next) {
  debug('Enter create method!');

  const rules = {
    userId: 'required|integer|min:1',
    industryId: 'required|integer|min:1',
    companyName: 'required|string|min:1',
    mobile: 'required|string|min:1',
    address: 'required|string|min:1',
    scopeOfOperation: 'required|string|min:1',
    isActive: 'nullable|string|min:1',
    companyEmail: 'required|string|min:1',
    isDefault: 'nullable|boolean'
  };
  const input = validateHelper.pick(req.body, rules);
  try {
    await inputCheck.validate(input, rules, res.validatorMessage);
  } catch (err) {
    return res.validateError(err);
  }
  const t = await models.sequelize.transaction();
  try {

    const filterResult = await models.UserCompany.findOne({
      where: {
        userId: input.userId,
        isDefault: true
      },
      transaction: t
    });
    if (input.isDefault && !_.isNull(filterResult)) {
      await filterResult.updateAttributes({isDefault: false}, {transaction: t});
    }

    const result = await models.UserCompany.create(input, {transaction: t});
    if (_.isNull(result)) throw new MainError('common', 'notFound');
    await t.commit();


    req.query.userCompanyId = result.id;
    req.query.userId = req.body.userId;
    return show(req, res, next);
  } catch (err) {
    await t.rollback();
    return next(err);
  }
}


async function update(req, res, next) {
  debug('Enter update method!');

  const rules = {
    userId: 'nullable|integer|min:1',
    industryId: 'nullable|integer|min:1',
    companyName: 'nullable|string|min:1',
    mobile: 'nullable|string|min:1',
    address: 'nullable|string|min:1',
    scopeOfOperation: 'nullable|string|min:1',
    isActive: 'nullable|string|min:1',
    companyEmail: 'nullable|string|min:1',
    isDefault: 'nullable|boolean'
  };
  const input = validateHelper.pick(req.body, rules, [], Object.keys(rules));
  try {
    await inputCheck.validate(input, rules, res.validatorMessage);
  } catch (err) {
    return res.validateError(err);
  }

  const filter = {
    where: {
      id: req.body.userCompanyId
    }
  };
  const t = await models.sequelize.transaction();
  try {

    const filterResult = await models.UserCompany.findOne({
      where: {
        userId: input.userId,
        isDefault: true
      },
      transaction: t
    });
    if (input.isDefault && !_.isNull(filterResult)) {
      await filterResult.updateAttributes({isDefault: false}, {transaction: t});
    }

    const result = await models.UserCompany.findOne(filter, {
      transaction: t
    });
    if (_.isNull(result)) throw new MainError('common', 'notFound');
    await result.updateAttributes(input, {transaction: t});
    await t.commit();

    req.query.userId = req.body.userId;
    req.query.userCompanyId = result.id;
    return show(req, res, next);
  } catch (err) {
    await t.rollback();
    return next(err);
  }
}


async function destroy(req, res, next) {
  debug('Enter destroy method!');

  const filter = {
    userId: req.params.userId,
    id: req.params.userCompanyId
  };
  const t = await models.sequelize.transaction();
  try {
    const result = await models.UserCompany.findOne(filter, {transaction: t});
    if (_.isNull(result)) throw new MainError('common', 'notFound');

    await result.destroy({transaction: t});
    await t.commit();

    return res.return();
  } catch (err) {
    await t.rollback();
    return next(err);
  }
}


module.exports = {
  index,
  create,
  show,
  update,
  destroy
}


