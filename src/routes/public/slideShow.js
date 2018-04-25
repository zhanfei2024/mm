// core
const debug = require('debug')('APP:PUBLIC_SLIDESHOW');

// library
const publicSlideShowRoute = require('../../routes/mm/slideShow');
const _ = require('lodash');

/**
 * @api {get} /public/slide-show 平台首页或商会首页的轮播图列表
 * @apiName index
 * @apiGroup public slideShow
 *
 * @apiParam {number} [cocId] 商会id
 *
 * @apiSuccess {number} id 轮播图id
 * @apiSuccess {number} enterpriseId 企业id
 * @apiSuccess {number} cocId 商会id
 * @apiSuccess {string="platform","coc"} type 轮播图类型
 * @apiSuccess {string{..255}} title 轮播图标题
 * @apiSuccess {string{..255}} url 点击轮播图跳转的地址
 * @apiSuccess {boolean} isActive 轮播图是否有效
 * @apiSuccess {string{..255}} path 图片路径
 * @apiSuccess {number} size 图片大小
 * @apiSuccess {string{..255}} name 图片文件名
 * @apiSuccess {string{..255}} key *
 * @apiSuccess {string{..255}} extension 图片拓展名
 * @apiSuccess {string{..255}} mime 图片mime类型
 * @apiSuccess {number} order 图片序号
 * @apiSuccess {date_iso8601} createdAt 数据创建时间
 * @apiSuccess {date_iso8601} updatedAt 数据修改时间
 */
function indexSlides(req, res, next) {
  debug('ENTER index method!');

  // 平台首页能看到的轮播图
  req.query.isActive = true;
  req.query.type = 'platform';
  // 商会首页
  if (!_.isNil(req.query.cocId) && !_.isNil(req.query.cocId)) req.query.type='coc';

  return publicSlideShowRoute.index(req, res, next);
}

module.exports = {
  indexSlides
};
