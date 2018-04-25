// core
const debug = require('debug')('APP:ACTIVITY_CATEGORIES');

// library
const categoriesRoute = require('../../routes/mm/activityCategories');

/**
 *
 */
/**
 * @api {get} /public/activities/categories 活动分类列表
 * @apiName index
 * @apiGroup public activityCategories
 *
 * @apiSuccess {number} id 分类id
 * @apiSuccess {number} parentId 分类父id
 * @apiSuccess {string} name 分类名称
 * @apiSuccess {number} depth 层级深度
 * @apiSuccess {number} order 排列序号
 * @apiSuccess {string} description 分类描述
 */
function indexCategories(req, res, next) {
  debug('ENTER index method!');

  return categoriesRoute.index(req, res, next);
}

/**
 * @api {get} /public/activities/categories/:activityCategoryId([0-9]+) 活动分类详情
 * @apiName show
 * @apiGroup public activityCategories
 *
 * @apiParam {number} activityCategoryId 活动分类id
 *
 * @apiSuccess {number} id 分类id
 * @apiSuccess {number} parentId 分类父id
 * @apiSuccess {string} name 分类名称
 * @apiSuccess {number} depth 层级深度
 * @apiSuccess {number} order 排列序号
 * @apiSuccess {string} description 分类描述
 */
function showCategory(req, res, next) {
  debug('ENTER show method!');
  return categoriesRoute.show(req, res, next);
}

/**
 * @api {get} /public/activities/categories/indexTree 活动分类树结构
 * @apiName indexTree
 * @apiGroup public activityCategories
 *
 * @apiParam {number} activityCategoryId 活动分类id
 *
 * @apiSuccess {number} id 分类id
 * @apiSuccess {number} parentId 分类父id
 * @apiSuccess {string} name 分类名称
 * @apiSuccess {number} depth 层级深度
 * @apiSuccess {number} order 排列序号
 * @apiSuccess {string} description 分类描述
 */
function indexTrees(req, res, next) {
  debug('ENTER show method!');
  return categoriesRoute.indexTree(req, res, next);
}


module.exports = {
  indexCategories,
  showCategory,
  indexTrees
};
