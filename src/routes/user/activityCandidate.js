// core
const debug = require('debug')('APP:ACTIVITY_CANDIDATE');

// library
const userCandidateRoute = require('../../routes/mm/activityCandidate');

/**
 * @api {get} /user/users/activities/candidates 会员申请的活动列表
 * @apiName index
 * @apiGroup user activity
 * 
 * @apiParam {string} [search] 搜索字符串
 * @apiParam {string="pendding", "success", "fail"} [status] 申请状态
 * 
 * @apiSuccess {number} id 活动id
 * @apiSuccess {number} enterpriseId 企业id
 * @apiSuccess {number} cocId 商会id
 * @apiSuccess {number} userId 用户id
 * @apiSuccess {string} contact 联系方式
 * @apiSuccess {string} email 电子邮件
 * @apiSuccess {string} phone 手机号
 * @apiSuccess {number} numberOfPeople 申请人数
 * @apiSuccess {string="pendding", "success", "fail"} status 申请状态
 * @apiSuccess {number} paymentBalance 支付费用
 * @apiSuccess {string} applieAt 
 * @apiSuccess {string} attachment 活动附件
 * @apiSuccess {string} description 活动描述
 * @apiSuccess {string} remark 标记
 * 
 * @apiSuccess {number} coc.id cocid
 * @apiSuccess {string} coc.name coc名称
 * @apiSuccess {string} coc.logoUrl coclogo的url
 * 
 * @apiSuccess {number} activities.id 活动id
 * @apiSuccess {number} activities.enterpriseId 企业id
 * @apiSuccess {number} activities.cocId 商会id
 * @apiSuccess {string} activities.title 活动标题
 * @apiSuccess {string} activities.slug SEO信息
 * @apiSuccess {date} activities.startTimedAt 活动开始时间
 * @apiSuccess {date} activities.endTimedAt 活动结束时间
 * @apiSuccess {date} activities.signUpEndTimedAt 活动报名时间
 * @apiSuccess {number} activities.expenses 活动费用
 * @apiSuccess {number} activities.personnelNumber 活动人数
 * @apiSuccess {string} activities.address 活动地址
 * @apiSuccess {string} activities.organizers 活动组织者
 * @apiSuccess {string} activities.trafficMode 交通模式
 * @apiSuccess {string} activities.refundInfo 退款信息
 * @apiSuccess {string} activities.specialInfo 特别说明
 * @apiSuccess {string} activities.description 活动描述
 * @apiSuccess {string} activities.flow 流动
 * @apiSuccess {string="pendding", "success", "fail"} activities.status 活动状态
 * @apiSuccess {boolean} activities.isActive 活动是否有效
 * @apiSuccess {boolean} activities.isPublic 活动示范公开
 * @apiSuccess {boolean} activities.isApproved 活动是否审核通过
 * @apiSuccess {boolean} activities.isFeatured 是否是特殊的
 * @apiSuccess {boolean} activities.isFree 活动是否免费
 * 
 * @apiSuccess {number} user.id 用户id
 * @apiSuccess {string} user.firstName 用户姓氏
 * @apiSuccess {string} user.lastName 用户的名
 */
function index(req, res, next) {
  debug('ENTER index method!');

  req.query.userId = res.locals.userAuth.id;
  return userCandidateRoute.index(req, res, next);
}

/**
 * @api {get} /user/users/activities/:activityId([0-9]+)/candidate/:candidateId([0-9]+) 显示一个申请的活动
 * @apiName show
 * @apiGroup user activity
 * 
 * @apiParam {number} activityId 活动id
 * @apiParam {number} candidateId 活动申请id
 * 
 * @apiSuccess {number} id 活动id
 * @apiSuccess {number} enterpriseId 企业id
 * @apiSuccess {number} cocId 商会id
 * @apiSuccess {number} userId 用户id
 * @apiSuccess {string} contact 联系方式
 * @apiSuccess {string} email 电子邮件
 * @apiSuccess {string} phone 手机号
 * @apiSuccess {number} numberOfPeople 申请人数
 * @apiSuccess {boolean} status 申请状态
 * @apiSuccess {number} paymentBalance 支付费用
 * @apiSuccess {string} applieAt 
 * @apiSuccess {string} attachment 活动附件
 * @apiSuccess {string} description 活动描述
 * @apiSuccess {string} remark 标记
 * 
 * @apiSuccess {number} coc.id cocid
 * @apiSuccess {string} coc.name coc名称
 * @apiSuccess {string} coc.logoUrl coclogo的url
 * 
 * @apiSuccess {number} activities.id 活动id
 * @apiSuccess {number} activities.enterpriseId 企业id
 * @apiSuccess {number} activities.cocId 商会id
 * @apiSuccess {string} activities.title 活动标题
 * @apiSuccess {string} activities.slug SEO信息
 * @apiSuccess {date} activities.startTimedAt 活动开始时间
 * @apiSuccess {date} activities.endTimedAt 活动结束时间
 * @apiSuccess {date} activities.signUpEndTimedAt 活动报名时间
 * @apiSuccess {number} activities.expenses 活动费用
 * @apiSuccess {number} activities.personnelNumber 活动人数
 * @apiSuccess {string} activities.address 活动地址
 * @apiSuccess {string} activities.organizers 活动组织者
 * @apiSuccess {string} activities.trafficMode 交通模式
 * @apiSuccess {string} activities.refundInfo 退款信息
 * @apiSuccess {string} activities.specialInfo 特别说明
 * @apiSuccess {string} activities.description 活动描述
 * @apiSuccess {string} activities.flow 流动
 * @apiSuccess {boolean} activities.status 活动状态
 * @apiSuccess {boolean} activities.isActive 活动是否有效
 * @apiSuccess {boolean} activities.isPublic 活动示范公开
 * @apiSuccess {boolean} activities.isApproved 活动是否审核通过
 * @apiSuccess {boolean} activities.isFeatured 是否是特殊的
 * @apiSuccess {boolean} activities.isFree 活动是否免费
 * 
 * @apiSuccess {number} user.id 用户id
 * @apiSuccess {string} user.firstName 用户姓氏
 * @apiSuccess {string} user.lastName 用户的名
 */
function show(req, res, next) {
  debug('ENTER show method!');

  req.params.userId = res.locals.userAuth.id;

  return userCandidateRoute.show(req, res, next);
}

/**
 * @api {post} /user/users/activities/:activityId([0-9]+)/candidate 用户申请活动
 * @apiName create
 * @apiGroup user activity
 * 
 * @apiParam {number} activityId 活动id
 * @apiParam {string{..255}} contact 会员的联系地址
 * @apiParam {string{..255}} phone 会员的手机号
 * @apiParam {number} numberOfPeople 报名的人数
 * @apiParam {string} [description] 描述
 * @apiParam {string} [remark] 标记
 * @apiParam {string} [lang] 语言
 * 
 * @apiSuccess {number} id 活动id
 * @apiSuccess {number} enterpriseId 企业id
 * @apiSuccess {number} cocId 商会id
 * @apiSuccess {number} userId 用户id
 * @apiSuccess {string} contact 联系方式
 * @apiSuccess {string} email 电子邮件
 * @apiSuccess {string} phone 手机号
 * @apiSuccess {number} numberOfPeople 申请人数
 * @apiSuccess {boolean} status 申请状态
 * @apiSuccess {number} paymentBalance 支付费用
 * @apiSuccess {string} applieAt 
 * @apiSuccess {string} attachment 活动附件
 * @apiSuccess {string} description 活动描述
 * @apiSuccess {string} remark 标记
 * 
 * @apiSuccess {number} coc.id cocid
 * @apiSuccess {string} coc.name coc名称
 * @apiSuccess {string} coc.logoUrl coclogo的url
 * 
 * @apiSuccess {number} activities.id 活动id
 * @apiSuccess {number} activities.enterpriseId 企业id
 * @apiSuccess {number} activities.cocId 商会id
 * @apiSuccess {string} activities.title 活动标题
 * @apiSuccess {string} activities.slug SEO信息
 * @apiSuccess {date} activities.startTimedAt 活动开始时间
 * @apiSuccess {date} activities.endTimedAt 活动结束时间
 * @apiSuccess {date} activities.signUpEndTimedAt 活动报名时间
 * @apiSuccess {number} activities.expenses 活动费用
 * @apiSuccess {number} activities.personnelNumber 活动人数
 * @apiSuccess {string} activities.address 活动地址
 * @apiSuccess {string} activities.organizers 活动组织者
 * @apiSuccess {string} activities.trafficMode 交通模式
 * @apiSuccess {string} activities.refundInfo 退款信息
 * @apiSuccess {string} activities.specialInfo 特别说明
 * @apiSuccess {string} activities.description 活动描述
 * @apiSuccess {string} activities.flow 流动
 * @apiSuccess {boolean} activities.status 活动状态
 * @apiSuccess {boolean} activities.isActive 活动是否有效
 * @apiSuccess {boolean} activities.isPublic 活动示范公开
 * @apiSuccess {boolean} activities.isApproved 活动是否审核通过
 * @apiSuccess {boolean} activities.isFeatured 是否是特殊的
 * @apiSuccess {boolean} activities.isFree 活动是否免费
 * 
 * @apiSuccess {number} user.id 用户id
 * @apiSuccess {string} user.firstName 用户姓氏
 * @apiSuccess {string} user.lastName 用户的名
 */
function create(req, res, next) {
  debug('ENTER create method!');

  req.body.userId = res.locals.userAuth.id;
  req.body.activityId = req.params.activityId;
  req.body.email = res.locals.userAuth.email;

  return userCandidateRoute.create(req, res, next);
}

/**
 * @api {post} /user/users/activities/:activityId([0-9]+)/candidates/:candidateId([0-9]+)/notice-email 提醒Enterprise审核用户的申请
 * @apiName noticeForEmail
 * @apiGroup user activity
 * 
 * @apiParam {number} candidateId 活动id
 * @apiParam {number} content 候选人id
 * @apiParam {string="en","hk","cn"} [lang] 语言
 * 
 * @apiSuccess {boolean} status 是否发送成功
 */
function noticeForEmail(req, res, next) {
  debug('ENTER notice For Email method!');

  req.body.userId = res.locals.userAuth.id;
  return userCandidateRoute.noticeForEmail(req, res, next);
}

/**
 * @api {post} /user/users/activities/:activityId([0-9]+)/candidates/:candidateId([0-9]+)/upload-voucher 上传转账的凭证
 * @apiName uploadVoucher
 * @apiGroup user activity
 * 
 * @apiParam {file} file 文件
 * 
 * @apiSuccess {string="pending", "success", "faild"} status 状态
 * @apiSuccess {number} paymentBalance 支付费用
 * @apiSuccess {number} numberOfPeople 报名人数
 */
function uploadVoucher(req, res, next) {
  debug('ENTER upload voucher method!');

  req.params.userId = res.locals.userAuth.id;

  return userCandidateRoute.uploadVoucher(req, res, next);
}

/**
 * @api {get} /user/users/activities/:activityId([0-9]+)/is-joined 是否参加了获取
 * @apiName isJoined
 * @apiGroup user activity
 * 
 * @apiParam {number} activityId 活动id
 * 
 * @apiSuccess {string="true", "false", "applying"} true:已申请,false:未申请或申请失败,applying:正在申请中
 */
function isJoined(req, res, next) {
  debug('ENTER isJoined method!');

  req.query.activityId = req.params.activityId;
  req.query.userId = res.locals.userAuth.id;

  return userCandidateRoute.isJoined(req, res, next);
}

module.exports = {
  index,
  show,
  create,
  uploadVoucher,
  noticeForEmail,
  isJoined
};
