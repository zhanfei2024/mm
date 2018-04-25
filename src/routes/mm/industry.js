// debug
const debug = require('debug')('APP:INDUSTRY');

// model
const models = require('../../models');

// validate
const inputCheck = require('input-check');
const validateHelper = require('../../helpers/ValidateHelper');

// library
const _ = require('lodash');


async function index(req, res, next) {
  debug('Enter index method!');

  const rules = {
    isActive: 'nullable|boolean'
  };
  const input = validateHelper.pick(req.query, rules);
  try {
    await inputCheck.validate(input, rules, res.validatorMessage);
  } catch (err) {
    return res.validateError(err);
  }

  const filter = await res.paginatorHelper.initFilter(req.query);
  try {
    filter.order = [['order', 'ASC']];
    if (!_.isNil(input.isActive)) filter.where.isActive = input.isActive;
    const result = await models.Industry.findAndCountAll(filter);

    return res.paginatorWithCount(result, {}, filter);
  } catch (err) {
    return next(err);
  }

}

async function show(req, res, next) {
  debug('Enter show method!');

  const filter = {
    where: {
      id: req.params.industryId,
    }
  };
  try {
    const result = await models.Industry.findOne(filter);

    return res.item(result);
  } catch (err) {
    return next(err);
  }
}

async function create(req, res, next) {
  debug('ENTER create method!');

  const rules = {
    parentId: 'nullable|integer',
    name: 'required|string|min:1|max:255',
    depth: 'nullable|integer|min:1',
    order: 'required|integer|min:1',
    isActive: 'nullable|boolean',
    description: 'nullable|string|min:1',
  };
  const input = validateHelper.pick(req.body, rules);
  try {
    await inputCheck.validate(input, rules, res.validatorMessage);
  } catch (err) {
    return res.validateError(err);
  }

  const t = await models.sequelize.transaction();
  try {
    // 行业名称不能重复判断
    const temp = await models.Industry.findOne({where: {name: req.body.name}});
    if (!_.isNull(temp)) throw new MainError('industry', 'existed');

    const result = await models.Industry.create(input, {transaction: t});
    await t.commit();
    req.params.industryId = result.id;

    return show(req, res, next);
  } catch (err) {
    await t.rollback();
    return next(err);
  }
}

async function update(req, res, next) {
  debug('ENTER update method!');
  const rules = {
    parentId: 'nullable|integer',
    name: 'nullable|string|min:1',
    depth: 'nullable|string|min:1',
    order: 'nullable|integer|min:1',
    isActive: 'nullable|boolean',
    description: 'nullable|string|min:1',
  };
  const input = validateHelper.pick(req.body, rules);
  try {
    await inputCheck.validate(input, rules, res.validatorMessage);
  } catch (err) {
    return res.validateError(err);
  }

  const t = await models.sequelize.transaction();
  try {
    const result = await models.Industry.findById(req.params.industryId, {transaction: t});
    if (_.isNull(result)) throw new MainError('common', 'notFound');
    await result.updateAttributes(input, {transaction: t});
    req.params.industryId = result.id;
    await t.commit();

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
    const result = await models.Industry.findOne({
      where: {
        id: req.params.industryId
      },
      transaction: t,
    });
    if (_.isNull(result)) throw new MainError('common', 'notFound');

    await result.destroy({
      transaction: t
    });
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
