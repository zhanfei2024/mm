const debug = require('debug')('APP:COCHISTORY');

// model
const models = require('../../models');
const modelHelper = require('../../methods/model');


// validate
const inputCheck = require('input-check');
const validateHelper = require('../../helpers/ValidateHelper');

// library
const _ = require('lodash');


/**
 *  @api {get} enterprise/enterprises/cocs/:cocId([0-9]+)/coc-histories  列出商会的历史
 *  @apiName  index
 *  @apiGroup coc history
 *
 *  @apiParam {number} cocId 商会id号
 *
 *  @apiSuccess {number} id     历史的id
 *  @apiSuccess {number} enterpriseId      公司的id
 *  @apiParam {number} cocId 商会id号
 *  @apiSuccess {date} date      日期
 *  @apiSuccess {string} content      内容
 *  @apiSuccess {boolean} isActive  有效
 *  @apiSuccess {date} createdAt      创建日期
 *  @apiSuccess {date} updatedAt      更新日期
 *
 */
async function index(req, res, next) {
  debug('Enter index method!');

  const rules = {
    cocId: 'nullable|integer|min:1|exists:Coc,id'
  };
  const input = validateHelper.pick(req.query, rules);
  try {
    await inputCheck.validate(input, rules, res.validatorMessage);
  } catch (err) {
    return res.validateError(err);
  }

  const scopes = ['includeCocs'];
  const filter = await res.paginatorHelper.initFilter2(req.query);

  if (!_.isNil(input.cocId)) {
    filter.where.cocId = input.cocId
  }

  filter.order = [['createdAt', 'DESC']];
  try {
    const result = await modelHelper.findAll('CocHistory', [], filter, scopes);

    return res.paginatorLimitPlusStyle(result, {}, filter);
  } catch (err) {
    return next(err);
  }
}

/**
 *  @api {get} enterprise/enterprises/cocs/:cocId([0-9]+)/coc-histories  列出一条历史信息
 *  @apiName  show
 *  @apiGroup coc history
 *
 *  @apiParam {number} cocId 商会id号
 *  @apiParam {number} cocHistoryId 历史的id
 *
 *  @apiSuccess {number} id     历史的id
 *  @apiSuccess {number} enterpriseId      公司的id
 *  @apiParam {number} cocId 商会id号
 *  @apiSuccess {date} date      日期
 *  @apiSuccess {string} content      内容
 *  @apiSuccess {boolean} isActive  有效
 *  @apiSuccess {date} createdAt      创建日期
 *  @apiSuccess {date} updatedAt      更新日期
 *
 */
async function show(req, res, next) {
  debug('Enter show method!');

  const filter = {
    where: {
      id: req.params.cocHistoryId,
      cocId: req.params.cocId,
    }
  };

  try {
    const scopes = ['includeCocs'];
    const result = await models.CocHistory.scope(scopes).findOne(filter);
    return res.item(result);
  } catch (err) {
    return next(err);
  }

}

/**
 *  @api {post} enterprise/enterprises/cocs/:cocId([0-9]+)/coc-histories  添加
 *  @apiName  create
 *  @apiGroup coc history
 *
 *  @apiParam {number} cocId 商会id号
 *  @apiParam {number} cocHistoryId 历史的id
 *  @apiParam {number} date 日期
 *  @apiParam {number} content 内容
 *
 *  @apiSuccess {number} id     历史的id
 *  @apiSuccess {number} enterpriseId      公司的id
 *  @apiParam {number} cocId 商会id号
 *  @apiSuccess {date} date      日期
 *  @apiSuccess {string} content      内容
 *  @apiSuccess {boolean} isActive  有效
 *  @apiSuccess {date} createdAt      创建日期
 *  @apiSuccess {date} updatedAt      更新日期
 *
 */
async function create(req, res, next) {
  debug('Enter create method!');

  const rules = {
    enterpriseId: 'required|integer|min:1',
    cocId: 'required|integer|min:1|exists:Coc,id',
    date: 'required|date_iso8601',
    content: 'required|string',
    isActive: 'nullable|boolean'
  };
  const input = validateHelper.pick(req.body, rules);
  try {
    await inputCheck.validate(input, rules, res.validatorMessage);
  } catch (err) {
    return res.validateError(err);
  }
  const t = await models.sequelize.transaction();
  try {
    const result = await models.CocHistory.create(input, {transaction: t});
    await  t.commit();
    req.params.cocHistoryId = result.id;
    req.params.cooId = result.cocId;
    return show(req, res, next);
  } catch (err) {
    await t.rollback();
    return next(err);
  }
}

/**
 *  @api {put} enterprise/enterprises/cocs/:cocId([0-9]+)/coc-histories/:cocHistoryId([0-9]+) 修改
 *  @apiName  update
 *  @apiGroup coc history
 *
 *  @apiParam {number} cocId 商会id号
 *  @apiParam {number} cocHistoryId 历史的id
 *  @apiParam {number} date 日期
 *  @apiParam {number} content 内容
 *
 *  @apiSuccess {number} id     历史的id
 *  @apiSuccess {number} enterpriseId      公司的id
 *  @apiParam {number} cocId 商会id号
 *  @apiSuccess {date} date      日期
 *  @apiSuccess {string} content      内容
 *  @apiSuccess {boolean} isActive  有效
 *  @apiSuccess {date} createdAt      创建日期
 *  @apiSuccess {date} updatedAt      更新日期
 *
 */
async function update(req, res, next) {
  debug('Enter update method!');

  const rules = {
    date: 'nullable|date',
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
    const result = await models.CocHistory.findById(req.params.cocHistoryId, {
      transaction: t
    });
    if (_.isNull(result)) throw new MainError('common', 'notFound');
    await result.updateAttributes(input, {transaction: t});
    await t.commit();

    req.params.cocHistoryId = result.id;
    return show(req, res, next);
  } catch (err) {
    await t.rollback();
    return next(err);
  }
}

/**
 *  @api {delete} enterprise/enterprises/cocs/:cocId([0-9]+)/coc-histories/:cocHistoryId([0-9]+)  删除
 *  @apiName  destroy
 *  @apiGroup coc history
 *
 *  @apiParam {number} cocHistoryId     历史Id号
 *  @apiParam {number} cocId      商会Id
 *
 *  @apiSuccess {boolean} status  状态
 */
async function destroy(req, res, next) {
  debug('Enter destroy method!');

  const t = await models.sequelize.transaction();
  try {
    const userResult = await models.CocHistory.destroy({
        where: {
          id: req.params.cocHistoryId,
          cocId: req.params.cocId
        }
      },
      {transaction: t});
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


