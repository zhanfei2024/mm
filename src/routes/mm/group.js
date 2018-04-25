// debug
const debug = require('debug')('APP:group');

// model
const models = require('../../models');

// validate
const inputCheck = require('input-check');
const validateHelper = require('../../helpers/ValidateHelper');

// library
const _ = require('lodash');

// method
const modelHelper = require('../../methods/model');

async function index(req, res, next) {

  const filter = await res.paginatorHelper.initFilter2(req.query);

  if (!_.isNil(req.query.enterpriseId)) {
    filter.where.enterpriseId = req.query.enterpriseId;
  }

  if (!_.isNil(req.query.cocId)) {
    filter.where.cocId = req.query.cocId;
  }

  filter.order = [['order', 'DESC']];
  try {
    const result = await modelHelper.findAll('Group', [], filter, []);

    return res.paginatorLimitPlusStyle(result, {}, filter);
  } catch (err) {
    return next(err);
  }
}

async function show(req, res, next) {
  debug('Enter show method!');

  const filter = {
    where: {
      id: req.params.groupId
    }
  };
  try {
    const result = await models.Group.findOne(filter);
    return res.item(result);
  } catch (err) {
    return next(err);
  }
}


async function create(req, res, next) {
  debug('Enter create method!');

  const rules = {
    enterpriseId: 'required|integer|exists:Enterprise,id|min:1',
    cocId: 'required|integer|exists:Coc,id|min:1',
    parentId: 'nullable|integer|min:1',
    name: 'required|string|min:1',
    balance: 'nullable|integer|min:0',
    timeSpan: 'nullable|integer|min:0',
    isForever: 'nullable|boolean|min:1|in:true,false',
    order: 'required|integer|min:1',
  };
  const input = validateHelper.pick(req.body, rules);
  try {
    await inputCheck.validate(input, rules, res.validatorMessage);
  } catch (err) {
    return res.validateError(err);
  }
  const t = await models.sequelize.transaction();
  try {
    const result = await models.Group.create(input, {transaction: t});
    await  t.commit();

    req.params.groupId = result.id;
    return show(req, res, next);
  } catch (err) {
    await t.rollback();
    return next(err);
  }
}


async function update(req, res, next) {
  debug('Enter update method!');

  const rules = {
    //id:'required|integer|min:1',
    cocId: 'nullable|integer|exists:Coc,id|min:1',
    parentId: 'nullable|integer|min:1',
    name: 'nullable|string|max:255,',
    balance: 'nullable|integer|min:0',
    timeSpan: 'nullable|integer|min:0',
    isForever: 'nullable|boolean|min:1|in:true,false',
    order: 'nullable|integer|min:1',
  };
  const input = validateHelper.pick(req.body, rules);
  try {
    await inputCheck.validate(input, rules, res.validatorMessage);
  } catch (err) {
    return res.validateError(err);
  }

  const t = await  models.sequelize.transaction();
  try {

    const result = await models.Group.findById(req.params.groupId, {transaction: t});
    if (_.isNull(result)) {
      throw new MainError('common', 'notFound');
    }

    await result.updateAttributes(input, {transaction: t});
    await t.commit();

    req.params.groupId = result.id;
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
    const result = await models.Group.findById(req.params.groupId, {transaction: t});
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
  show,
  create,
  update,
  destroy
};
