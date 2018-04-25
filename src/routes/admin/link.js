// core
const debug = require('debug')('APP:ADMIN_LINK');

// library
const adminLinkRoute = require('../../routes/mm/link');

/**
 * @api {get} /admin/links 获取所有友情链接
 * @apiName index
 * @apiGroup admin links
 * 
 * @apiSuccess {number} id 友情链接id
 * @apiSuccess {string{..255}} title 友情链接标题
 * @apiSuccess {string{..255}} contacts 联系人
 * @apiSuccess {string{..255}} phone 联系电话
 * @apiSuccess {string{..255}} linkUrl 点击友情链接跳转的url
 * @apiSuccess {string{..255}} logo 友情链接logo的文件名
 * @apiSuccess {boolean} isActive 友情链接是否有效
 * @apiSuccess {number} order 友情链接的序号
 * @apiSuccess {date_iso8601} createdAt 数据的创建时间
 * @apiSuccess {date_iso8601} updatedAt 数据的修改时间
 * @apiSuccess {string{..255}} url logo图片完整url
 */
function index(req, res, next) {
  debug('ENTER index method!');

  return adminLinkRoute.index(req, res, next);
}

/**
 * @api {get} /admin/links/:linkId([0-9]+) 获取一个友情链接的信息
 * @apiName show
 * @apiGroup admin links
 * 
 * @apiParam {number} linkId 友情链接表的id
 * 
 * @apiSuccess {number} id 友情链接id
 * @apiSuccess {string{..255}} title 友情链接标题
 * @apiSuccess {string{..255}} contacts 联系人
 * @apiSuccess {string{..255}} phone 联系电话
 * @apiSuccess {string{..255}} linkUrl 点击友情链接跳转的url
 * @apiSuccess {boolean} isActive 友情链接是否有效
 * @apiSuccess {number} order 友情链接的序号
 * @apiSuccess {date_iso8601} createdAt 数据的创建时间
 * @apiSuccess {date_iso8601} updatedAt 数据的修改时间
 * @apiSuccess {string{..255}} url logo图片完整url
 */
function show(req, res, next) {
  debug('ENTER show method!');

  return adminLinkRoute.show(req, res, next);
}

/**
 * @api {post} /admin/links 管理员添加一个友情链接
 * @apiName create
 * @apiGroup admin links
 * 
 * @apiParam {string{..255}} title 友情链接标题
 * @apiParam {string{..255}} contacts 联系人
 * @apiParam {string{..255}} phone 联系电话
 * @apiParam {string{..255}} linkUrl 点击友情链接跳转的url
 * @apiParam {file} [file] 友情链接logo的图片
 * @apiParam {boolean} [isActive] 友情链接是否有效
 * @apiParam {number} [order] 友情链接的排序序号
 * 
 * @apiSuccess {number} id 友情链接id
 * @apiSuccess {string{..255}} title 友情链接标题
 * @apiSuccess {string{..255}} contacts 联系人
 * @apiSuccess {string{..255}} phone 联系电话
 * @apiSuccess {string{..255}} linkUrl 点击友情链接跳转的url
 * @apiSuccess {boolean} isActive 友情链接是否有效
 * @apiSuccess {number} order 友情链接的序号
 * @apiSuccess {date_iso8601} createdAt 数据的创建时间
 * @apiSuccess {date_iso8601} updatedAt 数据的修改时间
 * @apiSuccess {string{..255}} url logo图片完整url
 */
function create(req, res, next) {
  debug('ENTER create method!');

  if (req.files && req.files.file) {
    req.body.file = req.files.file;
  }

  return adminLinkRoute.create(req, res, next);
}

/**
 * @api {put} /admin/links/:linkId([0-9]+) 管理员修改一个友情链接
 * @apiName update
 * @apiGroup admin links
 * 
 * @apiParam {string{..255}} [title] 友情链接标题
 * @apiParam {string{..255}} [contacts] 联系人
 * @apiParam {string{..255}} [phone] 联系电话
 * @apiParam {string{..255}} [linkUrl] 点击友情链接跳转的url
 * @apiParam {file} [file] 友情链接logo的文件名
 * @apiParam {boolean} [isActive] 友情链接是否有效
 * @apiParam {number} [order] 友情链接的排序序号
 * @apiParam {date_iso8601} [createdAt] 数据创建时间
 * @apiParam {date_iso8601} [updatedAt] 数据修改时间
 * 
 * @apiSuccess {number} id 友情链接id
 * @apiSuccess {string{..255}} title 友情链接标题
 * @apiSuccess {string{..255}} linkUrl 点击友情链接跳转的url
 * @apiSuccess {boolean} isActive 友情链接是否有效
 * @apiSuccess {number} order 友情链接的序号
 * @apiSuccess {date_iso8601} createdAt 数据的创建时间
 * @apiSuccess {date_iso8601} updatedAt 数据的修改时间
 * @apiSuccess {string{..255}} url logo图片完整url
 */
function update(req, res, next) {
  debug('ENTER update method!');

  if (req.files && req.files.file) {
    req.body.file = req.files.file;
  }

  return adminLinkRoute.update(req, res, next);
}

/**
 * @api {delete} /admin/links/:linkId([0-9]+) 删除友情链接
 * @apiName destroy
 * @apiGroup admin links
 * 
 * @apiParam {number} linkId 友情链接表的id
 * 
 * @apiSuccess {boolean} status 是否删除成功
 */
function destroy(req, res, next) {
  debug('ENTER destroy method!');

  return adminLinkRoute.destroy(req, res, next);
}

/**
 * @api {post} /admin/links/:linkId([0-9]+)/upload-logo 友情链接上传logo
 * @apiName uploadLogo
 * @apiGroup admin links
 * 
 * @apiParam {file} file 友情链接的logo
 * 
 * @apiSuccess {number} id 友情链接id
 * @apiSuccess {string{..255}} title 友情链接标题
 * @apiSuccess {string{..255}} linkUrl 点击友情链接跳转的url
 * @apiSuccess {boolean} isActive 友情链接是否有效
 * @apiSuccess {number} order 友情链接的序号
 * @apiSuccess {date_iso8601} createdAt 数据的创建时间
 * @apiSuccess {date_iso8601} updatedAt 数据的修改时间
 * @apiSuccess {string{..255}} url logo图片完整url
 */
function uploadLogo(req, res, next) {
  debug('ENTER upload logo method!');

  if (req.files && req.files.file) {
    req.body.file = req.files.file;
  }

  return adminLinkRoute.uploadLogo(req, res, next);
}

module.exports = {
  index,
  show,
  create,
  update,
  destroy,
  uploadLogo
};