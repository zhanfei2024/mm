// core
const debug = require('debug')('APP:ADMIN_ADMIN');

// model

// library
const adminRoute = require('../../routes/admin');


/**
 * @api {get} /admin/admins 管理员列表
 * @apiName index
 * @apiGroup admin admin
 *
 * @apiSuccess {number} id 活动id
 * @apiSuccess {string} email 邮箱
 * @apiSuccess {boolean} active 生效
 * @apiSuccess {string} gender 性别
 * @apiSuccess {string} phone 联系电话
 *
 */
function index(req, res, next) {
  debug('ENTER index method!');

  req.query.role = 'admin';

  return adminRoute.index(req, res, next);
}


/**
 * @api {get} /admin/admins/self 详情
 * @apiName show
 * @apiGroup admin admin
 *
 * @apiSuccess {number} id 管理员id
 * @apiSuccess {string} email 邮箱
 * @apiSuccess {boolean} active 是否生效
 * @apiSuccess {string="M", "F"} gender 性别
 * @apiSuccess {string} phone 联系电话
 * @apiSuccess {date_iso8601} birth 出生日期
 */
function show(req, res, next) {
  debug('ENTER show method!');
  req.params.adminId = res.locals.adminAuth.id;
  return adminRoute.show(req, res, next);
}


/**
 * @api {post} /admin/admins 添加管理员用户
 * @apiName create
 * @apiGroup admin admin
 *
 * @apiParam {string} passwoord 密码
 * @apiParam {string} email 邮箱
 * @apiParam {string} [lastName] 名字
 * @apiParam {string} [firstName] 姓氏
 * @apiParam {string} [phone] 手机号
 * @apiParam {string="M", "F"} [gender="M"] 性别
 * @apiParam {date_iso8601} [birth] 出生日期
 * @apiParam {boolean} [active=true] 是否有效
 *
 * @apiSuccess {number} id 管理员id
 * @apiSuccess {string} email 邮箱
 * @apiSuccess {boolean} active 是否生效
 * @apiSuccess {string="M", "F"} gender 性别
 * @apiSuccess {string} phone 联系电话
 * @apiSuccess {date_iso8601} birth 出生日期
 */
function create(req, res, next) {
  debug('ENTER create method!');
  return adminRoute.create(req, res, next);
}

/**
 * @api {put} /admin/admins/:adminId([0-9]+) 资料修改
 * @apiName update
 * @apiGroup admin admin
 *
 * @apiParam {boolean} [active] 生效
 * @apiParam {string="M", "F"} [gender] 性别
 * @apiParam {string} [phone] 联系电话
 *
 * @apiSuccess {number} id 管理员id
 * @apiSuccess {string} email 邮箱
 * @apiSuccess {boolean} active 是否生效
 * @apiSuccess {string="M", "F"} gender 性别
 * @apiSuccess {string} phone 联系电话
 * @apiSuccess {date_iso8601} birth 出生日期
 */
function update(req, res, next) {
  debug('ENTER update method!');
  return adminRoute.update(req, res, next);
}

/**
 * @api {delete} /admin/admins/:adminId([0-9]+) 删除
 * @apiName destroy
 * @apiGroup admin admin
 *
 * @apiSuccess {boolean} status 状态
 */
function destroy(req, res, next) {
  debug('ENTER destroy method!');
  return adminRoute.destroy(req, res, next);
}

module.exports = {
  index,
  show,
  create,
  update,
  destroy
};
