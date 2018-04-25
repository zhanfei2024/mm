// core
const debug = require('debug')('APP:ACTIVITY');

// library
const attachmentRoute = require('../../routes/mm/activityAttachment');


/**
 * @api {get} enterprises/cocs/:cocId([0-9]+)/activities/:activityId([0-9]+)/attachments 显示所有附件
 * @apiName index
 * @apiGroup enterprise activity attachments
 *
 * @apiParam {number} activityId 活动id
 * @apiParam {string} search 搜索内容
 *
 * @apiSuccess {number} activityId 活动id
 * @apiSuccess {string='file', 'cover'} type 附件类型
 * @apiSuccess {string} url 附件地址
 */
function index(req, res, next) {
  debug('ENTER index method!');

  return attachmentRoute.index(req, res, next);
}



/**
 * @api {get} enterprises/cocs/:cocId([0-9]+)/activities/:activityId([0-9]+)/attachments/:attachmentId([0-9]+) 显示附件详情
 * @apiName show
 * @apiGroup enterprise activity attachments
 *
 * @apiParam {number} attachmentId 附件id
 *
 * @apiSuccess {number} activityId 活动id
 * @apiSuccess {string='file', 'cover'} type 附件类型
 * @apiSuccess {string} url 附件地址
 */
function show(req, res, next) {
  debug('ENTER show method!');
  return attachmentRoute.show(req, res, next);
}


/**
 * @api {delete} enterprises/cocs/:cocId([0-9]+)/activities/:activityId([0-9]+)/attachments/:attachmentId([0-9]+) 删除活动附件
 * @apiName destroy
 * @apiGroup enterprise activity attachments
 *
 * @apiParam {number} attachmentId 附件id
 *
 * @apiSuccess {boolean} status 是否删除成功
 */
function destroy(req, res, next) {
  debug('ENTER destroy method!');
  req.params.enterpriseId = res.locals.enterpriseAuth.id;
  return attachmentRoute.destroy(req, res, next);
}

/**
 * @api {post} enterprises/cocs/:cocId([0-9]+)/activities/:activityId([0-9]+)/attachments/:attachmentId([0-9]+) 上传活动附件
 * @apiName uploadAttachment
 * @apiGroup enterprise activity attachments
 *
 * @apiParam {number} attachmentId 附件id
 *
 * @apiSuccess {number} activityId 活动id
 * @apiSuccess {string='file', 'cover'} type 附件类型
 * @apiSuccess {string} url 附件地址
 */
function uploadAttachment(req, res, next) {
  debug('ENTER upload method!');
  req.body.enterpriseId = res.locals.enterpriseAuth.id;
  req.body.file = req.files.file;
  return attachmentRoute.uploadAttachment(req, res, next);
}

module.exports = {
  index,
  show,
  destroy,
  uploadAttachment
};
