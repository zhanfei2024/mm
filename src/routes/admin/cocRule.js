// core
const debug = require('debug')('APP:ADMIN_COC_RULE');

// model

// library
const adminCocRuleRoute = require('../../routes/mm/cocRules');

/**
 * @api {get} /admin/rules 获取rule列表
 * @apiName index
 * @apiGroup admin cocRule
 *
 * @apiParam {string="notice", "statutes"} type rule的类型
 * @apiParam {string} [title] 标题
 * @apiParam {string} [name] 商会名称
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

  return adminCocRuleRoute.index(req, res, next);
}

/**
 * @api {get} /admin/rules/:rules([0-9]+) 获取rule详情
 * @apiName show
 * @apiGroup admin cocRule
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

  return adminCocRuleRoute.show(req, res, next);
}

function destroy(req, res, next) {
  debug('ENTER destroy method!');

  return adminCocRuleRoute.destroy(req, res, next);
}

module.exports = {
  index,
  show,
  destroy,
};
