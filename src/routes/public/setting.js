// core
const debug = require('debug')('APP:PUBLIC_SETTING');

// library
const publicSettingRoute = require('../../routes/mm/setting');

/**
 * @api {get} /public/setting 获取平台设置
 * @apiName show
 * @apiGroup public setting
 *
 * @apiSuccess {number} id id
 * @apiSuccess {string} logoUrl logo图片地址
 * @apiSuccess {object} global 配置信息
 * @apiSuccess {string} global.name 名称
 * @apiSuccess {string} global.title 标题
 * @apiSuccess {string} global.description 描述
 * @apiSuccess {string} global.keywords 关键字
 * @apiSuccess {string} global.key logo文件名
 * @apiSuccess {string} global.extension logo拓展名
 * @apiSuccess {string} global.footer 公用底部
 * @apiSuccess {string} global.statisticsCode 代码统计
 */
function showSetting(req, res, next) {
  debug('ENTER show method!');

  return publicSettingRoute.show(req, res, next);
}

module.exports = {
  showSetting
};
