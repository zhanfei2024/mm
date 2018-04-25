// core
const debug = require('debug')('APP:ADMIN_COC_ANNOUNCEMENT');

// model

// library
const adminCocAnnouncementRoute = require('../../routes/mm/announcement');


/**
 * @api {get} /admin/announcements 查询所有公告
 * @apiName index
 * @apiGroup admin cocAnnouncement
 *
 * @apiParam {string} [cocName] 商会名称
 * @apiParam {string} [title] 公告标题
 *
 * @apiSuccess {number} enterpriseId 企业id
 * @apiSuccess {number} cocId 活动id
 * @apiSuccess {number} id 公告id
 * @apiSuccess {string} content 内容
 * @apiSuccess {date_iso8601} publishAt 发布日期
 * @apiSuccess {boolean} isActive 是否有效
 *
 * @apiSuccess {number} coc.id 商会id
 * @apiSuccess {string} coc.name 商会名称
 * @apiSuccess {string} logoUrl 商会logo
 */
function index(req, res, next) {
  debug('ENTER index method!');

  return adminCocAnnouncementRoute.index(req, res, next);
}

/**
 * @api {get} /admin/announcements/:announcementId([0-9]+) 公告详情
 * @apiName show
 * @apiGroup admin cocAnnouncement
 *
 * @apiParam {number} cocId 商会id
 *
 * @apiSuccess {number} enterpriseId 企业id
 * @apiSuccess {number} cocId 活动id
 * @apiSuccess {number} id 公告id
 * @apiSuccess {string} content 内容
 * @apiSuccess {date_iso8601} publishAt 发布日期
 * @apiSuccess {boolean} isActive 是否有效
 * @apiSuccess {number} coc.id 商会id
 * @apiSuccess {string} coc.name 商会名称
 * @apiSuccess {string} logoUrl 商会logo
 */
function show(req, res, next) {
  debug('ENTER show method!');

  req.params.cocId = req.query.cocId;

  return adminCocAnnouncementRoute.show(req, res, next);
}


function destroy(req, res, next) {
  debug('ENTER destroy method!');

  return adminCocAnnouncementRoute.destroy(req, res, next);
}

module.exports = {
  index,
  show,
  destroy
};
