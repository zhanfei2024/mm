'use strict';

// core
const debug = require('debug')('APP:POST_CATEGORY');


// model
const models = require('../../models');

// method
const modelHelper = require('../../methods/model');

// library
const _ = require('lodash');
const inputCheck = require('input-check');
const validateHelper = require('../../helpers/ValidateHelper');


async function index(req, res, next) {
  debug(`ENTER index method!`);

  const rules = {
    search: 'nullable|string|min:1',
    name: 'nullable|string|min:1',
    parentId: 'nullable|integer|min:1|exists:PostCategory,id'
  };
  const input = validateHelper.pick(req.query, rules);
  try {
    await inputCheck.validate(input, rules, res.validatorMessage);
  } catch (err) {
    return res.validateError(err);
  }

  const filter = await res.paginatorHelper.initFilter2(req.query);
  if (!_.isNil(input.search) && input.search !== '') {
    filter.where.$or = {
      name: {
        $iLike: '%' + input.search + '%'
      }
    };
  }

  if (!_.isNil(input.parentId)) {
    filter.where.parentId = input.parentId;
  }

  if (!_.isNil(input.name)) {
    filter.where.name = input.name;
  }

  filter.order = [['order', 'ASC']];
  try {
    const result = await modelHelper.findAll('PostCategory', [], filter, []);

    return res.paginatorLimitPlusStyle(result, {}, filter);
  } catch (err) {
    return next(err);
  }
}

async function indexTree(req, res, next) {
  debug(`ENTER indexByTree method!`);

  try {
    const categories = await models.PostCategory.findAll();
    const result = _.filter(categories, group => {
      return _.isNil(group.parentId);
    });

    getChildren(categories, result);

    return res.collection(result);
  } catch (err) {
    return next(err);
  }
}

function getChildren(groups, result) {
  _.forEach(result, item => {
    const children = _.filter(groups, group => {
      return group.parentId === item.id;
    });
    if (!_.isEmpty(children)) {
      item.setDataValue('children', children);
      getChildren(groups, children);
    }
  });
}


async function show(req, res, next) {
  debug(`ENTER show method!`);

  try {
    const result = await models.PostCategory.findById(req.params.categoryId);

    return res.item(result);
  } catch (err) {
    return next(err);
  }
}


async function create(req, res, next) {
  debug(`ENTER create method!`);

  const rules = {
    name: 'required|string|min:1',
    parentId: 'nullable|integer|exists:PostCategory,id',
    description: 'nullable|string|min:1',
    order: 'nullable|integer|min:1'
  };
  const input = validateHelper.pick(req.body, rules, [], ['parentId']);
  try {
    await inputCheck.validate(input, rules, res.validatorMessage);
  } catch (err) {
    return res.validateError(err);
  }

  const t = await models.sequelize.transaction();
  try {
    if (_.isNaN(parseInt(input.parentId))) delete input.parentId;
    const result = await models.PostCategory.create(input, {transaction: t});
    await t.commit();

    req.params.categoryId = result.id;
    return show(req, res, next);
  } catch (err) {
    await t.rollback();
    return next(err);
  }
}


async function update(req, res, next) {
  debug(`ENTER update method!`);

  const rules = {
    name: 'string|min:1',
    parentId: 'nullable|integer|exists:PostCategory,id',
    description: 'nullable|string|min:1',
    order: 'nullable|integer|min:1'
  };
  const input = validateHelper.pick(req.body, rules, [], ['parentId']);
  try {
    await inputCheck.validate(input, rules, res.validatorMessage);
  } catch (err) {
    return res.validateError(err);
  }

  const t = await models.sequelize.transaction();
  try {
    if (_.isNaN(parseInt(input.parentId))) delete input.parentId;
    const result = await models.PostCategory.findById(req.params.categoryId, {transaction: t});
    if (_.isNull(result)) throw new MainError('common', 'notFound');

    await result.updateAttributes(input, {transaction: t});
    await t.commit();

    return show(req, res, next);
  } catch (err) {
    await t.rollback();
    return next(err);
  }
}


async function destroy(req, res, next) {
  debug(`ENTER destroy method!`);

  const t = await models.sequelize.transaction();
  try {
    const result = await models.PostCategory.findOne({where: {id: req.params.categoryId}, transaction: t});
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
  indexTree,
  show,
  create,
  update,
  destroy
};
