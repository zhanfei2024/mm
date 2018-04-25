// core
const debug = require('debug')('APP:ENTERPRISE_POST');


// library
const postRoute = require('../../routes/mm/post');

/**
 * @api {get} /enterprise/enterprises/cocs/:cocId([0-9]+)/posts 获取文章列表
 * @apiName index
 * @apiGroup enterprise posts
 *
 * @apiParam {array} [categoryIds] 文章分类,id的数组
 * @apiParam {string="featured", "newest", "popular"} sorting 排序字段
 * @apiParam {string} [search] 搜索字符串
 * @apiParam {boolean} [isApproved] 是否审核通过
 * @apiParam {boolean} [isActive] 是否有效
 * @apiParam {boolean} [isPublic] 是否公开(游客看不见非公开文章)
 * @apiParam {array} [tags] 文章标签
 *
 * @apiSuccess {number} id 文章id号
 * @apiSuccess {string} title 文章标题
 * @apiSuccess {string} slug SEO信息
 * @apiSuccess {string} content 文章内容
 * @apiSuccess {number} view 文章点击数
 * @apiSuccess {boolean} isFeatured 是否是特殊的
 * @apiSuccess {boolean} isActive 是否有效
 * @apiSuccess {boolean} isPublic 是否向游客公开
 * @apiSuccess {date} updatedAt 数据更新日期
 *
 * @apiSuccess {number} categories.id 文章分类
 * @apiSuccess {string} categories.name 分类名称
 *
 * @apiSuccess {number} coc.id 商会id
 * @apiSuccess {string} coc.name 商会名称
 * @apiSuccess {string} coc.logoUrl 商会logo的url
 *
 * @apiSuccess {string} cover 文章封面
 */
function index(req, res, next) {
  debug('ENTER index method!');

  req.query.enterpriseId = res.locals.enterpriseAuth.id;
  req.query.cocId = req.params.cocId;
  return postRoute.index(req, res, next);
}

/**
 * @api {get} /enterprise/enterprises/cocs/:cocId([0-9]+)/posts/:postId([0-9]+) 获取文章详情
 * @apiName show
 * @apiGroup enterprise posts
 *
 * @apiParam {number} postId 文章id
 *
 * @apiSuccess {number} id 文章id号
 * @apiSuccess {string} title 文章标题
 * @apiSuccess {string} slug SEO信息
 * @apiSuccess {string} content 文章内容
 * @apiSuccess {number} view 文章点击数
 * @apiSuccess {boolean} isFeatured 是否是特殊的
 * @apiSuccess {boolean} isActive 是否有效
 * @apiSuccess {boolean} isPublic 是否向游客公开
 * @apiSuccess {date} updatedAt 数据更新日期
 *
 * @apiSuccess {number} categories.id 文章分类
 * @apiSuccess {string} categories.name 分类名称
 *
 * @apiSuccess {number} coc.id 商会id
 * @apiSuccess {string} coc.name 商会名称
 * @apiSuccess {string} coc.logoUrl 商会logo的url
 *
 * @apiSuccess {string} cover 文章封面
 */
function show(req, res, next) {
  debug('ENTER show method!');

  req.query.enterpriseId = res.locals.enterpriseAuth.id;

  return postRoute.show(req, res, next);
}

/**
 * @api {post} /enterprise/enterprises/cocs/:cocId([0-9]+)/posts 发布文章
 * @apiName create
 * @apiGroup enterprise posts
 *
 * @apiParam {string} title 文章标题
 * @apiParam {string} content 文章内容
 * @apiParam {array} categoryIds 文章分类,id的数组
 * @apiParam {boolean} [isActive] 是否有效
 * @apiParam {boolean} [isPublic] 是否公开(游客看不见非公开文章)
 * @apiParam {array} [tags] 文章标签
 * @apiParam {date_iso8601} createdAt 数据创建日期
 * @apiParam {date_iso8601} updatedAt 数据更新日期
 *
 * @apiSuccess {number} id 文章id号
 * @apiSuccess {string} title 文章标题
 * @apiSuccess {string} slug SEO信息
 * @apiSuccess {string} content 文章内容
 * @apiSuccess {number} view 文章点击数
 * @apiSuccess {boolean} isFeatured 是否是特别的
 * @apiSuccess {boolean} isActive 是否有效
 * @apiSuccess {boolean} isPublic 是否向游客公开
 * @apiSuccess {date} createdAt 数据创建日期
 * @apiSuccess {date} updatedAt 数据更新日期
 *
 * @apiSuccess {number} coc.id 商会id
 * @apiSuccess {string} coc.name 商会名称
 * @apiSuccess {string} coc.logoUrl 商会logo的url路径
 *
 * @apiSuccess {number} categories.id 文章分类id
 * @apiSuccess {string} categories.name 文章分类名称
 *
 * @apiSuccess {string} cover 文章封面
 */
function create(req, res, next) {
  debug('ENTER create method!');

  req.body.enterpriseId = res.locals.enterpriseAuth.id;
  req.body.cocId =  req.params.cocId;
  req.body.isApproved = true;

  return postRoute.create(req, res, next);
}

/**
 * @api {put} /enterprise/enterprises/cocs/:cocId([0-9]+)/posts/:postId([0-9]+) 修改文章
 * @apiName update
 * @apiGroup enterprise posts
 *
 * @apiParam {string} [title] 文章标题
 * @apiParam {string} [content] 文章内容
 * @apiParam {array} [categoryIds] 文章分类,id的数组
 * @apiParam {boolean} [isActive] 是否有效
 * @apiParam {boolean} [isPublic] 是否公开(游客看不见非公开文章)
 * @apiParam {array} [tags] 文章标签
 * @apiParam {date_iso8601} [createdAt] 数据创建日期
 * @apiParam {date_iso8601} [updatedAt] 数据更新日期
 *
 * @apiSuccess {number} id 文章id号
 * @apiSuccess {string} title 文章标题
 * @apiSuccess {string} slug SEO信息
 * @apiSuccess {string} content 文章内容
 * @apiSuccess {number} view 文章点击数
 * @apiSuccess {boolean} isFeatured 是否是特别的
 * @apiSuccess {boolean} isActive 是否有效
 * @apiSuccess {boolean} isPublic 是否向游客公开
 * @apiSuccess {date} createdAt 数据创建日期
 * @apiSuccess {date} updatedAt 数据更新日期
 *
 * @apiSuccess {array} categories 文章分类
 * @apiSuccess {number} categories.id 文章分类id
 * @apiSuccess {string} categories.name 文章分类名称
 *
 * @apiSuccess {string} cover 文章封面
 */
function update(req, res, next) {
  debug('ENTER update method!');

  // 发表的文章默认是isApproved 但企业自己不能修改这个字段
  req.body.enterpriseId = res.locals.enterpriseAuth.id;
  delete req.body.isApproved;

  return postRoute.update(req, res, next);
}

/**
 * @api {delete} /enterprise/enterprises/cocs/:cocId([0-9]+)/posts/:postId([0-9]+) 删除文章
 * @apiName destroy
 * @apiGroup enterprise posts
 *
 * @apiParam {number} postId 文章id
 *
 * @apiSuccess {boolean} status 是否删除成功
 */
function destroy(req, res, next) {
  debug('ENTER destroy method!');

  req.params.enterpriseId = res.locals.enterpriseAuth.id;

  return postRoute.destroy(req, res, next);
}

module.exports = {
  index,
  show,
  create,
  update,
  destroy
};
