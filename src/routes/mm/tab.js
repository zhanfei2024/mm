// debug
const debug = require('debug')('APP:TAB');

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
  debug('ENTER index method!');

  const rules = {
    cocId: 'nullable|integer|min:1',
    enterpriseId: 'nullable|integer|min:1',
    title: 'nullable|string|min:1',
    name: 'nullable|string|min:1'
  };
  const input = validateHelper.pick(req.query, rules);
  try {
    await inputCheck.validate(input, rules);
  } catch (err) {
    return res.validateError(err);
  }

  try {
    const
      scopes = ['includeCocs'],
      filterScopes = [],
      filter = await res.paginatorHelper.initFilter(req.query);


    if (!_.isNil(input.cocId)) {
      filter.where.cocId = input.cocId;
    }

    if (!_.isNil(input.enterpriseId)) {
      filter.where.enterpriseId = input.enterpriseId;
    }

    if (!_.isNil(input.title)) {
      filter.where.title = {$iLike: `%${input.title}%`};
    }
    if (!_.isNil(input.name)) {
      filterScopes.push({method: ['includeCocWithSearch', input.name]});
    }
    filter.order = [['id', 'DESC']];

    const result = await models.Tab.scope(filterScopes, scopes).findAndCountAll(filter);

    return res.paginatorWithCount(result, {}, filter);
  } catch (err) {
    return next(err);
  }
}

async function show(req, res, next) {
  debug('ENTER show method!');

  const filter = {
    where: {
      id: req.params.tabId
    }
  };

  try {
    const scopes = ['includeCocs'];
    const result = await models.Tab.scope(scopes).findOne(filter);

    return res.item(result);
  } catch (err) {
    return next(err);
  }
}


async function create(req, res, next) {
  debug('ENTER create method!');

  const rules = {
    enterpriseId: 'required|integer|exists:Enterprise,id|min:1',
    cocId: 'required|integer|exists:Coc,id|min:1',
    title: 'required|string|min:1|max:255',
    content: 'required|string|min:1',
    isActive: 'boolean'
  };
  const input = validateHelper.pick(req.body, rules);
  try {
    await inputCheck.validate(input, rules, res.validatorMessage);
  } catch (err) {
    return res.validateError(err);
  }
  const t = await models.sequelize.transaction();
  try {

    let result = await models.Tab.findAll({where: {cocId: input.cocId}});
    if (result.length >= 2) {
      throw new MainError('coc', 'tabLimit');
    }
    result = await models.Tab.create(input, {transaction: t});
    await t.commit();

    req.params.tabId = result.id;
    return show(req, res, next);
  } catch (err) {
    await t.rollback();
    return next(err);
  }
}


async function update(req, res, next) {
  debug('ENTER update method!');

  const rules = {
    title: 'nullable|string|min:1|max:255',
    content: 'required|string|min:1',
    isActive: 'boolean'
  };
  const input = validateHelper.pick(req.body, rules);
  try {
    await inputCheck.validate(input, rules, res.validatorMessage);
  } catch (err) {
    return res.validateError(err);
  }

  const t = await models.sequelize.transaction();
  try {
    const result = await models.Tab.findById(req.params.tabId, {transaction: t});
    if (_.isNull(result)) {
      throw new MainError('common', 'notFound');
    }

    await result.updateAttributes(input, {transaction: t});
    await t.commit();

    req.params.tabId = result.id;
    return show(req, res, next);
  } catch (err) {
    await t.rollback();
    return next(err);
  }
}

async function destroy(req, res, next) {
  debug('ENTER destroy method!');

  const t = await models.sequelize.transaction();
  try {
    const result = await models.Tab.findById(req.params.tabId, {transaction: t});
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
