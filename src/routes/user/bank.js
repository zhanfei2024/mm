
const userBankRoute = require('../mm/bank');

const debug = require('debug')("APP:User_bank");


/**
 * @api {get} /user/users/cocs/:cocId([0-9]+)/bank 列出所有银行信息
 * @apiName index
 * @apiGroup  user bank
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
async function index(req, res, next) {
  debug('ENTER index method!');

  req.query.isActive = true;
  req.query.cocId = req.params.cocId;
  return userBankRoute.index(req, res, next);
}


/**
 * @api {get} /user/users/cocs/:cocId([0-9]+)/bank/:bankId([0-9]) 一条信息
 * @apiName show
 * @apiGroup  user bank
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
  debug('ENTER show method!');

  req.params.isActive = true;
  return userBankRoute.show(req, res, next);
}

module.exports ={
  index,
  show
}


