const debug = require('debug')('APP:COCRULES');

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
    cocId: 'nullable|integer|min:1|exists:Coc,id',
    type: 'nullable|string|in:notice,statutes',
    title: 'nullable|string|min:1',
    name: 'nullable|string|min:1'
  };
  const input = validateHelper.pick(req.query, rules);
  try {
    await inputCheck.validate(input, rules, res.validatorMessage);
  } catch (err) {
    return res.validateError(err);
  }

  const filter = await res.paginatorHelper.initFilter(req.query);
  const filterScopes = [];
  const scopes = [];

  try {

    if (!_.isNil(input.cocId)) filter.where.cocId = input.cocId;
    if (!_.isNil(input.type)) filter.where.type = input.type;
    if (!_.isNil(input.title)) filter.where.title = { $iLike: `%${input.title}%`};
    if (!_.isNil(input.name)) {
      filterScopes.push({ method: ['includeCocWithSearch', input.name] });
    } else {
      scopes.push('includeCocs');
    }
    filter.order = [['createdAt', 'DESC']];
    const result = await models.CocRules.scope(filterScopes, scopes).findAndCountAll(filter);
    return res.paginatorWithCount(result, {}, filter);

  } catch (err) {
    return next(err);
  }
}

async function show(req, res, next) {
  debug('Enter show method!');

  try {
    const scopes = ['includeCocs'];

    const result = await models.CocRules.scope(scopes).findOne({where: {id: req.params.ruleId}});
    return res.item(result);
  } catch (err) {
    return next(err);
  }
}

async function create(req, res, next) {
  debug('Enter create method!');

  const rules = {
    enterpriseId: 'required|integer|min:1',
    cocId: 'required|integer|min:1',
    type: 'required|in:notice,statutes',
    title: 'required|string|max:255',
    content: 'required|string',
  };
  const input = validateHelper.pick(req.body, rules);
  try {
    await inputCheck.validate(input, rules, res.validatorMessage);
  } catch (err) {
    return res.validateError(err);
  }

  const t = await models.sequelize.transaction();
  try {
    const result = await models.CocRules.create(input, {transaction: t});
    await  t.commit();
    req.params.cocId = result.cocId;
    req.params.ruleId = result.id;
    return show(req, res, next);
  } catch (err) {
    await t.rollback();
    return next(err);
  }
}

async function update(req, res, next) {
  debug('Enter update method!');

  const rules = {
    title: 'nullable|string',
    content: 'nullable|string',
  };
  const input = validateHelper.pick(req.body, rules, [], Object.keys(rules));
  try {
    await inputCheck.validate(input, rules, res.validatorMessage);
  } catch (err) {
    return res.validateError(err);
  }

  const t = await models.sequelize.transaction();
  try {
    const result = await models.CocRules.findOne({
      where: {
        cocId: req.params.cocId,
        id: req.params.ruleId
      }
    }, {
      transaction: t
    });
    if (_.isNull(result)) throw new MainError('common', 'notFound');
    await result.updateAttributes(input, {transaction: t});
    await t.commit();

    req.params.cocId = result.cocId;
    req.params.ruleId = result.id;
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
    const result = await models.CocRules.findOne({
      where: {
        cocId: req.params.cocId, id: req.params.ruleId
      }
    }, {
      transaction: t
    });
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
};


