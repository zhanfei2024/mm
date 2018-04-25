const bankrRoute = require('../mm/bank');
const _ = require('lodash');
const debug = require('debug')("APP:Public_Bank");

/**
 * @api {get} /public/cocs/:cocId([0-9]+)/bank 列出所有银行信息
 * @apiName index
 * @apiGroup  public bank
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
async function indexBanks(req, res, next) {
  debug('ENTER index method!');

  req.query.cocId = req.params.cocId;
  req.isActive = true;
  return bankrRoute.index(req, res, next);
}

/**
 * @api {get} /public/cocs/:cocId([0-9]+)/bank 一条信息
 * @apiName show
 * @apiGroup  public bank
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
async function showBank(req, res, next) {
  debug('ENTER index method!');

  return bankrRoute.show(req, res, next);
}
module.exports = {
  indexBanks,
  showBank
};
