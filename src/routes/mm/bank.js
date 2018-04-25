const debug = require('debug')("APP:Bank");
const _ = require('lodash');

// model
const models = require('../../models');

// validate
const inputCheck = require('input-check');
const validateHelper = require('../../helpers/ValidateHelper');

async function index(req, res, next) {
  debug('ENTER index method!');

  const rules = {
    cocId: 'nullable|integer|exists:Coc,id|min:1',
    isActive: 'nullable|boolean',
    search: 'nullable|string|min:1'
  };
  const input = validateHelper.pick(req.query, rules);
  try {
    await inputCheck.validate(input, rules, res.validatorMessage);
  } catch (err) {
    return res.validateError(err);
  }

  try {
    const filter = await res.paginatorHelper.initFilter(req.query);
    const filterScopes = [];
    if (!_.isNil(input.cocId)) filter.where.cocId = input.cocId;
    if (!_.isNil(input.isActive)) filter.where.isActive = input.isActive;
    filterScopes.push({method: ['includeCoc', input.search]});
    const result = await models.Bank.scope(filterScopes).findAndCountAll(filter);

    return res.paginatorWithCount(result, {}, filter);
  } catch (err) {
    return next(err);
  }
}


async function show(req, res, next) {
  debug('ENTER show method!');

  const filter = {
    where: {
      id: req.params.bankId,
      cocId: req.params.cocId,
    }
  };
  if (!_.isNil(req.params.isActive)) filter.where.isActive = req.params.isActive;
  try {
    const result = await models.Bank.findOne(filter);

    return res.item(result);
  } catch (err) {
    return next(err);
  }

}


async function create(req, res, next) {
  debug('ENTER create method!');

  const rules = {
    enterpriseId: 'required|integer|min:1|exists:Enterprise,id',
    cocId: 'required|integer|min:1|exists:Coc,id',
    bankName: 'required|string|min:1',
    cardNumber: 'required|string|min:1',
    payType: 'required|string|min:1|in:transfer,check,online',
    accountHolder: 'required|string|max:255',
    depositBank: 'required|string|min:1',
    isActive: 'nullable|boolean',
    order: 'nullable|integer'
  };
  const input = validateHelper.pick(req.body, rules);

  try {
    await inputCheck.validate(input, rules, res.validatorMessage);
  } catch (err) {
    return res.validateError(err);
  }
  debug('ENTER create method!');

  const t = await models.sequelize.transaction();
  try {
    input.isActive = true;
    if (_.isNil(input.isActive)) input.isActive = true;
    const result = await models.Bank.create(input, {transaction: t});
    await t.commit();
    req.params.bankId = result.id;
    req.params.enterpriseId = result.enterpriseId;
    return show(req, res, next);
  } catch (err) {
    await t.rollback();
    return next(err);
  }
}

async function update(req, res, next) {
  debug('ENTER update method!');

  const rules = {
    cocId: 'nullable|integer|min:1|exists:Coc,id',
    bankName: 'nullable|string|min:1',
    cardNumber: 'nullable|string|min:1',
    accountHolder: 'nullable|string|max:255',
    payType: 'nullable|string|min:1|in:transfer,check,online',
    depositBank: 'nullable|string|min:1',
    isActive: 'nullable|boolean',
    order: 'nullable|integer'
  };
  const filter = {
    where: {
      cocId: req.params.cocId,
      id: req.params.bankId,
      enterpriseId: req.body.enterpriseId
    }
  };
  const input = validateHelper.pick(req.body, rules, [], Object.keys(rules));
  try {
    await inputCheck.validate(input, rules, res.validatorMessage);
  } catch (err) {
    return res.validateError(err);
  }

  const t = await models.sequelize.transaction();
  try {
    const result = await models.Bank.findOne(filter);
    if (_.isNull(result)) throw new MainError('common', 'notFound');
    await result.updateAttributes(input, {transaction: t});
    await t.commit();

    req.params.bankId = result.id;
    return show(req, res, next);
  } catch (err) {
    await t.rollback();
    return next(err);
  }
}

async function destroy(req, res, next) {
  debug('ENTER destroy method!');

  const filter = {
    where: {
      id: req.params.bankId,
      enterpriseId: req.params.enterpriseId,
      cocId: req.params.cocId
    }
  };
  const t = await models.sequelize.transaction();
  try {
    await models.Bank.destroy(filter, {transaction: t});
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
  destroy
};

