// core
const debug = require('debug')('APP:PUBLIC_POST_CATEGORY');


// library
const postCategoryRoute = require('../../routes/mm/postCategory');

/**
 * @api {get} /public/post/categories 获取所有的文章分类
 * @apiName index
 * @apiGroup public post category
 *
 * @apiSuccess {number} id 分类id
 * @apiSuccess {string} name 分类名称
 * @apiSuccess {string} description 分类描述
 */
function indexPostCategories(req, res, next) {
  debug('ENTER index method!');


  return postCategoryRoute.index(req, res, next);
}

/**
 * @api {get} /public/post/categories/:categoryId([0-9]+) 获取所有的文章分类
 * @apiName show
 * @apiGroup public posCategory
 *
 * @apiSuccess {number} id 分类id
 * @apiSuccess {string} name 分类名称
 * @apiSuccess {string} description 分类描述
 */
function showPostCategory(req, res, next) {
  debug('ENTER show method!');


  return postCategoryRoute.show(req, res, next);
}

/**
 * @api {get} /public/post/categories/indexTree 获取文章分类(有层级结构)
 * @apiName indexTree
 * @apiGroup public postCategory indexTree
 *
 * @apiSuccess {number} id 分类id
 * @apiSuccess {string} name 分类名称
 * @apiSuccess {string} description 分类描述
 * @apiSuccess {array} children 子分类数组
 * @apiSuccess {number} children.id 子分类id
 * @apiSuccess {number} children.name 子分类名称
 * @apiSuccess {number} children.description 子分类描述
 */
function indexTrees(req, res, next) {
  debug('ENTER indexTree method!');


  return postCategoryRoute.indexTree(req, res, next);
}

module.exports = {
  indexPostCategories,
  showPostCategory,
  indexTrees
};

