// core
const debug = require('debug')('APP:ACTIVITY');

// library
const activityRoute = require('../../routes/mm/activity');

/**
 * @api {get} /enterprise/enterprises/cocs/:cocId([0-9])/activities 获取活动列表
 * @apiName index
 * @apiGroup enterprise coc activity
 *
 * @apiParam {string} [search] 搜索字符串
 * @apiParam {number} [enterpriseId] 公司id号
 * @apiParam {number} [cocId] 商会id号
 * @apiParam {array} [categoryIds] 分类
 * @apiParam {string="featured", "newest"} [sorting] 排序字段
 * @apiParam {string} [search] 搜索字符串
 * @apiParam {boolean} [isActive] 是否有效
 * @apiParam {boolean} [isPublic] 是否公开(游客看不见非公开活动)
 *
 * @apiSuccess {number} id 活动id
 * @apiSuccess {number} enterprisehId 企业id
 * @apiSuccess {number} cocId 商会id
 * @apiSuccess {string} title 活动标题
 * @apiSuccess {string} slug SEO信息
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
 * @apiSuccess {string} status 活动状态
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
 * @apiSuccess {string} candidates.attachment 上传的附件
 * @apiSuccess {string} candidates.description 描述
 * @apiSuccess {string} candidates.remark 标记
 *
 * @apiSuccess {string} categories.name 分类名称
 *
 */
function index(req, res, next) {
  debug('ENTER index method!');

  req.query.enterpriseId = res.locals.enterpriseAuth.id;
  req.query.cocId = req.params.cocId;
  return activityRoute.index(req, res, next);
}

/**
 * @api {get} /enterprise/enterprises/cocs/:cocId([0-9])/activities/:activityId([0-9]+) 获取指定活动信息
 * @apiName show
 * @apiGroup enterprise coc activity
 *
 * @apiParam {number} activityId 活动id
 * @apiParam {number} [cocId] 商会id
 * @apiParam {number} [enterpriseId] 企业id
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
 * @apiSuccess {string} status 活动状态
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
function show(req, res, next) {
  debug('ENTER show method!');

  req.params.enterpriseId = res.locals.enterpriseAuth.id;

  return activityRoute.show(req, res, next);
}

/**
 * @api {post} /enterprise/enterprises/cocs/:cocId([0-9])/activities 创建活动
 * @apiName create
 * @apiGroup enterprise coc activity
 *
 * @apiParam {number} enterprisehId 企业id
 * @apiParam {number} cocId 商会id
 * @apiParam {string} title 活动标题
 * @apiParam {string} slug SEO
 * @apiParam {date_iso8601} startTimedAt 活动开始时间
 * @apiParam {date_iso8601} endTimedAt 活动结束时间
 * @apiParam {date_iso8601} signUpEndTimedAt 活动报名截止时间
 * @apiParam {number} expenses 活动费用
 * @apiParam {number} personnelNumber 活动人数上限
 * @apiParam {string} address 活动地址
 * @apiParam {string} organizers 活动组织者
 * @apiParam {string} trafficMode 活动方式
 * @apiParam {string} refundInfo 退款信息
 * @apiParam {string} specialInfo 活动特殊说说明
 * @apiParam {string} description 活动描述
 * @apiParam {string} flow 流动
 * @apiParam {string} status 活动状态
 * @apiParam {number} view 活动点击数
 * @apiParam {boolean} isActive 活动是否有效
 * @apiParam {boolean} isPublic 活动是否公开
 * @apiParam {boolean} isApproved 活动是否被准许
 * @apiParam {boolean} isFeatured 是否是特殊的
 * @apiParam {boolean} isFree 活动是否免费
 * @apiParam {number} applyNumberOfPeople 活动申请人数
 * @apiParam {date_iso8601} createdAt 数据创建时间
 * @apiParam {date_iso8601} updatedAt 数据更新时间
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
 * @apiSuccess {string} status 活动状态
 * @apiSuccess {number} view 活动点击数
 * @apiSuccess {boolean} isActive 活动是否有效
 * @apiSuccess {boolean} isPublic 活动是否公开
 * @apiSuccess {boolean} isApproved 活动是否被准许
 * @apiSuccess {boolean} isFeatured 是否是特殊的
 * @apiSuccess {boolean} isFree 活动是否免费
 * @apiSuccess {number} applyNumberOfPeople 活动申请人数
 * @apiSuccess {date_iso8601} createdAt 数据创建时间
 * @apiSuccess {date_iso8601} updatedAt 数据更新时间
 *
 * @apiSuccess {string} categories.name 分类名称
 *
 */
function create(req, res, next) {
  debug('ENTER create method!');

  req.body.enterpriseId = res.locals.enterpriseAuth.id;
  req.body.cocId = req.params.cocId;
  req.body.applyNumberOfPeople = 0;
  return activityRoute.create(req, res, next);
}

/**
 * @api {put} /enterprise/enterprises/cocs/:cocId([0-9])/activities/:activityId([0-9]+) 修改活动信息
 * @apiName update
 * @apiGroup enterprise coc activity
 *
 * @apiParam {number} [activityId] 活动id
 * @apiParam {string} [title] 活动标题
 * @apiParam {string} [slug] SEO
 * @apiParam {date_iso8601} [startTimedAt] 活动开始时间
 * @apiParam {date_iso8601} [endTimedAt] 活动结束时间
 * @apiParam {date_iso8601} [signUpEndTimedAt] 活动报名截止时间
 * @apiParam {number} [expenses] 活动费用
 * @apiParam {number} [personnelNumber] 活动人数上限
 * @apiParam {string} [address] 活动地址
 * @apiParam {string} [organizers] 活动组织者
 * @apiParam {string} [trafficMode] 活动方式
 * @apiParam {string} [refundInfo] 退款说明
 * @apiParam {string} [specialInfo] 活动特殊说说明
 * @apiParam {string} [description] 活动描述
 * @apiParam {string} [flow] 流动
 * @apiParam {string} [status] 活动状态
 * @apiParam {number} [view] 活动点击数
 * @apiParam {boolean} [isActive] 活动是否有效
 * @apiParam {boolean} [isPublic] 活动是否公开
 * @apiParam {boolean} [isApproved] 活动是否被准许
 * @apiParam {boolean} [isFeatured] 是否是特殊的
 * @apiParam {boolean} [isFree] 活动是否免费
 * @apiParam {number} [applyNumberOfPeople] 活动申请人数
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
 * @apiSuccess {string} status 活动状态
 * @apiSuccess {number} view 活动点击数
 * @apiSuccess {boolean} isActive 活动是否有效
 * @apiSuccess {boolean} isPublic 活动是否公开
 * @apiSuccess {boolean} isFeatured 是否特殊
 * @apiSuccess {boolean} isFree 活动是否免费
 * @apiSuccess {number} applyNumberOfPeople 活动申请人数
 *
 * @apiSuccess {string} categories.name 分类名称
 *
 */
function update(req, res, next) {
  debug('ENTER update method!');

  delete req.body.isApproved;
  req.body.cocId = req.params.cocId;
  req.body.enterpriseId = res.locals.enterpriseAuth.id;

  return activityRoute.update(req, res, next);
}

/**
 * @api {delete} /enterprise/enterprises/cocs/:cocId([0-9])/activities/:activityId([0-9]+) 删除活动
 * @apiName destroy
 * @apiGroup enterprise coc activity
 *
 * @apiParam {number} activityId 活动id
 *
 * @apiSuccess {boolean} status 是否删除成功
 */
function destroy(req, res, next) {
  debug('ENTER destroy method!');

  req.params.enterpriseId = res.locals.enterpriseAuth.id;

  return activityRoute.destroy(req, res, next);
}

module.exports = {
  index,
  show,
  create,
  update,
  destroy
};
