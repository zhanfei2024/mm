// debug
const debug = require('debug')('APP:MEMBER');

// model
const models = require('../../models');

// validate
const inputCheck = require('input-check');
const validateHelper = require('../../helpers/ValidateHelper');

// library
const _ = require('lodash');
const jobs = require('../../jobs');
const path = require('path');
const randomstring = require("randomstring");
const Storage = require('../../modules/storage');


// method
const modelHelper = require('../../methods/model');

async function index(req, res, next) {
  debug('Enter index method!');

  const rules = {
    search: 'nullable|string',
    enterpriseId: 'nullable|integer|min:1|exists:Enterprise,id',
    cocId: 'nullable|integer|min:1|exists:Coc,id',
    number: 'nullable|string|min:1',
    userId: 'nullable|integer|exists:User,id',
    groupId: 'nullable|integer|exists:Group,id',
    invitationStatus: 'nullable|string|in:pending,success,fail',
    isActive: 'nullable|boolean',
    sorting: 'nullable|string|min:1|in:numberASC,numberDESC,expireDateASC,expireDateDESC,createdAt,positionAsc,positionDesc,usernameAsc,usernameDesc'
  };
  const input = validateHelper.pick(req.query, rules);
  try {
    await inputCheck.validate(input, rules, res.validatorMessage);
  } catch (err) {
    return res.validateError(err);
  }

  const filter = await res.paginatorHelper.initFilter(req.query);
  if (!_.isNil(input.enterpriseId)) filter.where.enterpriseId = input.enterpriseId;
  if (!_.isNil(input.cocId)) filter.where.cocId = input.cocId;
  if (!_.isNil(input.userId)) filter.where.userId = input.userId;
  if (!_.isNil(input.groupId)) filter.where.groupId = input.groupId;
  if (!_.isNil(input.number)) filter.where.number = input.number;
  if (req.query.invitation === true) filter.where.invitationAt = {$not: null};

  // sorting
  switch (input.sorting) {
    case 'numberDESC':
      filter.order = [['number', 'DESC']];
      break;
    case 'numberASC':
      filter.order = [['number', 'ASC']];
      break;
    case 'expireDateASC':
      filter.order = [['expireDate', 'ASC']];
      break;
    case 'expireDateDESC':
      filter.order = [['expireDate', 'DESC']];
      break;
    case 'positionAsc':
      filter.order = [[{model: models.Group, as: 'group'}, 'order', 'ASC']];
      break;
    case 'positionDesc':
      filter.order = [[{model: models.Group, as: 'group'}, 'order', 'DESC']];
      break;
    case 'usernameAsc':
      filter.order = [[
        {model: models.User, as: 'user'},
        {model: models.UserProfile, as: 'userProfile'},
        'name', 'ASC'
      ]];
      break;
    case 'usernameDesc':
      filter.order = [[
        {model: models.User, as: 'user'},
        {model: models.UserProfile, as: 'userProfile'},
        'name', 'DESC'
      ]];
      break;
    default:
      filter.order = [['createdAt', 'DESC']];
  }

  // 添加信息
  const scopes = ['includeUser', 'includeGroup', 'includeCoc', 'includeMemberRating'];
  // 用户查看加入的商会列表
  if (req.params.isUser === true) scopes.shift();

  try {
    const result = await models.Member.scope(scopes).findAndCountAll(filter);
    return res.paginatorWithCount(result, {}, filter);
  } catch (err) {
    return next(err);
  }

}

async function show(req, res, next) {
  debug('Enter show method!');

  const filter = {
    where: {
      id: req.params.memberId,
    },
  };
  const scopes = ['includeUser', 'includeGroup', 'includeMemberRating'];

  try {
    const result = await models.Member.scope(scopes).findOne(filter);

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
    groupId: 'required|integer|min:1|exists:Group,id',
    memberRatingId: 'nullable|integer|min:1|exists:MemberRating,id',
    userId: 'nullable|integer|min:1|exists:User,id',
    expireDate: 'required|date_iso8601',
    number: 'nullable|string|min:1',
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

    const member = await models.Member.findOne({where: {email: req.body.email, cocId: req.body.cocId}});
    if (!_.isNull(member)) throw new MainError('member', 'inMember');

    const result = await models.Member.create(input, {transaction: t});
    await t.commit();

    const isExisted = !_.isNull(await models.User.findOne({where: {email: req.body.email}}));

    await jobs.create('email::invitation_notice', {
      member: result,
      lang: input.lang,
      isExisted: isExisted
    });

    req.params.memberId = result.id;

    return show(req, res, next);
  } catch (err) {

    await t.rollback();
    return next(err);
  }
}

async function update(req, res, next) {
  debug('ENTER update method!');

  const rules = {
    enterpriseId: 'nullable|integer|min:1|exists:Enterprise,id',
    cocId: 'nullable|integer|min:1|exists:Coc,id',
    groupId: 'nullable|integer|min:1|exists:Group,id',
    memberRatingId: 'nullable|integer|min:1|exists:MemberRating,id',
    userId: 'nullable|integer|min:1|exists:User,id',
    expireDate: 'nullable|date_iso8601',
    isActive: 'nullable|boolean',
    memberId: 'nullable|integer',
    number: 'nullable|string|min:1',
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
      id: input.memberId,
    }
  };

  const t = await models.sequelize.transaction();
  try {
    const result = await models.Member.findOne(filter, {transaction: t});
    if (_.isNull(result)) throw new MainError('common', 'notFound');
    await result.updateAttributes(input, {transaction: t});
    await t.commit();

    req.params.memberId = result.id;

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
    const result = await models.Member.findById(req.params.memberId, {transaction: t});
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
