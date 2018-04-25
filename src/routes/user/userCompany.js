// core
const debug = require('debug')('APP:USER_PROFILE');

// library
const userCompanyRoute = require('../mm/userCompany');
/**
 *  @api {get} user/users/user-company    显示用户所有的公司
 *  @apiName  index
 *  @apiGroup user company
 *
 *
 *  @apiSuccess {number} userId   用户id号
 *  @apiSuccess {string{..255}} companyName     公司名
 *  @apiSuccess {string{..255}} legalPersonName    法人
 *  @apiSuccess {string} businessNo    编号
 *  @apiSuccess {string{..255}} mobile     电话
 *  @apiSuccess {string{..255}} address    地址
 *  @apiSuccess {string{..255}} scopeOfOperation     经营范围
 *  @apiSuccess {boolean}  isActivity 有效
 *
 */
function index(req, res, next) {
  debug('ENTER show method!');

  req.query.userId = res.locals.userAuth.id;

  return userCompanyRoute.index(req, res, next);
}

/**
 *  @api {get} user/users/user-company/:userCompanyId([0-9]+)    展现一条公司的数据
 *  @apiName  show
 *  @apiGroup user company
 *
 *  @apiParam {number} userCompanyId  用户公司的id号
 *
 *
 *  @apiSuccess {number} userId   用户id号
 *  @apiSuccess {string{..255}} companyName     公司名
 *  @apiSuccess {string{..255}} legalPersonName    法人
 *  @apiSuccess {string} businessNo    编号
 *  @apiSuccess {string{..255}} mobile     电话
 *  @apiSuccess {string{..255}} address    地址
 *  @apiSuccess {string{..255}} scopeOfOperation     经营范围
 *  @apiSuccess {boolean}  isActivity 有效
 *
 */
function show(req, res, next) {
  debug('ENTER show method!');

  req.query.userCompanyId = req.params.userCompanyId;
  req.query.userId = res.locals.userAuth.id;

  return userCompanyRoute.show(req, res, next);
}

/**
 *  @api {post} user/users/user-company   用户添加一条公司信息
 *  @apiName  create
 *  @apiGroup user company
 *
 *  @apiParam {number} userId   用户id号
 *  @apiParam {string{..255}} companyName     公司名
 *  @apiParam {string{..255}} legalPersonName    法人
 *  @apiParam {string} businessNo    编号
 *  @apiParam {string{..255}} mobile     电话
 *  @apiParam {string{..255}} address    地址
 *  @apiParam {string{..255}} scopeOfOperation     经营范围
 *  @apiParam {boolean}  isActivity 有效
 *
 *  @apiSuccess {number} userId   用户id号
 *  @apiSuccess {string{..255}} companyName     公司名
 *  @apiSuccess {string{..255}} legalPersonName    法人
 *  @apiSuccess {string} businessNo    编号
 *  @apiSuccess {string{..255}} mobile     电话
 *  @apiSuccess {string{..255}} address    地址
 *  @apiSuccess {string{..255}} scopeOfOperation     经营范围
 *  @apiSuccess {boolean}  isActivity 有效
 *
 */
function create(req, res, next) {
  debug('ENTER show method!');

  req.body.userId = res.locals.userAuth.id;
  req.body.isActive = true;
  return userCompanyRoute.create(req, res, next);
}


/**
 *  @api {put} user/users/user-company/:userCompanyId([0-9]+)   修改某一公司的信息
 *  @apiName  update
 *  @apiGroup user company
 *
 *  @apiParam {number} userId   用户id号
 *  @apiParam {string{..255}} companyName     公司名
 *  @apiParam {string{..255}} legalPersonName    法人
 *  @apiParam {string} businessNo    编号
 *  @apiParam {string{..255}} mobile     电话
 *  @apiParam {string{..255}} address    地址
 *  @apiParam {string{..255}} scopeOfOperation     经营范围
 *  @apiParam {boolean}  isActivity 有效
 *
 *  @apiSuccess {number} userId   用户id号
 *  @apiSuccess {string{..255}} companyName     公司名
 *  @apiSuccess {string{..255}} legalPersonName    法人
 *  @apiSuccess {string} businessNo    编号
 *  @apiSuccess {string{..255}} mobile     电话
 *  @apiSuccess {string{..255}} address    地址
 *  @apiSuccess {string{..255}} scopeOfOperation     经营范围
 *  @apiSuccess {boolean}  isActivity 有效
 *
 */
function update(req, res, next) {
  debug('ENTER show method!');

  req.body.userId = res.locals.userAuth.id;
  req.body.userCompanyId = req.params.userCompanyId;

  return userCompanyRoute.update(req, res, next);
}

/**
 *  @api {delete} user/users/user-company/:userCompanyId([0-9]+)   用户删除一条公司的信息
 *  @apiName  destroy
 *  @apiGroup user company
 *
 *  @apiParam {number} userCompanyId  用户公司的id号
 *
 *  @apiSuccess {boolean} status 是否删除成功
 *
 */
function destroy(req, res, next) {
  debug('ENTER show method!');

  req.params.userId = res.locals.userAuth.id;

  return userCompanyRoute.destroy(req, res, next);
}

module.exports = {
  index,
  show,
  create,
  update,
  destroy
};
