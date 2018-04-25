// core
const debug = require('debug')('APP:ACTIVITY_CANDIDATE');

// library
const candidateRoute = require('../../routes/mm/activityCandidate');
const _  = require('lodash');

/**
 * @api {get} /enterprise/enterprises/cocs/:cocId([0-9]+)/activities/:activityId([0-9]+)/candidates 查询所有活动记录
 * @apiName index
 * @apiGroup enterprise activity candidate
 *
 * @apiParam {number} enterpriseId 企业id
 * @apiParam {number} cocId 商会id
 * @apiParam {number} activityId  活动id
 *
 * @apiSuccess {number} enterpriseId 企业id
 * @apiSuccess {number} activityId 活动id
 * @apiSuccess {number} userId 用户id
 * @apiSuccess {string} contact 描述
 * @apiSuccess {string} email 邮箱
 * @apiSuccess {string} phone 电话
 * @apiSuccess {number} numberOfPeople 参加人数
 * @apiParam {string="pending", "success", "fail"} status 审核状态
 * @apiSuccess {number} paymentBalance 金额
 *
 * @apiSuccess {number} coc.id 商会id
 * @apiSuccess {string} coc.name 商会名称
 * @apiSuccess {string} logoUrl 商会logo
 *
 * @apiSuccess {number} activityId 活动id
 * @apiSuccess {string} activity.title 活动标题
 *
 * @apiSuccess {number} user.id 用户id
 * @apiSuccess {string} user.firstName 用户姓氏
 * @apiSuccess {string} user.lastName 名字
 *
 * @apiSuccess {string} url 活动附件
 *
 */
function index(req, res, next) {
  debug('ENTER index method!');

  req.query.enterpriseId = res.locals.enterpriseAuth.id;
  req.query.cocId = req.params.cocId;

  return candidateRoute.index(req, res, next);
}


/**
 * @api {get}  /enterprise/enterprises/cocs/:cocId([0-9]+)/activities/:activityId([0-9]+)/candidates/:candidateId([0-9]+) 查询一条活动记录
 * @apiName show
 * @apiGroup enterprise activity candidate
 *
 * @apiParam {number} cocId 商会id
 * @apiParam {number} candidateId  申请id
 *
 * @apiSuccess {number} enterpriseId 企业id
 * @apiSuccess {number} activityId 活动id
 * @apiSuccess {number} userId 用户id
 * @apiSuccess {string} contact 描述
 * @apiSuccess {string} email 邮箱
 * @apiSuccess {string} phone 电话
 * @apiSuccess {number} numberOfPeople 参加人数
 * @apiSuccess {string="pending", "success", "fail"} status 审核状态
 * @apiSuccess {number} paymentBalance 金额
 *
 * @apiSuccess {number} coc.id 商会id
 * @apiSuccess {string} coc.name 商会名称
 * @apiSuccess {string} logoUrl 商会logo
 *
 * @apiSuccess {number} activityId 活动id
 * @apiSuccess {string} activity.title 活动标题
 *
 * @apiSuccess {number} user.id 用户id
 * @apiSuccess {string} user.firstName 用户姓氏
 * @apiSuccess {string} user.lastName 名字
 *
 * @apiSuccess {string} url 活动附件
 *
 */
function show(req, res, next) {
  debug('ENTER show method!');

  req.params.enterpriseId = res.locals.enterpriseAuth.id;
  return candidateRoute.show(req, res, next);
}


/**
 * @api {put}  /enterprise/enterprises/cocs/:cocId([0-9]+)/activities/:activityId([0-9]+)/candidates/:candidateId([0-9]+) 更新
 * @apiName update
 * @apiGroup enterprise activity candidate
 *
 * @apiParam {number} cocId 商会id
 * @apiParam {number} candidateId  申请id
 * @apiParam {string="pending", "success", "fail"} status 审核状态
 * @apiParam {number} userId 用户id
 * @apiParam {string} description 失败原由描述
 *
 * @apiSuccess {number} enterpriseId 企业id
 * @apiSuccess {number} activityId 活动id
 * @apiSuccess {number} userId 用户id
 * @apiSuccess {string} contact 描述
 * @apiSuccess {string} email 邮箱
 * @apiSuccess {string} phone 电话
 * @apiSuccess {number} numberOfPeople 参加人数
 * @apiSuccess {string="pending", "success", "fail"} status 审核状态
 * @apiSuccess {number} paymentBalance 金额
 *
 * @apiSuccess {number} coc.id 商会id
 * @apiSuccess {string} coc.name 商会名称
 * @apiSuccess {string} logoUrl 商会logo
 *
 * @apiSuccess {number} activityId 活动id
 * @apiSuccess {string} activity.title 活动标题
 *
 * @apiSuccess {number} user.id 用户id
 * @apiSuccess {string} user.firstName 用户姓氏
 * @apiSuccess {string} user.lastName 名字
 *
 * @apiSuccess {string} url 活动附件
 *
 */
function update(req, res, next) {
  debug('ENTER update method!');
  req.body.enterpriseId = res.locals.enterpriseAuth.id;
  req.body.cocId = req.params.cocId;
  return candidateRoute.update(req, res, next);
}

/**
 * @api {delete}  /enterprise/enterprises/cocs/:cocId([0-9]+)/activities/:activityId([0-9]+)/candidates/:candidateId([0-9]+) 查询一条活动记录
 * @apiName destroy
 * @apiGroup enterprise activity candidate
 *
 * @apiParam {number} candidateId 申请的id
 *
 * @apiSuccess {boolean} status 成功与否的标志
 *
 */
function destroy(req, res, next) {
  debug('ENTER destroy method!');
  req.params.enterpriseId = res.locals.enterpriseAuth.id;
  return candidateRoute.destroy(req, res, next);
}

/**
 * @api {get} /enterprise/enterprises/cocs/:cocId([0-9]+)/activities/candidates/exports 导出活动申请表数据
 * @apiName exports
 * @apiGroup enterprise activity
 */
function exports(req, res, next) {
  debug('ENTER exports method!');

  return candidateRoute.exports(req, res, next);
}

module.exports = {
  index,
  show,
  update,
  destroy,
  exports
};
