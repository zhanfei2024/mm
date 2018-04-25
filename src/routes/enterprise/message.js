// core
const debug = require('debug')('APP:COC_MESSAGE');

// library
const enterpriseMessageRoute = require('../../routes/mm/message');

/**
 * @api {get} /enterprise/enterprises/cocs/:cocId([0-9]+)/message/ 留言列表
 * @apiName index
 * @apiGroup enterprise message
 * 
 * @apiParam {string} [search] 搜索字符串
 * @apiParam {number} userId 用户id
 * @apiParam {number} cocId 商会id
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

  req.query.enterpriseId = res.locals.enterpriseAuth.id;
  req.query.cocId = req.params.cocId;

  return enterpriseMessageRoute.index(req, res, next);
}

/**
 * @api {get} /enterprise/enterprises/cocs/:cocId([0-9]+)/message/:messageId([0-9+]) 留言详情
 * @apiName show
 * @apiGroup enterprise message
 * 
 * @apiParam {number} messageId 留言id
 * @apiParam {number} cocId 商会id
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

  req.params.enterpriseId = res.locals.enterpriseAuth.id;

  return enterpriseMessageRoute.show(req, res, next);
}

/**
 * @api {put} /enterprise/enterprises/cocs/:cocId([0-9]+)/message/:messageId([0-9+]) 回复留言
 * @apiName update
 * @apiGroup enterprise message
 * 
 * @apiParam {number} messageId 留言id
 * @apiParam {number} cocId 商会id
 * @apiParam {number} messageReply 回复的信息
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
function update(req, res, next) {
  debug('ENTER upload method!');

  req.body.enterpriseId = res.locals.enterpriseAuth.id;
  req.body.cocId = req.params.cocId;
  req.body.messageId = req.params.messageId;

  return enterpriseMessageRoute.update(req, res, next);
}

/**
 * @api {delete} /enterprise/enterprises/cocs/:cocId([0-9]+)/message/:messageId([0-9+]) 删除留言
 * @apiName destroy
 * @apiGroup enterprise message
 * 
 * @apiParam {number} messageId 留言id
 * @apiParam {number} cocId 商会id
 * 
 * @apiSuccess {boolean} status 是否删除成功
 */
function destroy(req, res, next) {
  debug('ENTER destroy method!');

  req.params.enterpriseId = res.locals.enterpriseAuth.id;

  return enterpriseMessageRoute.destroy(req, res, next);
}

module.exports = {
  index,
  show,
  update,
  destroy
};
