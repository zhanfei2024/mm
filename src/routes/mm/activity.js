'use strict';

// core
const debug = require('debug')('APP:ACTIVITY');

const fs = require('fs');

// model
const models = require('../../models');

// method
const modelHelper = require('../../methods/model');


// library
const _ = require('lodash');
const moment = require('moment');
const inputCheck = require('input-check');
const validateHelper = require('../../helpers/ValidateHelper');
const stringHelper = require('../../helpers/StringHelper');

async function index(req, res, next) {
  debug('ENTER index method!');

  const rules = {
    search: 'nullable|string|min:1',
    enterpriseId: 'nullable|integer|min:1|exists:Enterprise,id',
    cocId: 'nullable|integer|min:1|exists:Coc,id',
    categoryIds: 'array',
    'categoryIds.*': 'nullable|integer|min:1',
    isFree: 'nullable|boolean|min:1',
    isApproved: 'nullable|boolean|min:1',
    isActive: 'nullable|boolean|min:1',
    status: 'nullable|string|in:sign-up,close,in-process,ended,full',
    isPublic: 'nullable|boolean',
    userId: 'nullable|integer',
    startTime: 'nullable|date_iso8601',
    endTime: 'nullable|date_iso8601',
    cocName: 'nullable|string|min:1',
    sorting: 'nullable|string|in:newest'
  };
  const input = validateHelper.pick(req.query, rules, ['categoryIds.*']);
  try {
    await inputCheck.validate(input, rules, res.validatorMessage);
  } catch (err) {
    return res.validateError(err);
  }

  try {
    // 注意:按商会名称搜索时会删除最后一个includeCoc
    const scopes = ['includeAttachments', 'includeCoc'], filterScopes = [];
    const filter = await res.paginatorHelper.initFilter(req.query);

    if (!_.isNil(input.search)) {
      filter.where.$or = {
        title: {
          $iLike: '%' + input.search + '%'
        },
        address: {
          $iLike: '%' + input.search + '%'
        }
      };
    }

    if (!_.isNil(input.isApproved)) filter.where.isApproved = input.isApproved;
    if (!_.isNil(input.isActive)) filter.where.isActive = input.isActive;
    if (!_.isNil(input.isFree)) filter.where.isFree = input.isFree;
    if (!_.isNil(input.isPublic)) {
      filter.where.isPublic = input.isPublic;
      filter.where.status = { $not: 'ended' };
    }
    if (!_.isNil(input.status)) filter.where.status = input.status;
    if (!_.isNil(input.startTime)) filter.where.endTimedAt = { $gt: moment(input.startTime).valueOf() };
    if (!_.isNil(input.endTime)) filter.where.signUpEndTimedAt = { $lt: moment(input.endTime).valueOf() }
    if (!_.isNil(input.cocId)) filter.where.cocId = input.cocId;

    // 附带分类和在分类中搜索整合在一起了
    if (!_.isNil(input.categoryIds)) {
      filterScopes.push({ method: ['includeCategories', input.categoryIds] });
    } else {
      scopes.unshift('includeCategories');
    }

    if (!_.isNil(input.cocName)) {
      filterScopes.push({ method: ['includeCocWithSearch', input.cocName] });
      scopes.pop();
    }

    if (!_.isNil(input.sorting)) {
      filterScopes.push({ method: ['sorting', input.sorting] });
    } else {
      filter.order = [['updatedAt', 'DESC']];
    }

    const result = await models.Activity.scope(filterScopes, scopes).findAndCountAll(filter);

    return res.paginatorWithCount(result, {}, filter);
  } catch (err) {
    return next(err);
  }
}

async function show(req, res, next) {
  debug(`ENTER show method!`);

  const rules = {
    enterpriseId: 'nullable|integer|min:1|exists:Enterprise,id',
    cocId: 'nullable|integer|min:1|exists:Coc,id',
    isApproved: 'nullable|boolean|min:1',
    isActive: 'nullable|boolean|min:1',
  };
  const input = validateHelper.pick(req.params, rules);
  try {
    await inputCheck.validate(input, rules, res.validatorMessage);
  } catch (err) {
    return res.validateError(err);
  }

  const t = await models.sequelize.transaction();
  const filter = {
    where: {
      id: req.params.activityId
    }
  };
  const scopes = ['includeCategories', 'includeAttachments', 'includeCandidates', 'includeCoc'];
  if (!_.isNil(input.cocId)) filter.where.cocId = input.cocId;
  if (!_.isNil(input.isActive)) filter.where.isActive = input.isActive;
  if (!_.isNil(input.isApproved)) filter.where.isApproved = input.isApproved;
  if (!_.isNil(input.enterpriseId)) filter.where.enterpriseId = input.enterpriseId;
  if (!_.isNil(input.isPublic)) filter.where.isPublic = input.isPublic;
  try {
    const result = await models.Activity.scope(scopes).findOne(filter);
    if (!_.isNull(result)) {
      const data = {
        applyNumberOfPeople: 0
      };
      // 点击数+1
      if (req.params.clicked) {
        data.view = result.view + 1;
      }
      // 计算每个活动，已经申请的人员数量
      _.forEach(result.candidates, (candidate) => {
        if (candidate.status !== 'fail') {
          data.applyNumberOfPeople += candidate.numberOfPeople;
        }
      });
      // 计算活动状态
      let time = Date.now();
      if (result.status !== 'close') {
        if (moment(result.startTimedAt).isBefore(time)) {
          data.status = 'in-process';
        } else if(result.applyNumberOfPeople === result.personnelNumber) {
          data.status = 'full';
        } else {
          data.status = 'sign-up';
        }
        if (moment(result.endTimedAt).isBefore(time)) {
          data.status = 'ended';
        }
      }
      await result.updateAttributes(data, { transaction: t });
    }
    await t.commit();

    return res.item(result);
  } catch (err) {
    await t.rollback();
    return next(err);
  }
}

async function create(req, res, next) {
  debug(`ENTER create method!`);

  const rules = {
    enterpriseId: 'required|integer|min:1|exists:Enterprise,id',
    cocId: 'required|integer|min:1|exists:Coc,id',
    title: 'required|string|min:1',
    startTimedAt: 'required|date_iso8601',
    endTimedAt: 'required|date_iso8601',
    signUpEndTimedAt: 'required|date_iso8601',
    expenses: 'nullable|numeric|min:0',
    personnelNumber: 'required|integer|min:1',
    address: 'required|string|min:1',
    organizers: 'nullable|string|min:1',
    trafficMode: 'nullable|string|min:1',
    refundInfo: 'nullable|string|min:1',
    specialInfo: 'nullable|string|min:1',
    description: 'required|string|min:1',
    flow: 'nullable|string|min:1',
    isActive: 'nullable|boolean',
    isPublic: 'required|boolean',
    isApproved: 'nullable|boolean',
    isFeatured: 'nullable|boolean',
    isFree: 'nullable|boolean',
    categoryIds: 'nullable|array|min:1',
    'categoryIds.*': 'required_if:categoryIds|integer',
    applyNumberOfPeople: 'nullable|integer|min:0',
    hostCoc: 'required|string|min:1',
    hostContacts: 'required|string|min:1',
    hostPhone: 'required|string|min:1',
    hostEmail: 'required|string|min:1'
  };
  const input = validateHelper.pick(req.body, rules, ['categoryIds.*']);
  try {
    await inputCheck.validate(input, rules, res.validatorMessage);
  } catch (err) {
    return res.validateError(err);
  }
  const t = await models.sequelize.transaction();
  try {

    // expenses 为0, isFree:true,否则isFree:false
    if (_.isEqual('0', input.expenses)) {
      input.isFree = true;
    }
    if (!_.isNil(input.cocId)) {
      // 验证，商会是否通过审核
      const checkCoc = await models.Coc.findOne({
        where: {
          id: input.cocId,
          isApproved: true
        }
      }, { transaction: t });
      if (_.isNull(checkCoc)) throw new MainError('coc', 'applyCoc');

    }

    // 验证，活动时间
    if (moment(input.endTimedAt).isBefore(input.startTimedAt)) throw new MainError('activity', 'startGreaterEndTime');
    if (moment(input.startTimedAt).isBefore(input.signUpEndTimedAt)) throw new MainError('activity', 'startGreaterRegistrationTime');

    if (!_.isNil(input.title)) input.slug = stringHelper.slugify(input.title);
    const result = await models.Activity.create(input, { transaction: t });

    if (!_.isNil(input.categoryIds)) {
      const categories = await models.ActivityCategories.findAll({
        where: {
          id: input.categoryIds,
          parentId: {
            $ne: null
          }
        }
      });
      if (categories.length !== input.categoryIds.length) throw new MainError('activity', 'categoryNotExists');
      await result.setCategories(categories, { transaction: t });
    }
    await t.commit();

    req.params.activityId = result.id;
    return show(req, res, next);
  } catch (err) {
    await t.rollback();
    return next(err);
  }

}

async function update(req, res, next) {
  debug(`ENTER update method!`);

  const rules = {
    enterpriseId: 'nullable|integer|min:1|exists:Enterprise,id',
    cocId: 'nullable|integer|min:1|exists:Coc,id',
    title: 'nullable|string|min:1',
    startTimedAt: 'nullable|date_iso8601',
    endTimedAt: 'nullable|date_iso8601',
    signUpEndTimedAt: 'nullable|date_iso8601',
    expenses: 'nullable|numeric|min:0',
    personnelNumber: 'nullable|integer|min:1',
    address: 'nullable|string|min:1',
    organizers: 'nullable|string|min:1',
    trafficMode: 'nullable|string|min:1',
    refundInfo: 'nullable|string|min:1',
    specialInfo: 'nullable|string|min:1',
    description: 'nullable|string|min:1',
    flow: 'nullable|string|min:1',
    status: 'nullable|string|in:sign-up,close,in-process,ended,full',
    isActive: 'nullable|boolean|min:1|in:true,false',
    isPublic: 'nullable|boolean|min:1|in:true,false',
    isApproved: 'nullable|boolean|min:1|in:true,false',
    isFeatured: 'nullable|boolean|min:1|in:true,false',
    isFree: 'nullable|boolean|min:1|in:true,false',
    categoryIds: 'nullable|array',
    'categoryIds.*': 'required_if:categoryIds|integer',
    hostCoc: 'required|string|min:1',
    hostContacts: 'required|string|min:1',
    hostPhone: 'required|string|min:1',
    hostEmail: 'required|string|min:1'
  };
  const input = validateHelper.pick(req.body, rules, ['categoryIds.*']);
  try {
    await inputCheck.validate(input, rules, res.validatorMessage);
  } catch (err) {
    return res.validateError(err);
  }

  const t = await models.sequelize.transaction();
  try {

    if (!_.isNil(input.startTimedAt) && moment(input.endTimedAt).isBefore(input.startTimedAt)) throw new MainError('activity', 'startGreaterEndTime');
    if (!_.isNil(input.startTimedAt) && moment(input.startTimedAt).isBefore(input.signUpEndTimedAt)) throw new MainError('activity', 'startGreaterRegistrationTime');

    const result = await models.Activity.findById(req.params.activityId);
    if (_.isNull(result)) throw new MainError('common', 'notFound');

    if (!_.isNil(input.categoryIds)) {
      const categories = await models.ActivityCategories.findAll({
        where: {
          id: input.categoryIds,
          parentId: {
            $ne: null
          }
        }
      }, { transaction: t });
      if (categories.length !== input.categoryIds.length) throw new MainError('activity', 'categoryNotExists');
      await result.setCategories(categories, { transaction: t });
    }

    if (!_.isNil(input.title)) input.slug = stringHelper.slugify(input.title);

    await result.updateAttributes(_.omit(input, ['categoryIds']), { transaction: t });
    await t.commit();

    req.params.activityId = result.id;

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
    const result = await models.Activity.findById(req.params.activityId);
    if (_.isNull(result)) throw new MainError('common', 'notFound');

    await result.destroy({ transaction: t });
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


