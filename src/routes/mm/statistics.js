// Core
const debug = require('debug')('APP:MM_STATISTICS');

// Library
const _ = require('lodash');
const moment = require('moment');

// model
const models = require('../../models');

/**
 * 根据表model获取统计数据
 * @param {object} model
 */
async function getCountByModel(model, filter) {
  return await model.count({ where: filter });
}

async function show(req, res, next) {
  debug('ENTER show method!');

  const result = {};
  const filter = {};
  if (!_.isNil(req.query.cocId)) {
    filter.cocId = req.query.cocId;
  }
  /**
   * cocs     所有商会数量
   * members  所有会员数量
   * users    所有用户数量
   * msgs     所有留言数量
   * ccs      待审核申请商会数量(candidate of cocs)
   * cms      待审核申请会员数量(candidate of members )
   * cas      待审核申请活动数量(candidate of activities)
   * tacs     今日新增商会数量(today added cocs)
   * tams     今日新增会员数量(today added members)
   * yacs     昨日新增商会数量(yesterday added cocs)
   * yams     昨日新增会员数量(yesterday added members)
   * macs     本月新增商会数量(month added cocs)
   * mams     本月新增会员数量(month added members)
   */
  for (let k in req.query) {
    let key = k.toLowerCase();
    switch (key) {
      case 'cocs':
        result[k] = await getCountByModel(models.Coc, _.assign({ isApproved: true }, filter));
        break;
      case 'members':
        result[k] = await getCountByModel(models.Member, filter);
        break;
      case 'users':
        result[k] = await getCountByModel(models.User);
        break;
      case 'msgs':
        result[k] = await getCountByModel(models.Message, _.assign({ messageReply: null }, filter));
        break;
      case 'ccs':
        result[k] = await getCountByModel(models.Coc, _.assign({ isApproved: false }, filter));
        break;
      case 'cms':
        result[k] = await getCountByModel(models.Candidate, _.assign({ type: 'appliy', status: 'pending' }, filter));
        break;
      case 'cas':
        result[k] = await getCountByModel(models.ActivityCandidate, _.assign({ status: 'pending' }, filter));
        break;
      case 'tacs':
        result[k] = await getCountByModel(models.Coc, _.assign({ createdAt: { $gt: moment().format('YYYY-MM-DD') } }, filter));
        break;
      case 'tams':
        result[k] = await getCountByModel(models.Member, _.assign({ createdAt: { $gt: moment().format('YYYY-MM-DD') } }, filter));
        break;
      case 'yacs':
        result[k] = await getCountByModel(models.Coc, _.assign({ createdAt: { $gt: moment().subtract(1, 'months').format('YYYY-MM-DD') } }, filter));
        break;
      case 'yams':
        result[k] = await getCountByModel(models.Member, _.assign({ createdAt: { $gt: moment().subtract(1, 'days').format('YYYY-MM-DD') } }, filter));
        break;
      case 'macs':
        result[k] = await getCountByModel(models.Coc, _.assign({ createdAt: { $gt: moment().subtract(1, 'days').format('YYYY-MM-DD') } }, filter));
        break;
      case 'mams':
        result[k] = await getCountByModel(models.Member, _.assign({ createdAt: { $gt: moment().subtract(1, 'months').format('YYYY-MM-DD') } }, filter));
        break;
      default: break;
    }
  }
  res.item(result);
}

module.exports = {
  show
};
