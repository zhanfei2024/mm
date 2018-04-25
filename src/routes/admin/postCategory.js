// core
const debug = require('debug')('APP:ADMIN_POST_CATEGORY');


// library
const postCategoryRoute = require('../../routes/mm/postCategory');

/**
 * @api {get} /admin/post/categories 文章分类列表
 * @apiName index
 * @apiGroup admin postCategory
 * 
 * @apiSuccess {number} id 文章分类id
 * @apiSuccess {number} parentId 文章分类父id
 * @apiSuccess {string} name 文章分类名称
 * @apiSuccess {string} description 文章分类描述
 */
function index(req, res, next) {
  debug('ENTER index method!');


  return postCategoryRoute.index(req, res, next);
}

/**
 * @api {get} /admin/post/categories/:categoryId([0-9]+) 文章分类详情
 * @apiName show
 * @apiGroup admin postCategory
 * 
 * @apiParam {number} categoryId 文章分类id
 * @apiSuccess {number} id 文章分类id
 * @apiSuccess {number} parentId 文章分类父id
 * @apiSuccess {string} name 文章分类名称
 * @apiSuccess {string} description 文章分类描述
 */
function show(req, res, next) {
  debug('ENTER show method!');


  return postCategoryRoute.show(req, res, next);
}

/**
 * @api {post} /admin/post/categories 添加文章分类
 * @apiName show
 * @apiGroup admin postCategory
 * 
 * @apiParam {number} [parentId] 文章分类父id
 * @apiParam {string} name 文章分类名称
 * @apiParam {string} [description] 文章分类描述
 * 
 * @apiSuccess {number} id 文章分类id
 * @apiSuccess {number} parentId 文章分类父id
 * @apiSuccess {string} name 文章分类名称
 * @apiSuccess {string} description 文章分类描述
 */
function create(req, res, next) {
  debug('ENTER create method!');


  return postCategoryRoute.create(req, res, next);
}

/**
 * @api {put} /admin/post/categories/:categoryId([0-9]+) 修改文章分类
 * @apiName update
 * @apiGroup admin postCategory
 * 
 * @apiParam {number} categoryId 文章分类id
 * @apiParam {number} [parentId=null] 文章分类父id
 * @apiParam {string} [name] 文章分类名称
 * @apiParam {string} [description] 文章分类描述
 * 
 * @apiSuccess {number} id 文章分类id
 * @apiSuccess {number} parentId 文章分类父id
 * @apiSuccess {string} name 文章分类名称
 * @apiSuccess {string} description 文章分类描述
 */
function update(req, res, next) {
  debug('ENTER update method!');


  return postCategoryRoute.update(req, res, next);
}

/**
 * @api {destroy} /admin/post/categories/:categoryId([0-9]+) 删除文章分类
 * @apiName destroy
 * @apiGroup admin postCategory
 * 
 * @apiParam {number} categoryId 文章分类id
 * 
 * @apiSuccess {boolean} status 是否删除成功
 */
function destroy(req, res, next) {
  debug('ENTER destroy method!');


  return postCategoryRoute.destroy(req, res, next);
}

module.exports = {
  index,
  show,
  create,
  update,
  destroy
};

