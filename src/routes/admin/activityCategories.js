// core
const debug = require('debug')('APP:ACTIVITY_CATEGORIES');

// library
const categoriesRoute = require('../../routes/mm/activityCategories');

/**
 * @api {get} /api/v1/admin/activities/categories 活动分类列表
 * @apiName index
 * @apiGroup admin activityCategory
 * 
 * @apiParam {string} [search] 搜索字符串
 * @apiParam {boolean} [isActive] 是否有效
 * 
 * @apiSuccess {number} id 分类id
 * @apiSuccess {number} parentId 分类父id
 * @apiSuccess {string} name 分类名称
 * @apiSuccess {string} description 分类描述
 */
function index(req, res, next) {
  debug('ENTER index method!');

  return categoriesRoute.index(req, res, next);
}

/**
 * @api {get} /api/v1/admin/activities/categories/:categoryId([0-9]+) 活动分类详情
 * @apiName show
 * @apiGroup admin activityCategory
 * 
 * @apiParam {string} search 搜索字符串
 * 
 * @apiSuccess {number} id 分类id
 * @apiSuccess {number} parentId 分类父id
 * @apiSuccess {string} name 分类名称
 * @apiSuccess {string} description 分类描述
 */
function show(req, res, next) {
  debug('ENTER show method!');
  return categoriesRoute.show(req, res, next);
}

/**
 * @api {get} /api/v1/admin/activities/categories/indexTree 活动分类树结构
 * @apiName indexTree
 * @apiGroup admin activityCategory
 * 
 * @apiSuccess {number} id 分类id
 * @apiSuccess {number} parentId 分类父id
 * @apiSuccess {string} name 分类名称
 * @apiSuccess {string} description 分类描述
 */
function indexTree(req, res, next) {
  debug('ENTER show method!');
  return categoriesRoute.indexTree(req, res, next);
}

/**
 * @api {post} /api/v1/admin/activities/categories 添加活动分类
 * @apiName create
 * @apiGroup admin activityCategory
 * 
 * @apiParam {string} name 分类名称
 * @apiParam {number} [parentId] 分类父id
 * @apiParam {string} description 分类描述
 * 
 * @apiSuccess {number} id 分类id
 * @apiSuccess {number} parentId 分类父id
 * @apiSuccess {string} name 分类名称
 * @apiSuccess {string} description 分类描述
 */
function create(req, res, next) {
  debug('ENTER update method!');
  return categoriesRoute.create(req, res, next);
}

/**
 * @api {put} /api/v1/admin/activities/categories/:categoryId([0-9]+) 修改活动分类
 * @apiName update
 * @apiGroup admin activityCategory
 * 
 * @apiParam {string} [name] 分类名称
 * @apiParam {boolean} [isActive] 是否有效
 * @apiParam {number} [parentId] 分类父id
 * @apiParam {string} [description] 分类描述
 * 
 * @apiSuccess {number} id 分类id
 * @apiSuccess {number} parentId 分类父id
 * @apiSuccess {string} name 分类名称
 * @apiSuccess {string} description 分类描述
 */
function update(req, res, next) {
  debug('ENTER update method!');

  req.body.categoryId = req.params.categoryId;

  return categoriesRoute.update(req, res, next);
}

/**
 * @api {delete} /api/v1/admin/activities/categories/:categoryId([0-9]+) 删除活动分类
 * @apiName update
 * @apiGroup admin activityCategory
 * 
 * @apiParam {number} id 分类id
 * 
 * @apiSuccess {boolean} status 是否删除成功
 */
function destroy(req, res, next) {
  debug('ENTER destroy method!');
  return categoriesRoute.destroy(req, res, next);
}

module.exports = {
  index,
  show,
  indexTree,
  create,
  update,
  destroy
};
