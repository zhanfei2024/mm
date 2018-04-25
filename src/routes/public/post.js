// core
const debug = require('debug')('APP:PUBLIC_POST');


// library
const postRoute = require('../../routes/mm/post');
const _ = require('lodash');

/**
 * @api {get} /public/posts 获取文章列表
 * @apiName index
 * @apiGroup public posts
 *
 * @apiParam {number} [cocId] 商会id号
 * @apiParam {array} [categoryIds] 文章分类
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
 * @apiSuccess {string} cover 分子封面
 */
function indexPosts(req, res, next) {
  debug('ENTER index method!');

  req.query.isApproved = true;
  req.query.isActive = true;
  // 平台首页只展示isPublic的
  if (_.isNil(req.query.cocId)) {
    req.query.isPublic = true;
  }

  return postRoute.index(req, res, next);
}

/**
 * @api {get} /public/posts/:postId([0-9]+) 获取文章详情
 * @apiName show
 * @apiGroup public posts
 *
 * @apiParam {number} postId
 * @apiParam {number} [enterpriseId] 企业id号
 * @apiParam {number} [cocId] 商会id号
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
 * @apiSuccess {number} categories.id 文章分类
 * @apiSuccess {string} categories.name 分类名称
 * @apiSuccess {number} coc.id 商会id
 * @apiSuccess {string} coc.name 商会名称
 * @apiSuccess {string} coc.logoUrl 商会logo的url
 * @apiSuccess {string} cover 分子封面
 */
function showPost(req, res, next) {
  debug('ENTER show method!');

  req.params.isApproved = true;
  req.params.isActive = true;
  // 公共路由进入点击数+1
  req.query.clicked = true;
  if (/^\d+$/.test(req.query.cocId)) {
    req.params.cocId = req.query.cocId;
  }

  return postRoute.show(req, res, next);
}


module.exports = {
  indexPosts,
  showPost
};
