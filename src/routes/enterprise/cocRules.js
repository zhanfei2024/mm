// core
const debug = require('debug')('APP:Route');

// model

// library
const enterpriseRulesRoute = require('../../routes/mm/cocRules');

/**
 * @api {get} /enterprise/enterprises/cocs/:cocId([0-9]+)/coc-rules 获取rule列表
 * @apiName index
 * @apiGroup enterprise rule
 *
 * @apiParam {number} cocId 商会id
 * @apiParam {string="notice", "statutes"} type rule的类型
 *
 * @apiSuccess {number} id rule的id
 * @apiSuccess {string="notice", "statutes"} type rule的类型
 * @apiSuccess {string} title rule的标题
 * @apiSuccess {string} content rule的内容
 * @apiSuccess {object} coc 商会
 * @apiSuccess {number} coc.id 商会的id
 * @apiSuccess {string} coc.name 商会的名称
 * @apiSuccess {string} coc.logoUrl 商会的logo
 */
function index(req, res, next) {
  debug('ENTER index method!');

  req.query.cocId = req.params.cocId;
  req.query.enterpriseId = res.locals.enterpriseAuth.id;
  
  return enterpriseRulesRoute.index(req, res, next);
}

/**
 * @api {get} /enterprise/enterprises/cocs/:cocId([0-9]+)/coc-rules/:ruleId([0-9]+) 获取rule详情
 * @apiName show
 * @apiGroup enterprise rule
 *
 * @apiParam {number} cocId 商会id
 * @apiParam {number} ruleId rule的id
 *
 * @apiSuccess {number} id rule的id
 * @apiSuccess {string="notice", "statutes"} type rule的类型
 * @apiSuccess {string} title rule的标题
 * @apiSuccess {string} content rule的内容
 * @apiSuccess {object} coc 商会
 * @apiSuccess {number} coc.id 商会的id
 * @apiSuccess {string} coc.name 商会的名称
 * @apiSuccess {string} coc.logoUrl 商会的logo
 */
function show(req, res, next) {
  debug('ENTER show method!');

  return enterpriseRulesRoute.show(req, res, next);
}

/**
 * @api {post} /enterprise/enterprises/cocs/:cocId([0-9]+)/coc-rules 添加rules
 * @apiName create
 * @apiGroup enterprise rule
 *
 * @apiParam {number} cocId商会id
 * @apiParam {string="notice", "statutes"} type创建的类型
 * @apiParam {string} title 标题
 * @apiParam {string} content 内容
 *
 * @apiSuccess {number} id rule的id
 * @apiSuccess {string="notice", "statutes"} type rule的类型
 * @apiSuccess {string} title rule的标题
 * @apiSuccess {string} content rule的内容
 * @apiSuccess {object} coc 商会
 * @apiSuccess {number} coc.id 商会的id
 * @apiSuccess {string} coc.name 商会的名称
 * @apiSuccess {string} coc.logoUrl 商会的logo
 */
function create(req, res, next) {
  debug('ENTER create method!');
  req.body.enterpriseId = res.locals.enterpriseAuth.id;
  req.body.cocId = req.params.cocId;
  return enterpriseRulesRoute.create(req, res, next);
}

/**
 * @api {put} /enterprise/enterprises/cocs/:cocId([0-9]+)/coc-rules/:ruleId([0-9]+) 修改rule
 * @apiName update
 * @apiGroup enterprise rule
 *
 * @apiParam {number} cocId 商会id
 * @apiParam {number} ruleId rule的id
 * @apiParam {string="notice", "statutes"} type创建的类型
 * @apiParam {string} title 标题
 * @apiParam {string} content 内容
 *
 * @apiSuccess {number} id rule的id
 * @apiSuccess {string="notice", "statutes"} type rule的类型
 * @apiSuccess {string} title rule的标题
 * @apiSuccess {string} content rule的内容
 * @apiSuccess {object} coc 商会
 * @apiSuccess {number} coc.id 商会的id
 * @apiSuccess {string} coc.name 商会的名称
 * @apiSuccess {string} coc.logoUrl 商会的logo
 */
function update(req, res, next) {
  debug('ENTER update method!');
  return enterpriseRulesRoute.update(req, res, next);
}

/**
 * @api {delete} /enterprise/enterprises/cocs/:cocId([0-9]+)/coc-rules/:ruleId([0-9]+) 删除
 * @apiName destroy
 * @apiGroup enterprise rule
 *
 * @apiParam {number} cocId 商会id
 * @apiParam {number} ruleId rule的id
 *
 * @apiSuccess {boolean} status 是否删除成功
 */
function destroy(req, res, next) {
  debug('ENTER destroy method!');

  return enterpriseRulesRoute.destroy(req, res, next);
}

module.exports = {
  index,
  show,
  create,
  update,
  destroy
};
