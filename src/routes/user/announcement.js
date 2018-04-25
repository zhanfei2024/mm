const announcementRoute = require('../mm/announcement');
const debug = require('debug')("APP:USER_ANNOUNCEMENT");

/**
 * @api {get} /public/cocs/:cocId([0-9]+)/announcements/:announcementId([0-9]+) 通知公告详情
 * @apiName show
 * @apiGroup public announcement
 *
 * @apiParam {number} cocId 商会id
 * @apiParam {number} announcementId 通知公告id
 *
 * @apiSuccess {number} id 通知公告id
 * @apiSuccess {number} enterpriseId 商号id
 * @apiSuccess {number} cocId 商号id
 * @apiSuccess {string} title 通知公告标题
 * @apiSuccess {string} content 通知公告内容
 * @apiSuccess {date_iso8601} publishAt 发布时间
 * @apiSuccess {boolean} isActive 是否有效
 * @apiSuccess {object} coc 商会信息
 * @apiSuccess {number} coc.id 商会id
 * @apiSuccess {string} coc.name 商会名称
 */
function show(req, res, next) {
  debug('ENTER show method!');

  req.params.userId = res.locals.userAuth.id;

  return announcementRoute.show(req, res, next);
}

function index(req, res, next) {
  debug('ENTER index method!');

  req.params.userId = res.locals.userAuth.id;

  return announcementRoute.index(req, res, next);
}

module.exports = {
  show,
  index
};
