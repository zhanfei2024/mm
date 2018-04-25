// core
const debug = require('debug')('APP:USER_MESSAGE');

// library
const userMessageRoute = require('../../routes/mm/message');

/**
 * @api {get} /user/users/message/ 留言列表
 * @apiName index
 * @apiGroup user message
 * 
 * @apiParam {string} [search] 搜索字符串
 * @apiParam {number} [cocId] 商会id
 * @apiParam {number} [enterpriseId] 商号id
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

  req.query.userId = res.locals.userAuth.id;

  return userMessageRoute.index(req, res, next);
}

/**
 * @api {get} /user/users/message/:messageId([0-9]+) 留言详情
 * @apiName show
 * @apiGroup user message
 * 
 * @apiParam {number} messageId 留言id
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
function show(req, res, next) {
  debug('ENTER show method!');

  req.params.userId = res.locals.userAuth.id;

  return userMessageRoute.show(req, res, next);
}

/**
 * @api {post} /user/users/message 添加留言
 * @apiName create
 * @apiGroup user message
 * 
 * @apiParam {number} cocId 商会id
 * @apiParam {number} enterpriseId 商号id
 * @apiParam {string} title 留言标题
 * @apiParam {string} leavingMessage 留言信息
 * 
 * @apiSuccess {number} id 留言id
 * @apiSuccess {number} cocId 商会id
 * @apiSuccess {number} enterpriseId 商号id
 * @apiSuccess {string} title 留言标题
 * @apiSuccess {string} contacts 联系方式
 * @apiSuccess {string} phone 联系电话
 * @apiSuccess {string} email 联系邮件
 * @apiSuccess {string} leavingMessage 留言信息
 * @apiSuccess {date_iso8601} leavingMessagedAt 留言时间
 */
function create(req, res, next) {
  debug('ENTER create method!');

  req.body.userId = res.locals.userAuth.id;

  return userMessageRoute.create(req, res, next);
}

/**
 * @api {delete} /user/users/message/:messageId([0-9]+) 删除留言
 * @apiName destroy
 * @apiGroup user message
 * 
 * @apiParam {number} messageId 留言id
 * 
 * @apiSuccess {boolean} status 是否删除成功
 */
function destroy(req, res, next) {
  debug('ENTER destroy method!');

  req.params.userId = res.locals.userAuth.id;

  return userMessageRoute.destroy(req, res, next);
}

module.exports = {
  index,
  show,
  create,
  destroy
};
