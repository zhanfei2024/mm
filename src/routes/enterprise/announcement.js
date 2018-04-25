// core
const debug = require('debug')('APP:ENTERPRISE_COC');

// model

// library
const cocAnnouncementRoute = require('../../routes/mm/announcement');


/**
 * @api {get} /enterprise/enterprises/cocs/:cocId([0-9]+)/announcements 查询所有公告
 * @apiName index
 * @apiGroup coc announcement
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

  req.query.cocId = req.params.cocId;
  req.query.enterpriseId = res.locals.enterpriseAuth.id;

  return cocAnnouncementRoute.index(req, res, next);
}

/**
 * @api {get} /enterprise/enterprises/cocs/:cocId([0-9]+)/announcements/:announcementId([0-9]+) 公告详情
 * @apiName show
 * @apiGroup coc announcement
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

  return cocAnnouncementRoute.show(req, res, next);
}


/**
 * @api {post} /enterprise/enterprises/cocs/:cocId([0-9]+)/announcements 发布公告
 * @apiName create
 * @apiGroup coc announcement
 *
 * @apiParam {string} content 内容
 * @apiParam {date_iso8601} publishAt 发布日期
 * @apiParam {boolean} isActive 是否有效
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
 *
 *
 */
function create(req, res, next) {
  debug('ENTER create method!');

  req.body.enterpriseId = res.locals.enterpriseAuth.id;
  req.body.cocId = req.params.cocId;

  return cocAnnouncementRoute.create(req, res, next);
}


/**
 * @api {put} /enterprise/enterprises/cocs/:cocId([0-9]+)/announcements/:announcementId([0-9]+) 更新公告
 * @apiName update
 * @apiGroup enterprise coc announcement
 *
 * @apiParam {string} [content] 内容
 * @apiParam {date_iso8601} [publishAt] 发布日期
 * @apiParam {boolean} [isActive] 是否有效
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
function update(req, res, next) {
  debug('ENTER update method!');

  req.body.id = res.locals.enterpriseAuth.id;

  return cocAnnouncementRoute.update(req, res, next);
}



/**
 * @api {delete} /enterprise/enterprises/cocs/:cocId([0-9]+)/announcements/:announcementId([0-9]+) 删除
 * @apiName destroy
 * @apiGroup coc announcement
 *
 * @apiSuccess {boolean} status 是否删除成功
 */
function destroy(req, res, next) {
  debug('ENTER destroy method!');

  return cocAnnouncementRoute.destroy(req, res, next);
}

module.exports = {
  index,
  show,
  create,
  update,
  destroy
};
