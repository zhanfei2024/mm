'use strict';

// core
const debug = require('debug')('APP:MESSAGE');

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
    enterpriseId: 'nullable|integer|min:0|exists:Enterprise,id',
    cocId: 'nullable|integer|min:0|exists:Coc,id',
    userId: 'nullable|integer|min:0|exists:User,id',
    cocName: 'nullable|string|min:1'
  };
  const input = validateHelper.pick(req.query, rules);
  try {
    await inputCheck.validate(input, rules, res.validatorMessage);
  } catch (err) {
    return res.validateError(err);
  }

  const filter = await res.paginatorHelper.initFilter(req.query);
  const filterScopes = [];
  if (!_.isNil(input.enterpriseId)) {
    filter.where.enterpriseId = input.enterpriseId;
  }
  if (!_.isNil(input.cocId)) {
    filter.where.cocId = input.cocId;
  }
  if (!_.isNil(input.userId)) {
    filter.where.userId = input.userId;
  }
  if (!_.isNil(input.search)) {
    filter.where.$or = {
      title: {
        $iLike: `%${input.search}%`
      },
      leavingMessage: {
        $iLike: `%${input.search}%`
      },
      messageReply: {
        $iLike: `%${input.search}%`
      }
    };
  }
  filterScopes.push({ method: ['includeCocs', input.cocName] });
  try {
    const result = await models.Message.scope(filterScopes).findAndCountAll(filter);
    return res.paginatorWithCount(result, {}, filter);
  } catch (err) {
    return next(err);
  }
}

async function show(req, res, next) {
  debug('ENTER show method!');

  const rules = {
    messageId: 'required|integer|min:0|exists:Message,id',
    userId: 'nullable|integer|min:0|exists:User,id',
    cocId: 'nullable|integer|min:0|exists:Coc,id',
    enterpriseId: 'nullable|integer|min:0|exists:Enterprise,id'
  };
  const input = validateHelper.pick(req.params, rules);
  try {
    await inputCheck.validate(input, rules, res.validatorMessage);
  } catch (err) {
    return res.validateError(err);
  }
  const filter = {
    where: {
      id: input.messageId
    }
  };
  if (!_.isNil(input.userId)) {
    filter.where['userId'] = input.userId;
  }
  if (!_.isNil(input.cocId)) {
    filter.where['cocId'] = input.cocId;
  }
  if (!_.isNil(input.enterpriseId)) {
    filter.where['enterpriseId'] = input.enterpriseId;
  }

  const t = await models.sequelize.transaction();
  try {
    const result = await models.Message.findOne(filter, { transaction: t });
    await t.commit();

    return res.item(result);
  } catch (err) {
    await t.rollback();
    return next(err);
  }
}

async function create(req, res, next) {
  debug('ENTER create method!');

  const rules = {
    enterpriseId: 'nullable|integer|min:0|exists:Enterprise,id',
    cocId: 'required|integer|min:0|exists:Coc,id',
    userId: 'required|integer|min:0|exists:User,id',
    title: 'required|string|min:6',
    contacts: 'nullable|string|min:1',
    phone: 'nullable|string|min:1',
    email: 'nullable|string|min:1',
    leavingMessage: 'required|string|min:1'
  };
  const input = validateHelper.pick(req.body, rules);
  try {
    await inputCheck.validate(input, rules, res.validatorMessage);
  } catch (err) {
    return res.validateError(err);
  }
  input.leavingMessagedAt = Date.now();
  input.createdAt = Date.now();
  input.updatedAt = Date.now();

  const t = await models.sequelize.transaction();
  try {
    const userProfile = await models.UserProfile.findOne({ where: { userId: input.userId } }, { transation: t });
    input.contacts = userProfile.name;
    input.email = userProfile.email;
    if (_.isNil(userProfile.phone)) {
      throw new MainError('user', 'userProfilePhoneNull');
    } else {
      input.phone = userProfile.phone;
    }
    const coc = await models.Coc.findById(input.cocId);
    input.enterpriseId = coc.enterpriseId;

    const result = await models.Message.create(input, { transation: t });
    if (_.isNull(result)) {
      throw new MainError('message', 'notFound');
    }
    await t.commit();

    req.params.messageId = result.id;
    req.params.cocId = result.cocId;
    req.params.enterpriseId = result.enterpriseId;

    return show(req, res, next);
  } catch (err) {
    await t.rollback();
    return next(err);
  }
}

async function update(req, res, next) {
  debug('ENTER update method!');

  const rules = {
    messageId: 'nullable|integer|min:0|exists:Message,id',
    cocId: 'nullable|integer|min:0|exists:Coc,id',
    enterpriseId: 'nullable|integer|min:0|exists:Enterprise,id',
    userId: 'nullable|integer|min:0|exists:User,id',
    messageReply: 'nullable|string|min:1',
    isActive: 'nullable|boolean'
  };
  const input = validateHelper.pick(req.body, rules);
  try {
    await inputCheck.validate(input, rules, res.validatorMessage);
  } catch (err) {
    return res.validateError(err);
  }
  const filter = {
    where: {
      id: input.messageId,
      cocId: input.cocId,
      enterpriseId: input.enterpriseId
    }
  };
  const t = await models.sequelize.transaction();
  try {
    const result = await models.Message.findOne(filter);
    if (_.isNull(result)) {
      throw new MainError('common', 'notFound');
    }
    result.messageReply = input.messageReply;
    await result.save();
    t.commit();

    req.params.userId = result.userId;
    req.params.enterpriseId = req.body.enterpriseId;

    return show(req, res, next);
  } catch (err) {
    await t.rollback();
    return next(err);
  }
}

async function destroy(req, res, next) {
  debug('ENTER update method!');

  const filter = {
    where: {
      id: req.params.messagesId
    }
  };
  const t = await models.sequelize.transaction();
  try {
    if (!_.isNil(req.params.userId)) {
      filter.where['userId'] = req.params.userId;
    }
    if (!_.isNil(req.params.cocId)) {
      filter.where['cocId'] = req.params.cocId;
    }
    if (!_.isNil(req.params.enterpriseId)) {
      filter.where['enterpriseId'] = req.params.enterpriseId;
    }
    await models.Message.destroy(filter, { transaction: t });
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
