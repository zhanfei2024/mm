// lib
const debug = require('debug')("APP:ADMIN_COC_BANK");

const adminCocBank = require('../mm/bank');



/**
 * @api {get} /admin/banks 列出所有银行账号信息
 * @apiName index
 * @apiGroup admin cocBank
 * 
 * @apiParam {string} [search] 根据商会名称搜索
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
  
  return adminCocBank.index(req, res, next);
}

module.exports = {
  index
};
