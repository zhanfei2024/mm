// core
const debug = require('debug')('APP:ADMIN_USER');

// library
const userRoute = require('../../routes/user');

/**
 * @api {get} /admin/users 获取用户列表
 * @apiName index
 * @apiGroup admin users
 *
 * @apiParam {string} [search] 搜索
 * @apiParam {string="one","three","six","more"} registerTime 注册时间
 *
 * @apiSuccess {number} id 用户id
 * @apiSuccess {string} firstName 用户姓氏
 * @apiSuccess {string} lastName 用户名字
 * @apiSuccess {string} email 用户的电子邮箱
 * @apiSuccess {boolean} active 用户是否有效
 * @apiSuccess {boolean} verifiedEmail 邮箱是否激活
 * @apiSuccess {string} emailToken 邮箱令牌
 * @apiSuccess {string} timezone 时区
 * @apiSuccess {string} remark 评论
 * @apiSuccess {object} language 用户使用的语言
 * @apiSuccess {number} language.id 语言id
 * @apiSuccess {string} language.name 语言名称
 * @apiSuccess {boolean} language.default 是否是默认的
 * @apiSuccess {string} language.languageCode 语言代号
 * @apiSuccess {object} country 用户注册地区
 * @apiSuccess {number} country.id 地区id
 * @apiSuccess {number} country.parentId 地区父id
 * @apiSuccess {number} country.depth 所在层级
 * @apiSuccess {string} country.code 地区简称
 * @apiSuccess {string} country.name 地区名称
 */
function index(req, res, next) {
  debug('ENTER index method!');

  return userRoute.index(req, res, next);
}

/**
 * @api {get} /admin/users/:userId([0-9]+) 获取用户信息
 * @apiName show
 * @apiGroup admin users
 *
 * @apiSuccess {number} id 用户id
 * @apiSuccess {string} firstName 用户姓氏
 * @apiSuccess {string} lastName 用户名字
 * @apiSuccess {string} email 用户的电子邮箱
 * @apiSuccess {boolean} active 用户是否有效
 * @apiSuccess {boolean} verifiedEmail 邮箱是否激活
 * @apiSuccess {string} emailToken 邮箱令牌
 * @apiSuccess {string} timezone 时区
 * @apiSuccess {string} remark 评论
 * @apiSuccess {object} language 用户使用的语言
 * @apiSuccess {number} language.id 语言id
 * @apiSuccess {string} language.name 语言名称
 * @apiSuccess {boolean} language.default 是否是默认的
 * @apiSuccess {string} language.languageCode 语言代号
 * @apiSuccess {object} country 用户注册地区
 * @apiSuccess {number} country.id 地区id
 * @apiSuccess {number} country.parentId 地区父id
 * @apiSuccess {number} country.depth 所在层级
 * @apiSuccess {string} country.code 地区简称
 * @apiSuccess {string} country.name 地区名称
 */
function show(req, res, next) {
  debug('ENTER show method!');

  req.params.includeUserProfile = true;
  req.params.includeUserExperience = true;
  req.params.includeUserCompany = true;
  req.params.includeUserEducation = true;

  return userRoute.show(req, res, next);
}

function destroy(req, res, next) {
  debug('ENTER destroy method!');

  return userRoute.destroy(req, res, next);
}


module.exports = {
  index,
  show,
  destroy
};
