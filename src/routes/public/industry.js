// core
const debug = require('debug')('APP:PUBLIC_INDUSTRY');


// library
const industryRoute = require('../../routes/mm/industry');



/**
 *  @api {get} public/industries  列出所有
 *  @apiName  index
 *  @apiGroup public industry
 *
 *
 *  @apiSuccess {number} id     产品id
 *  @apiSuccess {number} parentId      父级id
 *  @apiParam {number} name 名称
 *  @apiSuccess {date} depth      深度
 *  @apiSuccess {string} order      排序
 *  @apiSuccess {boolean} description  排序
 *  @apiSuccess {date} createdAt      创建日期
 *  @apiSuccess {date} updatedAt      更新日期
 *
 */
function indexIndustries(req, res, next) {
  debug('ENTER index method!');

  req.query.isActive = true;

  return industryRoute.index(req, res, next);
}


/**
 *  @api {get} public/industries/:industryId([0-9]+)  行业详情页
 *  @apiName  show
 *  @apiGroup public industry
 *
 *  @apiParam {number} industryId 产品id
 *
 *  @apiSuccess {number} id     产品id
 *  @apiSuccess {number} parentId      父级id
 *  @apiParam {number} name 名称
 *  @apiSuccess {date} depth      深度
 *  @apiSuccess {string} order      排序
 *  @apiSuccess {boolean} description  排序
 *  @apiSuccess {date} createdAt      创建日期
 *  @apiSuccess {date} updatedAt      更新日期
 *
 */
function showIndustry(req, res, next) {
  debug('ENTER show method!');


  return industryRoute.show(req, res, next);
}

module.exports = {
  indexIndustries,
  showIndustry
};
