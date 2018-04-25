// core
const debug = require('debug')('APP:ADMIN_STATISTICS');

// library
const adminStatisticsRoute = require('../mm/statistics');

/**
 * @api {get} /admin/statistics 获取用户信息
 * @apiName show
 * @apiGroup admin statistics
 * 
 * @apiParam {string} cocs     所有商会数量
 * @apiParam {string} members  所有会员数量
 * @apiParam {string} users    所有用户数量
 * @apiParam {string} msgs     所有留言数量
 * @apiParam {string} ccs      待审核申请商会数量(candidate of cocs)
 * @apiParam {string} cms      待审核申请会员数量(candidate of members )
 * @apiParam {string} cas      待审核申请活动数量(candidate of activities)
 * @apiParam {string} tacs     今日新增商会数量(today added cocs)
 * @apiParam {string} tams     今日新增会员数量(today added members)
 * @apiParam {string} yacs     昨日新增商会数量(yesterday added cocs)
 * @apiParam {string} yams     昨日新增会员数量(yesterday added members)
 * @apiParam {string} macs     本月新增商会数量(month added cocs)
 * @apiParam {string} mams     本月新增会员数量(month added members)
 * 
 * @apiSuccess {number} key 传什么返回什么
 */
function show(req, res, next) {
  debug('ENTER show method!');

  return adminStatisticsRoute.show(req, res, next);
}

module.exports = {
  show
};
