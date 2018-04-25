const cocRulesRoute = require('../mm/cocRules');

const debug = require('debug')('APP:Public_Coc_Rules');

/**
 * @api {get} /public/cocs/:cocId([0-9]+)/rules 获取rule列表
 * @apiName index
 * @apiGroup public rule
 *
 * @apiParam {string="notice", "statutes"} [type] rule类型
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
async function indexRules(req, res, next) {
  debug('ENTER index method!');

  req.query.cocId = req.params.cocId;

  return cocRulesRoute.index(req, res, next);
}

/**
 * @api {get} /public/cocs/:cocId([0-9]+)/rules/:ruleId([0-9]+) 获取rule详情
 * @apiName show
 * @apiGroup public rule
 *
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
async function showRule(req, res, next) {
  debug('ENTER show method!');
  return cocRulesRoute.show(req, res, next);
}


module.exports = {
  indexRules,
  showRule
}
