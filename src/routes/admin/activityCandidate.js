// core
const debug = require('debug')('APP:ADMIN_ACTIVITY_CANDIDATE');

// library
const candidateRoute = require('../../routes/mm/activityCandidate');
const _  = require('lodash');

/**
 * @api {get} /admin/activity-candidates 查询所有活动申请
 * @apiName index
 * @apiGroup admin activityCandidate
 *
 * @apiParam {string="pending", "success", "fail"} status 审核状态
 * @apiParam {string="sign-up", "close", "in-process", "ended", "full"} [activityStatus] 活动状态
 * @apiParam {string} [search] 活动名称
 * @apiParam {string} [account] 用户账号
 *
 * @apiSuccess {number} enterpriseId 企业id
 * @apiSuccess {number} activityId 活动id
 * @apiSuccess {number} userId 用户id
 * @apiSuccess {string} contact 描述
 * @apiSuccess {string} email 邮箱
 * @apiSuccess {string} phone 电话
 * @apiSuccess {number} numberOfPeople 参加人数
 * @apiSuccess {string=pending,success,fail} status 申请状态
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

  return candidateRoute.index(req, res, next);
}

function destroy(req, res, next) {
  debug('ENTER destroy method!');

  return candidateRoute.destroy(req, res, next);
}

module.exports = {
  index,
  destroy

};
