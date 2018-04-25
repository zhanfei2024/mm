// core
const debug = require('debug')('APP:ADMIN_POST');


// library
const postRoute = require('../mm/post');
const _ = require('lodash');

/**
 * @api {get} /admin/posts 获取文章列表
 * @apiName index
 * @apiGroup admin posts
 *
 * @apiParam {array} [categoryIds] 文章分类,id的数组
 * @apiParam {string="featured", "newest", "popular"} [sorting] 排序字段
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
 * @apiSuccess {boolean} isFeatured 是否是特别的
 * @apiSuccess {boolean} isActive 是否有效
 * @apiSuccess {boolean} isPublic 是否向游客公开
 * @apiSuccess {date} createdAt 数据创建日期
 * @apiSuccess {date} updatedAt 数据更新日期
 *
 * @apiSuccess {object} coc 发布者信息
 * @apiSuccess {number} coc.id 商会id
 * @apiSuccess {string} coc.name 商会名称
 * @apiSuccess {string} coc.logoUrl 商会logo的url路径
 *
 * @apiSuccess {array} categories 文章分类
 * @apiSuccess {array} categories.id 文章分类id
 * @apiSuccess {array} categories.name 文章分类名称
 *
 * @apiSuccess {string} cover 文章封面
 */
function index(req, res, next) {
  debug('ENTER index method!');

  return postRoute.index(req, res, next);
}

/**
 * @api {put} /admin/posts/:postId([0-9]+) 修改文章
 * @apiName update
 * @apiGroup admin posts
 *
 * @apiParam {string} [title] 文章标题
 * @apiParam {string} [cocName] 按商会名称搜索
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
 * @apiSuccess {string} cover 分子封面
 */
function update(req, res, next) {
  debug('ENTER update method!');


  return postRoute.update(req, res, next);
}


function destroy(req, res, next) {
  debug('ENTER destroy method!');


  return postRoute.destroy(req, res, next);
}

module.exports = {
  index,
  update,
  destroy,
};
