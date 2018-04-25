const groupRoute = require('../mm/group');
const _ = require('lodash');
const debug = require('debug')("APP:Public_Group");

/**
 * @api {get} /public/cocs/:cocId([0-9]+)/groups 职位列表
 * @apiName index
 * @apiGroup public group
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
async function indexGourps(req, res, next) {
  debug('ENTER index method!');

  req.query.cocId = req.params.cocId;
  return groupRoute.index(req, res, next);
}

/**
 * @api {get} /public/cocs/:cocId([0-9]+)/groups/:groupId([0-9]+) 职位详情
 * @apiName show
 * @apiGroup public group
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
async function showGourp(req, res, next) {
  debug('ENTER index method!');

  return groupRoute.show(req, res, next);
}
module.exports = {
  indexGourps,
  showGourp
};
