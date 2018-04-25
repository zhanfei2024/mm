// core
const debug = require('debug')('APP:ACTIVITY');

// library
const activityRoute = require('../../routes/mm/activity');

/**
 * @api {get} /admin/activities 获取活动列表
 * @apiName index
 * @apiGroup admin activity
 *
 * @apiParam {string} [search] 搜索字符串
 * @apiParam {array} [categoryIds] 分类
 * @apiParam {string="sign-up", "close", "in-process", "ended", "full"} [status] 活动状态
 * @apiParam {string} [search] 活动名称搜索
 * @apiParam {string} [cocName] 商会名称搜索
 *
 * @apiSuccess {number} id 活动id
 * @apiSuccess {string} title 活动标题
 * @apiSuccess {string="sign-up", "close", "in-process", "ended", "full"} status 活动状态
 * @apiSuccess {number} view 活动点击数
 * @apiSuccess {string} slug SEO信息
 * @apiSuccess {number} cocId 商会id号
 * @apiSuccess {number} enterpriseId 企业id号
 * @apiSuccess {date_iso8601} startTimeAt  起始时间
 * @apiSuccess {date_iso8601} endTimeAt  结束时间
 * @apiSuccess {date_iso8601} signUpEndTimedAt  报名结束时间
 * @apiSuccess {number} express 费用
 * @apiSuccess {number} applyNumberOfPeople 已经申请的人数
 * @apiSuccess {number} personnelNumber 限定人数
 * @apiSuccess {string} address 地址
 * @apiSuccess {string} organizers 组织
 * @apiSuccess {string} trafficMode 交通方式
 * @apiSuccess {string} refundInfo 退款说明
 * @apiSuccess {string} specialInfo 特别说明
 * @apiSuccess {string} description 活动内容
 * @apiSuccess {string} flow 跟随
 * @apiSuccess {boolean} isFeatured 是否是特殊的
 * @apiSuccess {boolean} isActive 是否有效
 * @apiSuccess {boolean} isPublic 是否向游客公开
 * @apiSuccess {array} categories 活动分类
 *
 * @apiSuccess {string} categories.name 分类名称
 *
 */
function index(req, res, next) {
  debug('ENTER index method!');

  return activityRoute.index(req, res, next);
}

/**
 * @api {put} /admin/activities/:activityId([0-9]+) 修改活动
 * @apiName update
 * @apiGroup admin activity
 *
 * @apiParam {boolean} [isFeatured] 是否是是推荐
 *
 * @apiSuccess {number} id 活动id
 * @apiSuccess {number} enterpriseId 企业id号
 * @apiSuccess {number} cocId 商会id号
 * @apiSuccess {string} title 活动标题
 * @apiSuccess {string} slug SEO信息
 * @apiSuccess {date_iso8601} startTimeAt  起始时间
 * @apiSuccess {date_iso8601} endTimeAt  结束时间
 * @apiSuccess {date_iso8601} signUpEndTimedAt  报名结束时间
 * @apiSuccess {number} express 费用
 * @apiSuccess {number} personnelNumber 限定人数
 * @apiSuccess {string} address 地址
 * @apiSuccess {string} organizers 组织
 * @apiSuccess {string} trafficMode 交通方式
 * @apiSuccess {string} refundInfo 退款说明
 * @apiSuccess {string} specialInfo 特别说明
 * @apiSuccess {string} description 活动内容
 * @apiSuccess {string} flow 跟随
 * @apiSuccess {string="sign-up", "close", "in-process", "ended", "full"} status 活动状态
 * @apiSuccess {number} view 活动点击数
 * @apiSuccess {boolean} isFeatured 是否推荐
 * @apiSuccess {boolean} isActive 是否有效
 * @apiSuccess {boolean} isPublic 是否向游客公开
 * @apiSuccess {date_iso8601} createdAt 数据创建日期
 * @apiSuccess {date_iso8601} updatedAt 数据更新日期
 * @apiSuccess {array} categories 活动分类
 * @apiSuccess {number} applyNumberOfPeople 已经申请的人数
 *
 * @apiSuccess {string} categories.name 分类名称
 *
 */
function update(req, res, next) {
  debug('ENTER update method!');
  return activityRoute.update(req, res, next);
}

function destroy(req, res, next) {
  debug('ENTER destroy method!');
  return activityRoute.destroy(req, res, next);
}

module.exports = {
  index,
  update,
  destroy
};
