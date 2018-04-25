// core
const debug = require('debug')('APP:USER_PROFILE');

// library
const userProfileRoute = require('../mm/userProfile');

/**
 *  @api {get} /user/users/userProfile  获取用户资料
 *  @apiName  show
 *  @apiGroup user profile
 *
 *  @apiSuccess {number} id     用户资料信息id号
 *  @apiSuccess {number} countryId      用户国籍id
 *  @apiSuccess {string{..255}} name    姓名
 *  @apiSuccess {string{..255}} IDNumber    身份证号
 *  @apiSuccess {string='M', 'F'} gender 性别
 *  @apiSuccess {string{..255}} phone    电话
 *  @apiSuccess {string} description    简介
 *  @apiSuccess {string} IDType  id类型
 *  @apiSuccess {number} age  年龄
 *  @apiSuccess {string} remark    评论
 */
function show(req, res, next) {
  debug('ENTER show method!');

  req.params.userId = res.locals.userAuth.id;

  return userProfileRoute.show(req, res, next);
}

/**
 *  @api {post} /user/users/userProfile  添加个人资料
 *  @apiName  create
 *  @apiGroup user profile
 *
 *  @apiParam {number} [countryId]      用户国籍id
 *  @apiParam {string{..255}} name    中文名
 *  @apiParam {string{..255}} IDNumber    身份证号
 *  @apiParam {string='M', 'F'} gender 性别
 *  @apiParam {string{..255}} phone    电话
 *  @apiParam {string} [description]    简介
 *  @apiParam {string} IDType  id类型
 *  @apiParam {number} age  年龄
 *  @apiParam {string} [remark]    评论
 *
 *  @apiSuccess {number} id     用户资料信息id号
 *  @apiSuccess {number} countryId      用户国籍id
 *  @apiSuccess {string{..255}} name    中文名
 *  @apiSuccess {string{..255}} IDNumber    身份证号
 *  @apiSuccess {string='M', 'F'} gender 性别
 *  @apiSuccess {string{..255}} phone    电话
 *  @apiSuccess {string} description    简介
 *  @apiSuccess {string} IDType  id类型
 *  @apiSuccess {number} age  年龄
 *  @apiSuccess {string} remark    评论
 */
function create(req, res, next) {
  debug('ENTER create method!');

  req.body.userId = res.locals.userAuth.id;
  req.body.email = res.locals.userAuth.email;

  return userProfileRoute.create(req, res, next);
}

/**
 *  @api {put} /user/users/userProfile 修改个人资料
 *  @apiName  update
 *  @apiGroup user profile
 *
 *  @apiParam {number} [countryId]      用户国籍id
 *  @apiParam {string{..255}} [name]    中文名
 *  @apiParam {string{..255}} [IDNumber]    身份证号
 *  @apiParam {string='M', 'F'} [gender] 性别
 *  @apiParam {string{..255}} [phone]    电话
 *  @apiParam {string} [description]    简介
 *  @apiParam {string} [IDType]  id类型
 *  @apiParam {number} [age]  年龄
 *  @apiParam {string} [remark]    评论
 *
 *  @apiSuccess {number} id     用户资料信息id号
 *  @apiSuccess {number} countryId      用户国籍id
 *  @apiSuccess {string{..255}} name    中文名
 *  @apiSuccess {string{..255}} IDNumber    身份证号
 *  @apiSuccess {string='M', 'F'} gender 性别
 *  @apiSuccess {string{..255}} phone    电话
 *  @apiSuccess {string} description    简介
 *  @apiSuccess {string} IDType  id类型
 *  @apiSuccess {number} age  年龄
 *  @apiSuccess {string} remark    评论
 */
function update(req, res, next) {
  debug('ENTER update method!');

  req.body.userId = res.locals.userAuth.id;
  req.body.userProfileId = req.params.userProfileId;

  return userProfileRoute.update(req, res, next);
}

/**
 * @api {post} /user/users/user-profile  上传用户资料的头像
 * @apiName  avatar
 * @apiGroup user profile
 *
 * @apiSuccess {string} avatar 头像url
 */
function avatar(req, res, next){
  debug('ENTER avatar method!');

  req.params.userId = res.locals.userAuth.id;
  req.params.isAvatar = true;

  return userProfileRoute.avatar(req, res, next);
}
module.exports = {
  show,
  create,
  update,
  avatar
};
