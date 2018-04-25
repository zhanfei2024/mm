// core
const debug = require('debug')('APP:ADMIN_ENTERPRISE');

// model

// library
const enterpriseRoute = require('../enterprise');

//TODO:根据管理员的界面原型完善(2017-12-12 10:02:25 先等原型)
/**
 * @api {get} /admin/enterprises 商号列表
 * @apiName index
 * @apiGroup admin enterprise
 * 
 * @apiSuccess {number} id 商号id
 * @apiSuccess {string} lastName 名字
 * @apiSuccess {string} firstName 姓氏
 * @apiSuccess {string} email 电子邮件
 * @apiSuccess {boolean} isActive 账号是否有效
 * @apiSuccess {string} emailToken 令牌
 * @apiSuccess {number} languageId 语言
 * @apiSuccess {number} countryId 国家
 * @apiSuccess {string} IDFrontUrl 证件照证明图片
 * @apiSuccess {string} IDBackUrl 证件照反面图片
 * @apiSuccess {string} phone 手机号
 * @apiSuccess {number} credit 信用卡
 * @apiSuccess {string} remark 标注
 */
function index(req, res, next) {
  debug('ENTER enterprise index method!');

  return enterpriseRoute.index(req, res, next);
}

/**
 * @api {get} /admin/enterprises/:enterpriseId([0-9]+) 商号详情
 * @apiName show
 * @apiGroup admin enterprise
 * 
 * @apiParam {number} enterpriseId 商号id
 * 
 * @apiSuccess {number} id 商号id
 * @apiSuccess {string} lastName 名字
 * @apiSuccess {string} firstName 姓氏
 * @apiSuccess {string} email 电子邮件
 * @apiSuccess {boolean} isActive 账号是否有效
 * @apiSuccess {string} emailToken 令牌
 * @apiSuccess {number} languageId 语言
 * @apiSuccess {number} countryId 国家
 * @apiSuccess {string} IDFrontUrl 证件照证明图片
 * @apiSuccess {string} IDBackUrl 证件照反面图片
 * @apiSuccess {string} phone 手机号
 * @apiSuccess {number} credit 信用卡
 * @apiSuccess {string} remark 标注
 */
function show(req, res, next) {
  debug('ENTER enterprise show method!');

  return enterpriseRoute.show(req, res, next);
}

/**
 * @api {put} /admin/enterprises/:enterpriseId([0-9]+) 修改商号
 * @apiName update
 * @apiGroup admin enterprise
 * 
 * @apiParam {boolean} [isActive] 账号是否有效
 * 
 * @apiSuccess {number} id 商号id
 * @apiSuccess {string} lastName 名字
 * @apiSuccess {string} firstName 姓氏
 * @apiSuccess {string} email 电子邮件
 * @apiSuccess {boolean} isActive 账号是否有效
 * @apiSuccess {string} emailToken 令牌
 * @apiSuccess {number} languageId 语言
 * @apiSuccess {number} countryId 国家
 * @apiSuccess {string} IDFrontUrl 证件照证明图片
 * @apiSuccess {string} IDBackUrl 证件照反面图片
 * @apiSuccess {string} phone 手机号
 * @apiSuccess {number} credit 信用卡
 * @apiSuccess {string} remark 标注
 */
function update(req, res, next) {
  debug('ENTER enterprise update method!');

  return enterpriseRoute.update(req, res, next);
}

module.exports = {
  index,
  show,
  update
};
