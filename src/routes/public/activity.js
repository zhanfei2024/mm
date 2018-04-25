// core
const debug = require('debug')('APP:ACTIVITY');

// library
const activityRoute = require('../../routes/mm/activity');
const _ = require('lodash');

/**
 * @api {get} /public/activities 活动列表
 * @apiName index
 * @apiGroup public activity
 *
 * @apiParam {number} [cocId] 商会id
 * @apiParam {array} [categoryIds] 活动分类
 * @apiParam {string="sign-up", "close", "in-process", "ended", "full"} [status] 活动状态
 * @apiParam {boolean} [isFree] 活动是否免费
 * @apiParam {date_iso8601} [startTimedAt] 活动开始时间
 * @apiParam {date_iso8601} [endTimedAt] 活动结束时间
 * @apiParam {string="featured", "newest"} [sorting] 排序字段
 * @apiParam {string} [search] 要搜索字符串
 *
 * @apiSuccess {number} id 活动id
 * @apiSuccess {number} enterprisehId 企业id
 * @apiSuccess {number} cocId 商会id
 * @apiSuccess {string} title 活动标题
 * @apiSuccess {string} slug SEO
 * @apiSuccess {date_iso8601} startTimedAt 活动开始时间
 * @apiSuccess {date_iso8601} endTimedAt 活动结束时间
 * @apiSuccess {date_iso8601} signUpEndTimedAt 活动报名截止时间
 * @apiSuccess {number} expenses 活动费用
 * @apiSuccess {number} personnelNumber 活动人数上限
 * @apiSuccess {string} address 活动地址
 * @apiSuccess {string} organizers 活动组织者
 * @apiSuccess {string} trafficMode 活动方式
 * @apiSuccess {string} refundInfo 退款信息
 * @apiSuccess {string} specialInfo 活动特殊说说明
 * @apiSuccess {string} description 活动描述
 * @apiSuccess {string} flow 流动
 * @apiParam {string="sign-up", "close", "in-process", "ended", "full"} [status] 活动状态
 * @apiSuccess {number} view 活动点击数
 * @apiSuccess {boolean} isActive 活动是否有效
 * @apiSuccess {boolean} isPublic 活动是否公开
 * @apiSuccess {boolean} isApproved 活动是否被准许
 * @apiSuccess {boolean} isFeatured 是否是特殊的
 * @apiSuccess {boolean} isFree 活动是否免费
 * @apiSuccess {number} applyNumberOfPeople 活动申请人数
 * @apiSuccess {date_iso8601} createdAt 数据创建时间
 * @apiSuccess {date_iso8601} updatedAt 数据更新时间
 * @apiSuccess {array} candidates 候选人列表
 * @apiSuccess {number} candidates.id 获选人id
 * @apiSuccess {number} candidates.enterpriseId 企业id
 * @apiSuccess {number} candidates.cocId 商会id
 * @apiSuccess {number} candidates.activityId 活动id
 * @apiSuccess {number} candidates.userId 用户id
 * @apiSuccess {string} candidates.contact 用户联系方式
 * @apiSuccess {string} candidates.email 用户电子邮件
 * @apiSuccess {string} candidates.phone 用户手机号
 * @apiSuccess {number} candidates.numberOfPeople 用户申请的人数
 * @apiSuccess {string} candidates.status 候选人状态
 * @apiSuccess {number} candidates.paymentBalance 候选人支付的费用
 * @apiSuccess {date_iso8601} candidates.applieAt 申请的时间
 *
 * @apiSuccess {string} categories.name 分类名称
 *
 */
function indexActivities(req, res, next) {
  debug('ENTER index method!');

  //delete req.query.isApproved;
  delete req.query.isActive;
  if (_.isNil(req.query.cocId)) {
    req.query.isPublic = true;
    req.query.isApproved = true;
  }

  return activityRoute.index(req, res, next);
}

/**
 * @api {get} /public/activities/:activityId([0-9]+) 获取活动详情
 * @apiName show
 * @apiGroup public activity
 *
 * @apiParam {number} activityId 活动id
 *
 * @apiSuccess {number} id 活动id
 * @apiSuccess {number} enterprisehId 企业id
 * @apiSuccess {number} cocId 商会id
 * @apiSuccess {string} title 活动标题
 * @apiSuccess {string} slug SEO
 * @apiSuccess {date_iso8601} startTimedAt 活动开始时间
 * @apiSuccess {date_iso8601} endTimedAt 活动结束时间
 * @apiSuccess {date_iso8601} signUpEndTimedAt 活动报名截止时间
 * @apiSuccess {number} expenses 活动费用
 * @apiSuccess {number} personnelNumber 活动人数上限
 * @apiSuccess {string} address 活动地址
 * @apiSuccess {string} organizers 活动组织者
 * @apiSuccess {string} trafficMode 活动方式
 * @apiSuccess {string} refundInfo 退款信息
 * @apiSuccess {string} specialInfo 活动特殊说说明
 * @apiSuccess {string} description 活动描述
 * @apiSuccess {string} flow 流动
 * @apiParam {string="sign-up", "close", "in-process", "ended", "full"} [status] 活动状态
 * @apiSuccess {number} view 活动点击数
 * @apiSuccess {boolean} isActive 活动是否有效
 * @apiSuccess {boolean} isPublic 活动是否公开
 * @apiSuccess {boolean} isApproved 活动是否被准许
 * @apiSuccess {boolean} isFeatured 是否是特殊的
 * @apiSuccess {boolean} isFree 活动是否免费
 * @apiSuccess {number} applyNumberOfPeople 活动申请人数
 * @apiSuccess {date_iso8601} createdAt 数据创建时间
 * @apiSuccess {date_iso8601} updatedAt 数据更新时间
 * @apiSuccess {array} candidates 候选人列表
 * @apiSuccess {number} candidates.id 获选人id
 * @apiSuccess {number} candidates.enterpriseId 企业id
 * @apiSuccess {number} candidates.cocId 商会id
 * @apiSuccess {number} candidates.activityId 活动id
 * @apiSuccess {number} candidates.userId 用户id
 * @apiSuccess {string} candidates.contact 用户联系方式
 * @apiSuccess {string} candidates.email 用户电子邮件
 * @apiSuccess {string} candidates.phone 用户手机号
 * @apiSuccess {number} candidates.numberOfPeople 用户申请的人数
 * @apiSuccess {string} candidates.status 候选人状态
 * @apiSuccess {number} candidates.paymentBalance 候选人支付的费用
 * @apiSuccess {date_iso8601} candidates.applieAt 申请的时间
 *
 * @apiSuccess {string} categories.name 分类名称
 *
 */
function showActivitie(req, res, next) {
  debug('ENTER show method!');

  req.params.isPublic = true;
  req.params.clicked = true;

  return activityRoute.show(req, res, next);
}

module.exports = {
  indexActivities,
  showActivitie
};
