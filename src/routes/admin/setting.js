// core
const debug = require('debug')('APP:ADMIN_SETTING');

// library
const adminSettingRoute = require('../../routes/mm/setting');


/**
 * @api {get} /admin/setting 获取平台设置信息
 * @apiName show
 * @apiGroup admin setting
 *
 * @apiSuccess {number} id 轮播图id
 */
function show(req, res, next) {
  debug('ENTER show method!');

  return adminSettingRoute.show(req, res, next);
}

/**
 * @api {put} /admin/setting 修改平台信息
 * @apiName update
 * @apiGroup admin setting
 *
 * @apiParam {number} [slideShowId] 轮播图id
 *
 * @apiSuccess {number} id 轮播图id
 */
function update(req, res, next) {
  debug('ENTER update method!');

  if (req.files && req.files.file) {
    req.body.file = req.files.file;
  } 

  return adminSettingRoute.update(req, res, next);
}

module.exports = {
  show,
  update
};
