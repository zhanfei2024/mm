// core
const debug = require('debug')('APP:ADMIN_Industry');

// model

// library
const industryRoute = require('../../routes/mm/industry');

/**
 * @api {get} /admin/admin/industries 获取所有行业
 * @apiName index
 * @apiGroup admin industry
 *
 * @apiSuccess {number} id 行业id
 * @apiSuccess {number} parentId 父级id
 * @apiSuccess {string} name 行业名称
 * @apiSuccess {number} depth 分类层级
 * @apiSuccess {number} order 权重
 * @apiSuccess {boolean} isActive 有效/禁用
 * @apiSuccess {string} description 描述
 * @apiSuccess {date_iso8601} createdAt 创建日期
 * @apiSuccess {date_iso8601} updatedAt 更新日期
 */
function index(req, res, next) {
  debug('ENTER index method!');

  return industryRoute.index(req, res, next);
}

/**
 * @api {get} /admin/admin/industries/:industryId([0-9]+) 获取行业详情
 * @apiName show
 * @apiGroup admin industry
 *
 * @apiSuccess {number} id 行业id
 * @apiSuccess {number} parentId 父级id
 * @apiSuccess {string} name 行业名称
 * @apiSuccess {number} depth 分类层级
 * @apiSuccess {number} order 权重
 * @apiSuccess {boolean} isActive 有效/禁用
 * @apiSuccess {string} description 描述
 * @apiSuccess {date_iso8601} createdAt 创建日期
 * @apiSuccess {date_iso8601} updatedAt 更新日期
 */
function show(req, res, next) {
  debug('ENTER show method!');

  return industryRoute.show(req, res, next);
}

/**
 * @api {post} /admin/admin/industries/ 添加一个行业
 * @apiName create
 * @apiGroup admin industry
 * 
 * @apiParam {number} [parentId] 父id
 * @apiParam {string} name 行业名称
 * @apiParam {string} order 排序
 * @apiParam {number} [depth=1] 分类层级
 * @apiParam {boolean} [isActive=true] 有效/禁用
 * @apiParam {string} [description=""] 行业描述
 * 
 * @apiSuccess {number} id 行业id
 * @apiSuccess {number} parentId 父级id
 * @apiSuccess {string} name 行业名称
 * @apiSuccess {number} depth 分类层级
 * @apiSuccess {number} order 权重
 * @apiSuccess {boolean} isActive 有效/禁用
 * @apiSuccess {string} description 描述
 * @apiSuccess {date_iso8601} createdAt 创建日期
 * @apiSuccess {date_iso8601} updatedAt 更新日期
 */
function create(req, res, next) {
  debug('ENTER create method!');
  return industryRoute.create(req, res, next);
}

/**
 * @api {put} /admin/admin/industries/:industryId([0-9]+) 修改行业
 * @apiName update
 * @apiGroup admin industry
 * 
 * @apiParam {number} [parentId] 父id
 * @apiParam {string{..255}} [name] 行业名称
 * @apiParam {number} [depth] 分类层级
 * @apiParam {string} [order] 排序
 * @apiParam {boolean} [isActive] 有效/禁用
 * @apiParam {string} [description] 行业描述
 * 
 * @apiSuccess {number} id 行业id
 * @apiSuccess {number} parentId 父级id
 * @apiSuccess {string} name 行业名称
 * @apiSuccess {number} depth 分类层级
 * @apiSuccess {number} order 权重
 * @apiSuccess {boolean} isActive 有效/禁用
 * @apiSuccess {string} description 描述
 * @apiSuccess {date_iso8601} createdAt 创建日期
 * @apiSuccess {date_iso8601} updatedAt 更新日期
 */
function update(req, res, next) {
  debug('ENTER update method!');

  return industryRoute.update(req, res, next);
}

/**
 * @api {delete} /admin/admin/industries/:industryId([0-9]+) 删除行业
 * @apiName destroy
 * @apiGroup admin industry
 * 
 * @apiSuccess {boolean} status 是否删除成功
 */
function destroy(req, res, next) {
  debug('ENTER destroy method!');

  return industryRoute.destroy(req, res, next);
}

module.exports = {
  index,
  show,
  create,
  update,
  destroy
};
