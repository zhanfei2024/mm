const debug = require('debug')('APP:USER_EXPERIENCE');

// model
const models = require('../../models');

// validate
const inputCheck = require('input-check');
const validateHelper = require('../../helpers/ValidateHelper');

const modelHelper = require('../../methods/model');


// library
const _ = require('lodash');
const moment = require('moment');


async function index(req, res, next) {
  debug("Enter index method");

  const rules = {
    userId: 'integer|min:1|exists:User,id',
  };
  const input = validateHelper.pick(req.query, rules);
  try {
    await inputCheck.validate(input, rules, res.validatorMessage);
  } catch (err) {
    return res.validateError(err);
  }

  const filter = await res.paginatorHelper.initFilter2(req.query);

  if (!_.isNil(input.userId)) {
    filter.where.userId = input.userId;
  }

  filter.order = [['createdAt', 'DESC']];
  try {
    const result = await modelHelper.findAll('UserExperience', [], filter, []);

    return res.paginatorLimitPlusStyle(result, {}, filter);
  } catch (err) {
    return next(err);
  }
}

async function show(req, res, next) {
  debug('Enter show method!');

  const filter = {
    where: {
      id: req.params.experienceId,
      userId: req.params.userId
    }
  };

  try {
    const result = await models.UserExperience.findOne(filter);

    return res.item(result);
  } catch (err) {
    return next(err);
  }

}


async function create(req, res, next) {
  debug('Enter create method!');

  const rules = {
    userId: 'required|nullable|integer|min:1',
    companyName: 'required|string',
    title: 'nullable|string|min:1',
    startedDate: 'required|date_iso8601',
    endedDate: 'required|date_iso8601',
    description: 'required|string',
    position: 'required|string|min:1',
    remark: 'nullable|string'
  };
  const input = validateHelper.pick(req.body, rules);
  try {
    await inputCheck.validate(input, rules, res.validatorMessage);
  } catch (err) {
    return res.validateError(err);
  }
  if (moment(input.endedDate).isBefore(input.startedDate)) throw new MainError('activity', 'startGreaterEndTime');

  const t = await models.sequelize.transaction();
  try {
    const result = await models.UserExperience.create(input, {transaction: t});
    await t.commit();

    req.params.userId = req.body.userId;
    req.params.experienceId = result.id;

    return show(req, res, next);
  } catch (err) {
    await t.rollback();
    return next(err);
  }
}

async function update(req, res, next) {
  debug('Enter update method!');
  const filter = {
    where: {
      id: req.body.experienceId,
      userId: req.body.userId
    }
  };

  const rules = {
    companyName: 'nullable|string',
    title: 'nullable|string',
    startedDate: 'nullable|string',
    endedDate: 'nullable|date_iso8601',
    description: 'nullable|string',
    position: 'nullable|string|min:1',
    remark: 'nullable|string'
  };
  const input = validateHelper.pick(req.body, rules, [], Object.keys(rules));
  try {
    await inputCheck.validate(input, rules, res.validatorMessage);
  } catch (err) {
    return res.validateError(err);
  }

  const t = await models.sequelize.transaction();
  try {
    const result = await models.UserExperience.findOne(filter, {
      transaction: t
    });
    if (_.isNull(result)) throw new MainError('common', 'notFound');
    await result.updateAttributes(input, {transaction: t});
    await t.commit();

    req.params.userId = req.body.userId;
    req.params.experienceId = req.body.experienceId;

    return show(req, res, next);
  } catch (err) {
    await t.rollback();
    return next(err);
  }
}


async function destroy(req, res, next) {
  debug('Enter destroy method!');

  const filter = {
    where: {
      id: req.params.experienceId,
      userId: req.params.userId
    }
  };
  const t = await models.sequelize.transaction();
  try {
    const result = await models.UserExperience.findOne(filter, {
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
  create,
  show,
  index,
  update,
  destroy
};


