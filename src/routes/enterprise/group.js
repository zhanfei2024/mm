// core
const debug = require('debug')('APP:Group');

// model

// library
const enterpriseGroupRoute = require('../../routes/mm/group');

/**
 * @api {get} /enterprise/enterprises/cocs/:cocId([0-9]+)/groups 职位列表
 * @apiName index
 * @apiGroup enterprise group
 * 
 * @apiParam {number} cocId 商会id
 * 
 * @apiSuccess {number} id 职位id
 * @apiSuccess {number} enterpriseId 商号id
 * @apiSuccess {number} cocId 商会id
 * @apiSuccess {number} parentId 父id
 * @apiSuccess {string} name 职位名称
 * @apiSuccess {number} balance 费用
 * @apiSuccess {number} timeSpan 下次缴费时间
 * @apiSuccess {number} order 序号
 */
function index(req, res, next) {
  debug('ENTER index method!');

  req.query.enterpriseId = res.locals.enterpriseAuth.id;
  req.query.cocId = req.params.cocId;
  return enterpriseGroupRoute.index(req, res, next);
}

/**
 * @api {get} /enterprise/enterprises/cocs/:cocId([0-9]+)/groups/:groupId([0-9]+) 职位详情
 * @apiName show
 * @apiGroup enterprise group
 * 
 * @apiParam {number} cocId 商会id
 * @apiParam {number} groupId 职位id
 * 
 * @apiSuccess {number} id 职位id
 * @apiSuccess {number} enterpriseId 商号id
 * @apiSuccess {number} cocId 商会id
 * @apiSuccess {number} parentId 父id
 * @apiSuccess {string} name 职位名称
 * @apiSuccess {number} balance 费用
 * @apiSuccess {number} timeSpan 下次缴费时间
 * @apiSuccess {number} order 序号
 */
function show(req, res, next) {
  debug('ENTER show method!');

  return enterpriseGroupRoute.show(req, res, next);
}

/**
 * @api {post} /enterprise/enterprises/cocs/:cocId([0-9]+)/groups/ 创建职位
 * @apiName create
 * @apiGroup enterprise group
 * 
 * @apiParam {string} name 职位名称
 * @apiParam {number} order 序号
 * @apiParam {number} [parentId] 父id
 * @apiParam {number} [balance] 费用
 * @apiParam {number} [timeSpan] 缴费时间
 * 
 * @apiSuccess {number} id 职位id
 * @apiSuccess {number} enterpriseId 商号id
 * @apiSuccess {number} cocId 商会id
 * @apiSuccess {number} parentId 父id
 * @apiSuccess {string} name 职位名称
 * @apiSuccess {number} balance 费用
 * @apiSuccess {number} timeSpan 下次缴费时间
 * @apiSuccess {number} order 序号
 */
function create(req, res, next) {
  debug('ENTER create method!');
  req.body.enterpriseId = res.locals.enterpriseAuth.id;
  req.body.cocId = req.params.cocId;
  return enterpriseGroupRoute.create(req, res, next);
}

/**
 * @api {put} /enterprise/enterprises/cocs/:cocId([0-9]+)/groups/:groupId([0-9]+) 修改职位
 * @apiName update
 * @apiGroup enterprise group
 * 
 * @apiParam {string} [name] 职位名称
 * @apiParam {number} [order] 序号
 * @apiParam {number} [parentId] 父id
 * @apiParam {number} [balance] 费用
 * @apiParam {number} [timeSpan] 缴费时间
 * 
 * @apiSuccess {number} id 职位id
 * @apiSuccess {number} enterpriseId 商号id
 * @apiSuccess {number} cocId 商会id
 * @apiSuccess {number} parentId 父id
 * @apiSuccess {string} name 职位名称
 * @apiSuccess {number} balance 费用
 * @apiSuccess {number} timeSpan 下次缴费时间
 * @apiSuccess {number} order 序号
 */
function update(req, res, next) {
  debug('ENTER update method!');
  return enterpriseGroupRoute.update(req, res, next);
}

/**
 * @api {delete} /enterprise/enterprises/cocs/:cocId([0-9]+)/groups/:groupId([0-9]+) 删除职位
 * @apiName delete
 * @apiGroup enterprise group
 * 
 * @apiSuccess {boolean} status 是否删除成功
 */
function destroy(req, res, next) {
  debug('ENTER destroy method!');

  return enterpriseGroupRoute.destroy(req, res, next);
}

module.exports = {
  index,
  show,
  create,
  update,
  destroy
};
