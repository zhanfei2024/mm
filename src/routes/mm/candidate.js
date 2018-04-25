'use strict';

// core
const debug = require('debug')('APP:CANDIDATE');

// model
const models = require('../../models');

// library
const _ = require('lodash');
const moment = require('moment');
const inputCheck = require('input-check');
const validateHelper = require('../../helpers/ValidateHelper');
const jobs = require('../../jobs');
const path = require('path');
const randomstring = require("randomstring");
const Storage = require('../../modules/storage');

// method
const modelHelper = require('../../methods/model');


async function index(req, res, next) {
  debug('Enter index method!');

  const rules = {
    search: 'nullable|string|min:1',
    email: 'nullable|string|min:1|email',
    status: 'nullable|string|min:1|in:pending,success,fail',
    userId: 'nullable|integer|min:1|exists:User,id',
    cocId: 'nullable|integer|min:1|exists:Coc,id',
    role: 'nullable|string|min:1|in:user,enterprise,admin',
    enterpriseId: 'nullable|integer|exists:Enterprise,id',
    type: 'nullable|string|in:invitation,appliy',
    account: 'nullable|string|min:1',
    name: 'nullable|string|min:1',
    cocName: 'nullable|string|min:1',
    order: 'nullable|string|in:createdDESC,createdASC,applyDESC,applyASC,inviteDESC,inviteASC'
  };
  const input = validateHelper.pick(req.query, rules);
  try {
    await inputCheck.validate(input, rules, res.validatorMessage);
  } catch (err) {
    return res.validateError(err);
  }

  const filter = await res.paginatorHelper.initFilter2(req.query);

  if (!_.isNil(input.userId)) filter.where.userId = input.userId;
  if (!_.isNil(input.email)) filter.where.email = input.email;
  if (!_.isNil(input.cocId)) filter.where.cocId = input.cocId;
  if (!_.isNil(input.status)) filter.where.status = input.status;
  if (!_.isNil(input.type)) filter.where.type = input.type;

  // 只获取上传凭证后的会员申请。
  if (_.isEqual(input.role, 'enterprise')) {
    filter.where = {
      attachment: {
        $ne: null
      }
    };
  }

  // query condition
  switch (input.order) {
    case 'createdDESC':
      filter.order = [
        ['createdAt', 'DESC']
      ];
      break;
    case 'createdASC':
      filter.order = [
        ['createdAt', 'ASC']
      ];
      break;
    case 'applyDESC':
      filter.order = [
        ['appliedAt', 'DESC']
      ];
      break;
    case 'applyASC':
      filter.order = [
        ['appliedAt', 'ASC']
      ];
      break;
    case 'inviteDESC':
      filter.order = [
        ['createdAt', 'DESC']
      ];
      break;
    case 'inviteASC':
      filter.order = [
        ['invitationAt', 'ASC']
      ];
      break;
    default:
      filter.order = [
        ['createdAt', 'DESC']
      ];
      break;
  }

  // 附带内容
  const scopes = ['includeGroups','includeMemberRating'];
  const filterScopes = [];
  if (!_.isNil(input.name)) {
    filter.where.name = {
      $iLike: `%${input.name}%`
    };
  } else {
    scopes.push('includeUser');
  }
  if (!_.isNil(input.cocName)) {
    filterScopes.push({
      method: ['includeCocs', input.cocName]
    });
  } else {
    scopes.push('includeCocs');
  }

  try {
    const result = await models.Candidate.scope(filterScopes, scopes).findAndCountAll(filter);
    return res.paginatorWithCount(result, {}, filter);
  } catch (err) {
    return next(err);
  }
}

async function show(req, res, next) {
  debug('Enter show method!');

  try {
    // 附带内容
    const scopes = ['includeGroups', 'includeCocs', 'includeUser','includeMemberRating'];

    const result = await models.Candidate.scope(scopes).findOne({
      where: {
        id: req.params.candidateId
      }
    });

    return res.item(result);
  } catch (err) {
    return next(err);
  }
}

async function create(req, res, next) {
  debug('Enter create method!');

  const rules = {
    userId: 'nullable|integer|min:1|exists:User,id',
    enterpriseId: 'nullable|integer|min:1|exists:Enterprise,id',
    cocId: 'required|integer|min:1',
    groupId: 'required|integer|min:1|exists:Group,id',
    memberRatingId: 'nullable|integer|min:1|exists:MemberRating,id',
    type: 'required|string|in:invitation,appliy',
    companyIds: 'nullable|array',
    'companyIds.*': 'nullable|integer|min:1|exists:UserCompany,id',
    status: 'nullable|string|min:1|in:pending,success,fail',
    statement1: 'required_if:type,appliy|boolean',
    statement2: 'required_if:type,appliy|boolean',
    statement3: 'required_if:type,appliy|boolean',
    description: 'nullable|string|min:1',
    remark: 'nullable|string|min:1',
    lang: 'nullable|string|min:1|in:en,hk,cn',
    name: 'nullable|string|min:1',
    email: 'required|string|min:1',
    number: 'nullable|string|min:1',
    phone: 'nullable|string|min:1',
    introducer: 'nullable|string|min:1',
  };
  const input = validateHelper.pick(req.body, rules, ['companyIds.*']);
  try {
    await inputCheck.validate(input, rules, res.validatorMessage);
  } catch (err) {
    return res.validateError(err);
  }

  const t = await models.sequelize.transaction();
  try {
    // get enterpriseId
    const coc = await models.Coc.findOne({
      where: {
        id: input.cocId
      }
    }, {
      transaction: t
    });
    input.enterpriseId = coc.enterpriseId;

    // 验证，商会是否通过审核
    const checkCoc = await models.Coc.findOne({
      where: {
        id: input.cocId,
        isApproved: true,
      }
    }, {
      transaction: t
    });
    if (_.isNull(checkCoc)) throw new MainError('user', 'applyCoc');

    const user = await models.User.findOne({
      where: {
        email: input.email
      }
    }, {
      transaction: t
    });
    if (!_.isNull(user)) {
      input.userId = user.id;
    }
    // 验证，用户是否在member当中
    const checkMember = await models.Member.findOne({
      where: {
        userId: input.userId,
        cocId: input.cocId,
        enterpriseId: input.enterpriseId
      }
    }, {
      transaction: t
    });
    if (!_.isNull(checkMember)) throw new MainError('member', 'memberExists');

    // 验证，用户是否已经申请或邀请
    const checkCandidate = await models.Candidate.findOne({
      where: {
        email: input.email,
        cocId: input.cocId,
        status: 'pending'
      }
    }, {
      transaction: t
    });

    if (!_.isNull(checkCandidate)) throw new MainError('user', checkCandidate.type === 'appliy' ? 'applyExists' : 'invitationExists');

    let candidate = null;
    // 用户申请商会
    if (input.type === 'appliy') {
      input.appliedAt = moment().format('YYYY-MM-DD');
      // 验证用户是否填写个人资料
      const userProfile = await models.UserProfile.findOne({
        where: {
          userId: input.userId,
        }
      }, {
        transaction: t
      });

      if (_.isNull(userProfile)) throw new MainError('user', 'userProfileIsRequired');
      if (_.isNil(userProfile.name)) throw new MainError('user', 'userProfileNameNull');
      if (_.isNil(userProfile.phone)) throw new MainError('user', 'userProfilePhoneNull');
      if (_.isNil(userProfile.countryId)) throw new MainError('user', 'userProfileCountryIdNull');
      if (_.isNil(userProfile.avatar)) throw new MainError('user', 'userProfileAvatarNull');
      if (_.isNil(userProfile.age)) throw new MainError('user', 'userProfileAgeNull');


      //驗證用戶是否填寫公司信息
      const userCompany = await models.UserCompany.findOne({
        where:{
          userId: input.userId,
        }
      },{
        transaction: t
      });
      if(_.isNil(userCompany)) throw new MainError('user', 'userCompanyIsRequired');

      // 自动填充phone内容
      input.phone = userProfile.phone;

      candidate = await models.Candidate.create(input, {
        transaction: t
      });
      if (_.isNull(candidate)) throw new MainError('user', 'applyFail');

      // 申请成功，发送邮件至Enterprise 账号。
      await jobs.create('email::apply_coc_notice', {
        candidate: candidate,
        lang: input.lang
      });
    } else {
      input.invitationAt = moment().format('YYYY-MM-DD');

      // 如果发出邀请的email，为商会账号，则提示
      const enterprise = await models.Enterprise.findOne({
        where: {
          email: input.email
        }
      }, {
        transaction: t
      });
      if (!_.isNil(enterprise)) throw new MainError('coc', 'notInviting');

      candidate = await models.Candidate.create(input, {
        transaction: t
      });
      const isExisted = !_.isNull(await models.User.findOne({
        where: {
          email: input.email
        }
      }));

      // 邀请成功,发送邮件
      await jobs.create('email::invitation_notice', {
        candidate: candidate,
        lang: input.lang,
        isExisted: isExisted
      });
    }
    await t.commit();

    req.params.candidateId = candidate.id;
    return show(req, res, next);
  } catch (err) {
    await t.rollback();
    return next(err);
  }
}

async function update(req, res, next) {
  debug('Enter update method!');

  const rules = {
    candidateId: 'required|integer|exists:Candidate,id|min:1',
    status: 'required|string|min:1|in:pending,success,fail',
    enterpriseId: 'nullable|integer|exists:Enterprise,id',
    cocId: 'nullable|integer|min:1',
    groupId: 'nullable|integer|min:1|exists:Group,id',
    memberRatingId: 'nullable|integer|min:1|exists:MemberRating,id',
    userId: 'nullable|integer|min:1|exists:User,id',
    lang: 'nullable|string|min:1|in:en,hk,cn',
    type: 'required|string|in:invitation,appliy|min:1',
    phone: 'nullable|string|min:1',
    number: 'nullable|string|min:1',
    content: 'nullable|min:1',
    introducer: 'nullable|min:1',
  };
  const input = validateHelper.pick(req.body, rules);
  try {
    await inputCheck.validate(input, rules, res.validatorMessage);
  } catch (err) {
    return res.validateError(err);
  }

  const t = await models.sequelize.transaction();
  try {
    const filter = {
      where: {
        id: input.candidateId
      }
    };
    if (!_.isNil(input.userId)) {
      filter.where.userId = input.userId;
    }
    if (!_.isNil(input.cocId)) {
      filter.where.cocId = input.cocId;
    }
    const candidate = await models.Candidate.findOne(filter, {
      transaction: t
    });
    if (_.isNull(candidate)) throw new MainError('common', 'notFound');
    const user = await models.User.findById(candidate.userId);
    // 验证，用户是否在member当中
    const checkMember = await models.Member.findOne({
      where: {
        userId: candidate.userId,
        cocId: candidate.cocId
      }
    });
    if (!_.isNull(checkMember)) throw new MainError('member', 'memberExists');

    // 申请成功
    if (_.isEqual(input.status, 'success')) {
      // 取得职位，缴费时间跨度，计算出下期缴费日期
      const position = await models.Group.findById(candidate.groupId, {
        transaction: t
      });
      if (_.isNull(position)) throw new MainError('user', 'applyPositionNotExists');

      // 计算出下期缴费日期
      if (position.isForever) {
        // 如果是永久的职位，设置过期时间更久远。但不可以为空。
        input.expireDate = moment().add(10000, 'months').format('YYYY-MM-DD');
      } else {
        input.expireDate = moment().add(position.timeSpan, 'months').format('YYYY-MM-DD');
      }

      input.isActive = true;
      input.email = candidate.email;
      input.enterpriseId = candidate.enterpriseId;
      input.cocId = candidate.cocId;
      input.groupId = candidate.groupId;
      input.memberRatingId = candidate.memberRatingId;
      input.userId = candidate.userId;
      input.number = candidate.number;
      // 审核通过，增加会员。
      await models.Member.create(input, {
        transaction: t
      });

      // 审核通过，发送邮件至 User 账号。
      await jobs.create('email::review_pass_notice', {
        user: user,
        candidate: candidate,
        lang: input.lang
      });

    } else {
      // 审核未通过，商会留言信息。
      input.description = input.content;

      // 审核未通过，发送邮件至 User 账号。
      await jobs.create('email::review_not_pass_notice', {
        user: user,
        candidate: candidate,
        content: input.content,
        lang: input.lang
      });
    }
    // 申请是否通过，更改申请状态
    await candidate.updateAttributes(input, {
      transaction: t
    });
    await t.commit();

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
    const result = await models.Candidate.destroy(filter);
    if (_.isNull(result)) throw new MainError('common', 'notFound');

    return res.return();
  } catch (err) {
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

  const t = await models.sequelize.transaction();
  try {
    const candidate = await models.Candidate.findOne({
      where: {
        id: req.params.candidateId
      },
      transaction: t
    });
    if (_.isNull(candidate)) throw new MainError('common', 'notFound');

    const fileKey = randomstring.generate(24);
    const extname = path.extname(input.file[0].originalname).toLowerCase();
    // 云地址
    const cloudPath = `/uploads/candidate/${candidate.id}/voucher/${fileKey}${extname}`;

    // upload files
    await Storage.disk('local').put(input.file[0].path, cloudPath);

    // 只能保存一张凭证
    await candidate.updateAttributes({
      attachment: `${fileKey}${extname}`
    }, {
      transaction: t
    });
    await t.commit();

    if (!_.isNil(candidate.attachment)) {
      await jobs.create('email::apply_coc_payment_notice', {
        candidate: candidate,
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

/**
 * 提醒Enterprise去审核用户
 */
async function noticeForEmail(req, res, next) {
  debug('ENTER notice for eamil');

  const rules = {
    candidateId: 'required|integer|exists:Candidate,id',
    content: 'required|string|min:1',
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
    const candidate = await models.Candidate.findById(req.params.candidateId, {
      transaction: t
    });
    if (_.isNull(candidate)) throw new MainError('common', 'notFound');

    // 提醒商会审核，会员申请
    if (_.isEqual(candidate.status, 'pending')) {
      await jobs.create('email::apply_coc_notice ', {
        candidate: candidate,
        content: input.content,
        lang: input.lang
      });

      return res.return();
    } else if (_.isEqual(candidate.status, 'success')) {
      throw new MainError('user', 'applyPassed');
      return res.return({
        status: false
      });
    } else {
      throw new MainError('user', 'applyFail');
      return res.return({
        status: false
      });
    }

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
  destroy
};
