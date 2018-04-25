// core
const debug = require('debug')('APP:COC_SLIDESHOW');

// library
const enterpriseSlideShowRoute = require('../../routes/mm/slideShow');

/**
 * @api {get} /enterprise/enterprises/cocs/:cocId([0-9]+)/slide-show 获取轮播图列表
 * @apiName index
 * @apiGroup enterprise slideShow
 *
 * @apiParam {string{..255}} [search] 搜索标题字符串
 * @apiParam {boolean} [isActive] 是否有效
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
function index(req, res, next) {
  debug('ENTER index method!');

  req.query.type = 'coc';
  req.query.cocId = req.params.cocId;
  req.query.enterpriseId = res.locals.enterpriseAuth.id;

  return enterpriseSlideShowRoute.index(req, res, next);
}

/**
 * @api {post} /enterprise/enterprises/coc/:cocId([0-9]+)/slide-show/:slideShowId([0-9]+) 获取一个轮播图
 * @apiName show
 * @apiGroup enterprise slideShow
 *
 * @apiParam {number} cocId 商会id
 * @apiParam {number} enterpriseId 企业id
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
function show(req, res, next) {
  debug('ENTER show method!');

  req.params.enterpriseId = res.locals.enterpriseAuth.id;

  return enterpriseSlideShowRoute.show(req, res, next);
}

/**
 * @api {post} /enterprise/enterprises/coc/:cocId([0-9]+)/slide-show 商会添加一个轮播图
 * @apiName create
 * @apiGroup enterprise slideShow
 *
 * @apiParam {string{..255}} title 轮播图标题
 * @apiParam {string{..255}} url 点击轮播图跳转的地址
 * @apiParam {boolean} [isActive] 是否有效，默认有效
 * @apiParam {string{..255}} path 图片路径
 * @apiParam {number} size 图片大小
 * @apiParam {string{..255}} name 图片文件名
 * @apiParam {string{..255}} key  *
 * @apiParam {string{..255}} extension 图片拓展名
 * @apiParam {string{..255}} mime 图片mime类型
 * @apiParam {number} order 轮播图序号
 * @apiParam {date_iso8601} createdAt 数据创建时间
 * @apiParam {date_iso8601} updatedAt 数据修改时间
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
function create(req, res, next) {
  debug('ENTER create method!');

  req.body.type = 'coc';
  req.body.cocId = req.params.cocId;
  req.body.enterpriseId = res.locals.enterpriseAuth.id;

  return enterpriseSlideShowRoute.create(req, res, next);
}

/**
 * @api {post} /enterprise/enterprises/coc/:cocId([0-9]+)/slide-show 管理员添加一个轮播图
 * @apiName create
 * @apiGroup enterprise slideShow
 *
 * @apiParam {string{..255}} [title] 轮播图标题
 * @apiParam {string{..255}} [url] 点击轮播图跳转的地址
 * @apiParam {boolean} [isActive] 是否有效
 * @apiParam {string{..255}} [path] 图片路径
 * @apiParam {number} [size] 图片大小
 * @apiParam {string{..255}} [name] 图片文件名
 * @apiParam {string{..255}} [key]  *
 * @apiParam {string{..255}} [extension] 图片拓展名
 * @apiParam {string{..255}} [mime] 图片mime类型
 * @apiParam {number} [order] 轮播图序号
 * @apiParam {date_iso8601} [createdAt] 数据创建时间
 * @apiParam {date_iso8601} [updatedAt] 数据修改时间
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
function update(req, res, next) {
  debug('ENTER update method!');

  req.body.type = 'coc';
  req.body.cocId = req.params.cocId;
  req.body.enterpriseId = res.locals.enterpriseAuth.id;

  return enterpriseSlideShowRoute.update(req, res, next);
}

/**
 * @api {delete} /enterprise/enterprises/cocs/:cocId([0-9]+)/slide-show/:slideShowId([0-9]+) 删除一个轮播图
 * @apiName destroy
 * @apiGroup enterprise slideShow
 *
 * @apiParam {number} cocId 商会id
 * @apiParam {number} enterpriseId 企业id
 *
 * @apiSuccess {boolean} status 是否删除成功
 */
function destroy(req, res, next) {
  debug('ENTER destroy method!');

  req.params.enterpriseId = res.locals.enterpriseAuth.id;

  return enterpriseSlideShowRoute.destroy(req, res, next);
}


/**
 * @api {post} /enterprise/enterprises/cocs/:cocId([0-9]+)/slide-show/:slideShowId([0-9]+) 上传轮播图
 * @apiName avatar
 * @apiGroup enterprise slideShow
 *
 * @apiParam {number} cocId 商会id
 * @apiParam {number} enterpriseId 企业id
 * @apiParam {number} slideShowId  轮播图id
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
 *
 */
function uploadSlideShow(req, res, next) {
  debug('ENTER destroy method!');

  req.params.enterpriseId = res.locals.enterpriseAuth.id;

  return enterpriseSlideShowRoute.uploadSlideShow(req, res, next);
}

module.exports = {
  index,
  show,
  create,
  update,
  destroy,
  uploadSlideShow
};
