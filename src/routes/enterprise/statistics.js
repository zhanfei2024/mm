// Core
const debug = require('debug')('APP:ENTERPRISE_STATISTICS');

// Library
const _ = require('lodash');
const enterpriseStatisticsRoute = require('../mm/statistics');

// model
const models = require('../../models');

/**
 * @api{get} /enterprise/enterprises/cocs/:cocId([0-9]+)/statistics 获取首页各个模块待处理的数量
 * @apiName show
 * @apiGroup coc statistics
 *
 * @apiSuccess {number} candidates 待审核的申请商会候选人数量
 * @apiSuccess {number} activities 待审核的申请活动候选人数量
 * @apiSuccess {number} messages 待回复的留言数量
 */
async function show(req, res, next) {
  debug('ENTER show method!');

  req.query.enterpriseId = res.locals.enterpriseAuth.id;
  req.query.cocId = req.params.cocId;

  req.query.cms = true;
  req.query.cas = true;
  req.query.msgs = true;

  enterpriseStatisticsRoute.show(req, res, next);
}

module.exports = {
  show
}
