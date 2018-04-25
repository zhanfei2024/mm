'use strict';

// core
const debug = require('debug')('APP:ACTIVITY_CANDIDATE');

// model
const models = require('../../models');

// method
const modelHelper = require('../../methods/model');

// library
const _ = require('lodash');
const moment = require('moment');
const inputCheck = require('input-check');
const validateHelper = require('../../helpers/ValidateHelper');
const jobs = require('../../jobs');
const fs = require('fs');
const path = require('path');
const randomstring = require("randomstring");
const Storage = require('../../modules/storage');
const xlsx = require('node-xlsx').default;
const shell = require('shelljs');


async function index(req, res, next) {
  debug('Enter index method!');

  const rules = {
    search: 'nullable|string|min:1',
    status: 'nullable|string|min:1|in:pending,success,fail',
    userId: 'nullable|integer|min:1|exists:User,id',
    activityId: 'nullable|integer|min:1|exists:Activity,id',
    cocId: 'nullable|integer|min:1|exists:Coc,id',
    activityStatus: 'nullable|string|in:sign-up,close,in-process,ended,full',
    role: 'nullable|string|min:1|in:user,enterprise,admin',
    isFree: 'nullable|boolean|min:1|in:true,false'
  };
  const input = validateHelper.pick(req.query, rules);
  try {
    await inputCheck.validate(input, rules, res.validatorMessage);
  } catch (err) {
    return res.validateError(err);
  }

  const filter = await res.paginatorHelper.initFilter(req.query);
  const scopeFilter = [];

  if (!_.isNil(input.userId)) filter.where.userId = input.userId;
  if (!_.isNil(input.cocId)) filter.where.cocId = input.cocId;
  if (!_.isNil(input.status)) filter.where.status = input.status;

  // 查看某一活动报名情况
  if (!_.isNil(input.activityId)) filter.where.activityId = input.activityId;

  // 搜索
  if (!_.isNil(input.search)) {
    scopeFilter.push({ method: ['includeActivitiesWithSearch', input.search] });
  }
  // 根据活动状态搜索
  if (!_.isNil(input.activityStatus)) {
    scopeFilter.push({ method: ['includeActivitiesWithStatus', input.activityStatus] });
  }
  // 附带内容
  const scopes = ['includeUser', 'includeActivities', 'includeCocs'];

  // query condition
  filter.order = [['appliedAt', 'DESC']];

  try {
    const result = await models.ActivityCandidate.scope(scopes, scopeFilter).findAndCountAll(filter);
    return res.paginatorWithCount(result, {}, filter);
  } catch (err) {
    return next(err);
  }
}

async function show(req, res, next) {
  debug('Enter show method!');

  const rules = {
    userId: 'nullable|integer|min:1',
    cocId: 'nullable|integer|min:1',
    activityId: 'required|integer|min:1',
    candidateId: 'required|integer|min:1'
  };
  const input = validateHelper.pick(req.params, rules);
  try {
    await inputCheck.validate(input, rules, res.validatorMessage);
  } catch (err) {
    return res.validateError(err);
  }

  try {
    const filter = {
      where: {
        id: input.candidateId,
        activityId: input.activityId
      }
    };
    if (!_.isNil(input.userId)) filter.where.userId = input.userId;
    if (!_.isNil(input.cocId)) filter.where.cocId = input.cocId;

    // 附带内容
    const scopes = ['includeUser', 'includeActivities', 'includeCocs'];

    const result = await models.ActivityCandidate.scope(scopes).findOne(filter);

    return res.item(result);
  } catch (err) {
    return next(err);
  }
}

async function create(req, res, next) {
  debug('Enter create method!');

  const rules = {
    userId: 'required|integer|min:1|exists:User,id',
    activityId: 'nullable|integer|min:1',
    contact: 'required|string|min:1',
    email: 'required|email|string|min:1',
    phone: 'required|string|min:1|max:12',
    numberOfPeople: 'required|integer|min:1',
    status: 'nullable|string|min:1|in:pending,success,fail',
    description: 'nullable|string|min:1',
    remark: 'nullable|string|min:1',
    lang: 'nullable|string|min:1|in:en,hk,cn',
  };
  const input = validateHelper.pick(req.body, rules);
  try {
    await inputCheck.validate(input, rules, res.validatorMessage);
  } catch (err) {
    return res.validateError(err);
  }

  const t = await models.sequelize.transaction();
  try {
    const activity = await models.Activity.findById(input.activityId, { transaction: t });
    if (_.isNull(activity)) {
      throw new MainError('activity', 'activityNotFound');
    } else {
      input.enterpriseId = activity.enterpriseId;
      input.cocId = activity.cocId;
    }

    // 验证，用户是否已经申请。
    const checkActivityCandidate = await models.ActivityCandidate.findOne({
      where: {
        userId: input.userId,
        enterpriseId: input.enterpriseId,
        cocId: input.cocId,
        activityId: input.activityId,
        status: ['pending', 'success']
      }
    }, { transaction: t });
    if (!_.isNull(checkActivityCandidate)) throw new MainError('user', 'applyExists');

    // 验证用户是否填写个人资料
    const userProfile = await models.UserProfile.findOne({
      where: {
        userId: input.userId
      }
    }, { transaction: t });
    if (_.isNull(userProfile)) throw new MainError('user', 'userProfileIsRequired');
    if (_.isNull(userProfile.chineseName)) throw new MainError('user', 'userProfileChineseNameNull');
    if (_.isNull(userProfile.IDNumber)) throw new MainError('user', 'userProfileIDNumberNull');
    if (_.isNull(userProfile.phone)) throw new MainError('user', 'userProfilePhoneNull');
    if (_.isNull(userProfile.countryId)) throw new MainError('user', 'userProfileCountryIdNull');

    input.appliedAt = moment().format('YYYY-MM-DD');

    let data = { applyNumberOfPeople: 0 };
    data.applyNumberOfPeople = parseInt(input.numberOfPeople);
    if (data.applyNumberOfPeople + activity.applyNumberOfPeople > activity.personnelNumber) {
      throw new MainError('activity', 'overNumber');
    }

    const candidate = await models.ActivityCandidate.create(input, { transaction: t });
    if (_.isNull(candidate)) throw new MainError('user', 'applyFail');

    await t.commit();

    // 申请成功，发送邮件至Enterprise 账号。
    await jobs.create('email::apply_activity_notice', {
      candidate: candidate,
      lang: input.lang
    });

    req.params.candidateId = candidate.id;
    return show(req, res, next);
  } catch (err) {
    await t.rollback();
    return next(err);
  }
}

async function uploadVoucher(req, res, next) {
  debug('ENTER upload voucher method!');

  const rules = {
    file: 'required|array',
    'file.*': 'file|image',
    lang: 'nullable|string|min:1|in:en,hk,cn'
  };
  const input = validateHelper.pick(req.files, rules, ['file.*']);
  try {
    await inputCheck.validate(input, rules, res.validatorMessage);
  } catch (err) {
    return res.validateError(err);
  }

  const filter = {
    id: req.params.candidateId,
    userId: req.params.userId
  };
  const t = await models.sequelize.transaction();
  try {
    const candidate = await models.ActivityCandidate.findOne(filter, {
      transaction: t
    });
    if (_.isNull(candidate)) throw new MainError('common', 'notFound');

    const fileKey = randomstring.generate(24);
    const extname = path.extname(input.file[0].originalname).toLowerCase();
    // 云地址
    const cloudPath = `/uploads/activity/candidate/${candidate.id}/voucher/${fileKey}${extname}`;

    // upload files
    await Storage.disk('local').put(input.file[0].path, cloudPath);

    // 只能保存一张凭证
    await candidate.updateAttributes({ attachment: `${fileKey}${extname}` }, { transaction: t });
    await t.commit();

    if (!_.isNull(candidate.attachment)) {
      await jobs.create('email::apply_activity_payment_notice', {
        candidate: candidate,
        lang: input.lang
      });
    }
    req.query.candidateId = candidate.id;

    return show(req, res, next);
  } catch (err) {
    await t.rollback();
    return next(err);
  }

}

async function noticeForEmail(req, res, next) {
  debug('ENTER notice for eamil');

  const rules = {
    candidateId: 'required|integer|exists:ActivityCandidate,id',
    content: 'required|string|min:1',
    lang: 'nullable|string|min:1|in:en,hk,cn'
  };

  const input = validateHelper.pick(req.body, rules);
  try {
    await inputCheck.validate(input, rules, res.validatorMessage);
  } catch (err) {
    return res.validateError(err);
  }

  const filter = {
    id: req.params.candidateId,
    userId: req.body.userId
  };
  const t = await models.sequelize.transaction();
  try {
    const candidate = await models.ActivityCandidate.findOne(filter, {
      transaction: t
    });
    if (_.isNull(candidate)) throw new MainError('common', 'notFound');

    // 提醒商会审核，会员申请
    if (_.isEqual(candidate.status, 'pending')) {
      await jobs.create('email::apply_activity_notice', {
        candidate: candidate,
        content: input.content,
        lang: input.lang
      });

      return res.return();
    } else if (_.isEqual(candidate.status, 'success')) {
      throw new MainError('user', 'applyPassed');
      return res.return({ status: false });
    } else {
      throw new MainError('user', 'applyFail');
      return res.return({ status: false });
    }

  } catch (err) {
    await t.rollback();
    return next(err);
  }
}


/**
 *
 * 1. 审核
 * 如果商会审核通过，表明该用户已成功申请活动。
 * @param req
 * @param res
 * @param next
 * @returns {Promise.<*>}
 */
async function update(req, res, next) {
  debug('Enter update method!');

  const rules = {
    status: 'required|string|min:1|in:success,fail',
    enterpriseId: 'required_if:status,success|integer|exists:Enterprise,id',
    cocId: 'required_if:status,success|integer|min:1',
    userId: 'required_if:status,success|integer|min:1|exists:User,id',
    description: 'nullable|string|min:1',
    lang: 'nullable|string|min:1|in:en,hk,cn'
  };
  const input = validateHelper.pick(req.body, rules);
  try {
    await inputCheck.validate(input, rules, res.validatorMessage);
  } catch (err) {
    return res.validateError(err);
  }

  const t = await models.sequelize.transaction();
  try {
    const candidate = await models.ActivityCandidate.findById(req.params.candidateId, { transaction: t });
    if (_.isNull(candidate)) throw new MainError('common', 'notFound');

    if (input.status === 'sucess') {
      //判断当前人数超过了没有
      const activity = await models.Activity.findById(req.params.activityId);
      if (_.isNull(activity)) {
        throw new MainError('commom', 'notFound');
      }
      if (activity.applyNumberOfPeople + candidate.numberOfPeople > activity.personnelNumber) {
        throw new MainError('activity', 'overNumber');
      }
      // 活动报名成功的人数+
      await activity.updateAttributes({ applyNumberOfPeople: activity.applyNumberOfPeople + candidateId.numberOfPeople }, { transaction: t });
    }


    // 发送邮件基础数据
    const user = await models.User.findById(input.userId, { transaction: t });
    if (_.isNull(user)) throw new MainError('common', 'notFound');


    // 申请是否通过，更改申请状态
    await candidate.updateAttributes(input, { transaction: t });
    await t.commit();
    // 申请成功
    if (_.isEqual(input.status, 'success')) {
      // 审核通过，发送邮件至 User 账号。
      await jobs.create('email::apply_activity_pass', {
        user: user,
        candidate: candidate,
        lang: input.lang
      });

    } else {
      // 审核未通过，发送邮件至 User 账号。
      await jobs.create('email::apply_activity_not_pass', {
        user: user,
        candidate: candidate,
        content: input.description,
        lang: input.lang
      });
    }

    req.params.candidateId = candidate.id;
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
      id: req.params.candidateId
    }
  };
  try {
    const result = await models.ActivityCandidate.destroy(filter);

    return res.return();
  } catch (err) {
    return next(err);
  }
}

async function isJoined(req, res, next) {
  debug('ENTER isJoined method!');

  const rules = {
    userId: 'required|integer|min:1',
    activityId: 'required|integer|min:1|exists:Activity,id'
  };
  const input = validateHelper.pick(req.query, rules);
  try {
    await inputCheck.validate(input, rules, res.validatorMessage);
  } catch (err) {
    return res.validateError(err);
  }

  const filter = {
    where: {
      activityId: input.activityId,
      userId: input.userId,
      status: ['pending', 'success']
    }
  };
  try {
    const activityCandidate = await models.ActivityCandidate.findOne(filter);
    if (!_.isNull(activityCandidate)) {
      if (activityCandidate.status === 'success') {
        return res.return({ status: 'true' });
      } else if (activityCandidate.status === 'pending') {
        return res.return({ status: 'applying' });
      }
    }
    return res.return({ status: 'false' });
  } catch (err) {
    next(err);
  }

}

async function exports(req, res, next) {
  debug('ENTER exports xlsx method!');

  const t = await models.sequelize.transaction();
  try {
    const result = await models.Coc.findById(req.params.cocId);
    if (_.isNull(result)) {
      throw new MainError('common', 'notFound');
    }
    const activityCandidates = await models.ActivityCandidate.findAll({ where: { cocId: result.id } });
    const data = [['顺序', 'id', '企业id', '商会id', '活动id', '用户id', '联系人', '电子邮件', '手机号', '申请人数', '状态', '支付费用', '申请时间', '拒绝原因']];
    _.forEach(activityCandidates, function (item, key) {
      let temp = [
        key,
        item.id,
        item.enterpriseId,
        item.commit,
        item.activityId,
        item.userId,
        item.contact,
        item.email,
        item.phone,
        item.numberOfPeople,
        item.status == 'pending' ? '申请中' : item.status == 'success' ? '已通过' : '已拒绝',
        item.paymentBalance,
        item.applyNumberOfPeople,
        item.description
      ]
      data.push(temp);
    });
    const buff = xlsx.build([{ name: 'candidate', data: data }]);
    let pathStr = path.normalize(__base + `client/frontend/src/assets/cocs/${result.id}/activity-candidates.xlsx`);
    if (!fs.existsSync(path.dirname(pathStr))) {
      shell.mkdir('-p', path.dirname(pathStr));
    }
    fs.writeFileSync(pathStr, buff, { 'flag': 'w' });

    await t.commit();

    return res.item(`/assets/cocs/${result.id}/activity-candidates.xlsx`)
  } catch (err) {
    await t.rollback();
    return next(err);
  }
}

module.exports = {
  index,
  show,
  create,
  uploadVoucher,
  noticeForEmail,
  update,
  destroy,
  isJoined,
  exports
};
