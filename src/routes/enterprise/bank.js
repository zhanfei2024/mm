// lib
const debug = require('debug')("APP:Eterprise_Bank");

const enterpriseBankRoute = require('../mm/bank');



/**
 * @api {get} /enterprise/enterprises/cocs/:cocId([0-9]+)/bank 列出所有银行信息
 * @apiName index
 * @apiGroup enterprise bank
 *
 * @apiParam {number} cocId 商会id
 * @apiParam {boolean} isActive 是否有效
 *
 * @apiSuccess {nunber} bankId bank id
 * @apiSuccess {number} enterpriseId 企业id号
 * @apiSuccess {number} cocId 商会id号
 * @apiSuccess {string} cardNumber 卡号
 * @apiSuccess {string} bankName 银行名称
 * @apiSuccess {string} accountHolder 持卡人
 * @apiSuccess {string} depositBank 具体银行
 * @apiSuccess {number} order 排序
 */

async function index(req, res, next) {
  debug("Enter index method! ");
  req.query.cocId = req.params.cocId;

  return enterpriseBankRoute.index(req, res, next);
}

/**
 * @api {get} /enterprise/enterprises/cocs/:cocId([0-9]+)/bank/:bankId([0-9]+) 列出一条银行信息
 * @apiName show
 * @apiGroup enterprise bank
 *
 * @apiParam {number} cocId 商会id
 * @apiParam {number} bankId 银行id号
 * @apiParam {boolean} isActive 是否有效
 *
 * @apiSuccess {nunber} bankId bank id
 * @apiSuccess {number} enterpriseId 企业id号
 * @apiSuccess {number} cocId 商会id号
 * @apiSuccess {string} cardNumber 卡号
 * @apiSuccess {string} bankName 银行名称
 * @apiSuccess {string} accountHolder 持卡人
 * @apiSuccess {string} depositBank 具体银行
 * @apiSuccess {number} order 排序
 */
async function show(req, res, next) {
  debug("Enter show method!");
  req.params.enterpriseId = res.locals.enterpriseAuth.id;

  return enterpriseBankRoute.show(req, res, next);
}

/**
 * @api {post} /enterprise/enterprises/cocs/:cocId([0-9]+)/bank 添加
 * @apiName create
 * @apiGroup enterprise bank
 *
 * @apiParam {string} cardNumber 卡号
 * @apiParam {string} bankName 银行名称
 * @apiParam {string} accountHolder 持卡人
 * @apiParam {string} depositBank 具体银行
 * @apiParam {number} order 排序
 *
 * @apiSuccess {nunber} bankId bank id
 * @apiSuccess {number} enterpriseId 企业id号
 * @apiSuccess {number} cocId 商会id号
 * @apiSuccess {string} cardNumber 卡号
 * @apiSuccess {string} bankName 银行名称
 * @apiSuccess {string} accountHolder 持卡人
 * @apiSuccess {string} depositBank 具体银行
 * @apiSuccess {number} order 排序
 */
async function create(req, res, next) {
  debug("Enter create method!");
  req.body.enterpriseId = res.locals.enterpriseAuth.id;
  req.body.cocId = req.params.cocId;
  return enterpriseBankRoute.create(req, res, next);
}


/**
 * @api {put} /enterprise/enterprises/cocs/:cocId([0-9]+)/bank/:bankId([0-9]+) 修改
 * @apiName update
 * @apiGroup enterprise bank
 *
 * @apiParam {string} [cardNumber] 卡号
 * @apiParam {string} [bankName] 银行名称
 * @apiParam {string} [accountHolder] 持卡人
 * @apiParam {string} [depositBank] 具体银行
 * @apiParam {number} [order] 排序
 *
 * @apiSuccess {nunber} bankId bank id
 * @apiSuccess {number} enterpriseId 企业id号
 * @apiSuccess {number} cocId 商会id号
 * @apiSuccess {string} cardNumber 卡号
 * @apiSuccess {string} bankName 银行名称
 * @apiSuccess {string} accountHolder 持卡人
 * @apiSuccess {string} depositBank 具体银行
 * @apiSuccess {number} order 排序
 */
async function update(req, res, next) {
  debug("Enter update method!");
  req.body.enterpriseId = res.locals.enterpriseAuth.id;

  return enterpriseBankRoute.update(req, res, next);
}


/**
 * @api {delete} /enterprise/enterprises/cocs/:cocId([0-9]+)/bank/:bankId([0-9]+) 删除
 * @apiName destroy
 * @apiGroup enterprise bank
 *
 * @apiSuccess {boolean} status 状态
 *
 */
async function destroy(req, res, next) {
  debug("Enter destroy method!");
  req.params.enterpriseId = res.locals.enterpriseAuth.id;

  return enterpriseBankRoute.destroy(req, res, next);
}

module.exports = {
  index,
  show,
  create,
  update,
  destroy
};
