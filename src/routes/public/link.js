// core
const debug = require('debug')('APP:PUBLIC_LINK');

// library
const adminLinkRoute = require('../../routes/mm/link');

/**
 * @api {get} /public/links 获取所有友情链接
 * @apiName index
 * @apiGroup public links
 *
 * @apiSuccess {number} id 友情链接id
 * @apiSuccess {string{..255}} title 友情链接标题
 * @apiSuccess {string{..255}} linkUrl 点击友情链接跳转的url
 * @apiSuccess {string{..255}} logo 友情链接logo的文件名
 * @apiSuccess {boolean} isActive 友情链接是否有效
 * @apiSuccess {number} order 友情链接的序号
 * @apiSuccess {date_iso8601} createdAt 数据的创建时间
 * @apiSuccess {date_iso8601} updatedAt 数据的修改时间
 * @apiSuccess {string{..255}} url logo图片完整url
 */
function indexLinks(req, res, next) {
  debug('ENTER index method!');

  req.query.isActive = true;

  return adminLinkRoute.index(req, res, next);
}

module.exports = {
  indexLinks
};
