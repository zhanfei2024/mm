// debug
const debug = require('debug')('APP:MEMBER_RATING');

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
  debug('Enter index method!');

  const rules = {
    search: 'nullable|string',
    enterpriseId: 'nullable|integer|min:1|exists:Enterprise,id',
    cocId: 'nullable|integer|min:1|exists:Coc,id',
  };
  const input = validateHelper.pick(req.query, rules);
  try {
    await inputCheck.validate(input, rules, res.validatorMessage);
  } catch (err) {
    return res.validateError(err);
  }

  const filter = await res.paginatorHelper.initFilter2(req.query);

  if (!_.isNil(input.enterpriseId)) {
    filter.where.enterpriseId = input.enterpriseId;
  }

  if (!_.isNil(input.cocId)) {
    filter.where.cocId = input.cocId;
  }

  // sorting
  filter.order = [['createdAt', 'DESC']];

  try {
    const result = await modelHelper.findAll('MemberRating', [], filter, []);

    return res.paginatorLimitPlusStyle(result, {}, filter)
  } catch (err) {
    return next(err);
  }

}

async function show(req, res, next) {
  debug('Enter show method!');

  try {
    const result = await models.MemberRating.findById(req.params.memberRatingId);

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
    title: 'required|string|min:1',
    description: 'nullable|string|min:1',
    remark: 'nullable|string|min:1'
  };
  const input = validateHelper.pick(req.body, rules);
  try {
    await inputCheck.validate(input, rules, res.validatorMessage);
  } catch (err) {
    return res.validateError(err);
  }

  const t = await models.sequelize.transaction();
  try {
    const result = await models.MemberRating.create(input, {transaction: t});
    await t.commit();

    req.params.memberRatingId = result.id;
    return show(req, res, next);
  } catch (err) {
    await t.rollback();
    return next(err);
  }
}

async function update(req, res, next) {
  debug('ENTER update method!');

  const rules = {
    enterpriseId: 'required|integer|min:1|exists:Enterprise,id',
    cocId: 'required|integer|min:1|exists:Coc,id',
    title: 'required|string|min:1',
    description: 'nullable|string|min:1',
    remark: 'nullable|string|min:1'
  };
  const input = validateHelper.pick(req.body, rules);
  try {
    await inputCheck.validate(input, rules, res.validatorMessage);
  } catch (err) {
    return res.validateError(err);
  }

  const filter = {
    where: {
      cocId: input.cocId,
      enterpriseId: input.enterpriseId,
      id: req.params.memberRatingId,
    }
  };

  const t = await models.sequelize.transaction();
  try {
    const result = await models.MemberRating.findOne(filter, {transaction: t});
    if (_.isNull(result)) {
      throw new MainError('common', 'notFound');
    }

    await result.updateAttributes(input, {transaction: t});
    await t.commit();

    req.params.memberRatingId = result.id;
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
    const result = await models.MemberRating.findById(req.params.memberRatingId, {transaction: t});
    if (_.isNull(result)) {
      throw new MainError('common', 'notFound');
    }

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
