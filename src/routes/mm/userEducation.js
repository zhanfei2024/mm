const debug = require('debug')('APP:USERCOMPANY');

// model
const models = require('../../models');
const modelHelper = require('../../methods/model');


// validate
const inputCheck = require('input-check');
const validateHelper = require('../../helpers/ValidateHelper');

// library
const _ = require('lodash');
const moment = require('moment');

async function index(req, res, next) {
  debug('Enter index method!');


  const filter = await res.paginatorHelper.initFilter2(req.query);

  if (!_.isNil(req.query.userId)) {
    filter.where.userId = req.query.userId;
  }

  filter.order = [['createdAt', 'DESC']];
  try {
    const result = await modelHelper.findAll('UserEducation', [], filter, []);

    return res.paginatorLimitPlusStyle(result, {}, filter);
  } catch (err) {
    return next(err);
  }
}


async function show(req, res, next) {
  debug('Enter show method!');

  const filter = {
    where: {
      id: req.params.userEducationId,
    }
  };
  try {
    const result = await models.UserEducation.findOne(filter);

    return res.item(result);
  } catch (err) {
    return next(err);
  }

}


async function create(req, res, next) {
  debug('Enter create method!');

  const rules = {
    userId: 'required|integer|min:1',
    educationLevel: 'required|in:any,master,post-graduate,degree,doctor,college,school-certificate|min:1',
    schoolName: 'required|string|min:1',
    subject: 'required|string|min:1',
    gpa: 'nullable|integer|min:1|max:10',
    graduationYear: 'nullable|integer|min:1',
    startDate: 'required|date_iso8601',
    endDate: 'required|date_iso8601',
    description: 'required|string|min:1',
    remark: 'nullable|string|min:1',
  };
  const input = validateHelper.pick(req.body, rules);
  try {
    await inputCheck.validate(input, rules, res.validatorMessage);
  } catch (err) {
    return res.validateError(err);
  }
  const t = await models.sequelize.transaction();
  try {

    // 验证起始时间
    if (moment(input.endDate).isBefore(input.startDate)) throw new MainError('activity', 'startGreaterEndTime');
    // 自动计算用了几年
    input.graduationYear = moment(moment(input.endDate).diff(moment(input.startDate))).year() - 1970;

    const result = await models.UserEducation.create(input, {transaction: t});
    await t.commit();
    if (_.isNull(result)) throw new MainError('common', 'notFound');

    req.params.userEducationId = result.id;

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
    educationLevel: 'nullable|in:any,master,post-graduate,degree,doctor,college,school-certificate|min:1',
    schoolName: 'nullable|string|min:1',
    subject: 'nullable|string|min:1',
    gpa: 'nullable|integer|min:1|max:10',
    graduationYear: 'nullable|integer|min:0',
    startDate: 'nullable|date_iso8601',
    endDate: 'nullable|date_iso8601',
    description: 'nullable|string|min:1',
    remark: 'nullable|string|min:1',
  };
  const input = validateHelper.pick(req.body, rules, [], Object.keys(rules));
  try {
    await inputCheck.validate(input, rules, res.validatorMessage);
  } catch (err) {
    return res.validateError(err);
  }

  const filter = {
    where: {
      id: req.body.userEducationId,
    }
  };
  const t = await models.sequelize.transaction();
  try {
    const result = await models.UserEducation.findOne(filter, {
      transaction: t
    });
    if (_.isNull(result)) throw new MainError('common', 'notFound');
    if (_.isNil(input.endDate)) input.endDate = result.endDate;
    if (_.isNil(input.startDate)) input.startDate = result.startDate;
    // 验证起始时间
    if (moment(input.endDate).isBefore(input.startDate)) throw new MainError('activity', 'startGreaterEndTime');
    // 自动计算用了几年
    input.graduationYear = moment(moment(input.endDate).diff(moment(input.startDate))).year() - 1970;

    await result.updateAttributes(input, {transaction: t});
    await t.commit();

    req.params.userEducationId = result.id;

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
      id: req.params.userEducationId

    }
  };


  const t = await models.sequelize.transaction();
  try {
    const result = await models.UserEducation.findOne(filter, {transaction: t});
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


