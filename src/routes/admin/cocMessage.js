// core
const debug = require('debug')('APP:ADMIN_COC_MESSAGE');

// library
const adminCocMessageRoute = require('../../routes/mm/message');

/**
 * @api {get} /admin/messages 获取留言列表
 * @apiName index
 * @apiGroup admin cocMessage
 *
 * @apiParam {string} [cocName] 按商会名称搜索留言
 *
 * @apiSuccess {number} id 留言id
 * @apiSuccess {number} cocId 商会id
 * @apiSuccess {number} enterpriseId 商号id
 * @apiSuccess {string} title 留言标题
 * @apiSuccess {string} contacts 联系方式
 * @apiSuccess {string} phone 联系电话
 * @apiSuccess {string} email 联系邮件
 * @apiSuccess {string} leavingMessage 留言信息
 * @apiSuccess {string} messageReply 回复的信息
 * @apiSuccess {date_iso8601} leavingMessagedAt 留言时间
 */
function index(req, res, next) {
  debug('ENTER index method!');

  return adminCocMessageRoute.index(req, res, next);
}

function destroy(req, res, next) {
  debug('ENTER destroy method!');

  return adminCocMessageRoute.destroy(req, res, next);
}

module.exports = {
  index,
  destroy
};
