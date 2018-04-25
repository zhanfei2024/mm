// core
const debug = require('debug')('APP:ENTERPRISE_MEMBER');

// model

// library
const memberRoute = require('../mm/member');
/**
 * @api {get} /enterprise/enterprises/cocs/:cocId([0-9]+)/members 获取所有正式成员
 * @apiName index
 * @apiGroup enterprise member
 *
 *
 * @apiSuccess {number} id 会员id
 * @apiSuccess {number} enterpriseId 企业id
 * @apiSuccess {number} groupId 职位id
 * @apiSuccess {date} expireDate 到期时间
 *
 * @apiSuccess {number} group.id 职位id
 * @apiSuccess {number} group.cocId 商会id
 * @apiSuccess {string} group.name 职位名称
 * @apiSuccess {number} group.balance 价格
 * @apiSuccess {number} group.timeSpan 有效期限多少个月
 * @apiSuccess {number} group.order 排序
 *
 * @apiSuccess {string} user.id 用户id
 * @apiSuccess {string} user.email 用户邮箱
 *
 * @apiSuccess {string} user.userProfile.IDNumber 证件号码
 * @apiSuccess {string} user.userProfile.name 用户名称
 * @apiSuccess {string} user.userProfile.gender 性别
 * @apiSuccess {string} user.userProfile.phone 电话
 * @apiSuccess {string} user.userProfile.avatar 头像
 * @apiSuccess {number} user.userProfile.age 年龄
 *
 * @apiSuccess {number} user.useerEducation.id 经验Id
 * @apiSuccess {string} user.useerEducation.companyName 公司名称
 * @apiSuccess {string} user.useerEducation.title 标题
 * @apiSuccess {date} user.useerEducation.startDate 开始时间
 * @apiSuccess {date} user.useerEducation.endDate 结束时间
 *
 * @apiSuccess {number} user.userCompany.id 用户公司id
 * @apiSuccess {string} user.userCompany.companyName 公司名
 * @apiSuccess {string} user.userCompany.legalPersonName 法人
 * @apiSuccess {string} user.userCompany.businessNo 经营号
 * @apiSuccess {string} user.userCompany.mobile 电话
 * @apiSuccess {string} user.userCompany.address 地址
 * @apiSuccess {string} user.userCompany.scopeOfOperation 经营范围
 *
 *
 */
function index(req, res, next) {
  debug('ENTER index method!');

  req.query.enterpriseId = res.locals.enterpriseAuth.id;
  req.query.cocId = req.params.cocId;

  return memberRoute.index(req, res, next);
}


/**
 * @api {get} /enterprise/enterprises/cocs/:cocId([0-9]+)/members/:memberId([0-9]+) 详情
 * @apiName show
 * @apiGroup enterprise member
 *
 *
 * @apiSuccess {number} id 会员id
 * @apiSuccess {number} enterpriseId 企业id
 * @apiSuccess {number} groupId 职位id
 * @apiSuccess {date} expireDate 到期时间
 *
 * @apiSuccess {number} group.id 职位id
 * @apiSuccess {number} group.cocId 商会id
 * @apiSuccess {string} group.name 职位名称
 * @apiSuccess {number} group.balance 价格
 * @apiSuccess {number} group.timeSpan 有效期限多少个月
 * @apiSuccess {number} group.order 排序
 *
 * @apiSuccess {string} user.id 用户id
 * @apiSuccess {string} user.email 用户邮箱
 *
 * @apiSuccess {string} user.userProfile.IDNumber 证件号码
 * @apiSuccess {string} user.userProfile.name 用户名称
 * @apiSuccess {string} user.userProfile.gender 性别
 * @apiSuccess {string} user.userProfile.phone 电话
 * @apiSuccess {string} user.userProfile.avatar 头像
 * @apiSuccess {number} user.userProfile.age 年龄
 *
 * @apiSuccess {number} user.useerEducation.id 经验Id
 * @apiSuccess {string} user.useerEducation.companyName 公司名称
 * @apiSuccess {string} user.useerEducation.title 标题
 * @apiSuccess {date} user.useerEducation.startDate 开始时间
 * @apiSuccess {date} user.useerEducation.endDate 结束时间
 *
 * @apiSuccess {number} user.userCompany.id 用户公司id
 * @apiSuccess {string} user.userCompany.companyName 公司名
 * @apiSuccess {string} user.userCompany.legalPersonName 法人
 * @apiSuccess {string} user.userCompany.businessNo 经营号
 * @apiSuccess {string} user.userCompany.mobile 电话
 * @apiSuccess {string} user.userCompany.address 地址
 * @apiSuccess {string} user.userCompany.scopeOfOperation 经营范围
 *
 *
 */
function show(req, res, next) {
  debug('ENTER show method!');

  req.query.enterpriseId = res.locals.enterpriseAuth.id;
  req.query.memberId = req.params.memberId;

  return memberRoute.show(req, res, next);
}

/**
 * @api {put} /enterprise/enterprises/cocs/:cocId([0-9]+)/members/:memberId([0-9]+) 更新正式成员信息
 * @apiName update
 * @apiGroup enterprise member
 *
 * @apiParam {number} [groupId] 职位id
 * @apiParam {date} [expireDate] 到期时间
 *
 * @apiSuccess {number} id 会员id
 * @apiSuccess {number} enterpriseId 企业id
 * @apiSuccess {number} groupId 职位id
 * @apiSuccess {date} expireDate 到期时间
 *
 * @apiSuccess {number} group.id 职位id
 * @apiSuccess {number} group.cocId 商会id
 * @apiSuccess {string} group.name 职位名称
 * @apiSuccess {number} group.balance 价格
 * @apiSuccess {number} group.timeSpan 有效期限多少个月
 * @apiSuccess {number} group.order 排序
 *
 * @apiSuccess {string} user.id 用户id
 * @apiSuccess {string} user.email 用户邮箱
 *
 * @apiSuccess {string} user.userProfile.IDNumber 证件号码
 * @apiSuccess {string} user.userProfile.name 用户名称
 * @apiSuccess {string} user.userProfile.gender 性别
 * @apiSuccess {string} user.userProfile.phone 电话
 * @apiSuccess {string} user.userProfile.avatar 头像
 * @apiSuccess {number} user.userProfile.age 年龄
 *
 * @apiSuccess {number} user.useerEducation.id 经验Id
 * @apiSuccess {string} user.useerEducation.companyName 公司名称
 * @apiSuccess {string} user.useerEducation.title 标题
 * @apiSuccess {date} user.useerEducation.startDate 开始时间
 * @apiSuccess {date} user.useerEducation.endDate 结束时间
 *
 * @apiSuccess {number} user.userCompany.id 用户公司id
 * @apiSuccess {string} user.userCompany.companyName 公司名
 * @apiSuccess {string} user.userCompany.legalPersonName 法人
 * @apiSuccess {string} user.userCompany.businessNo 经营号
 * @apiSuccess {string} user.userCompany.mobile 电话
 * @apiSuccess {string} user.userCompany.address 地址
 * @apiSuccess {string} user.userCompany.scopeOfOperation 经营范围
 *
 *
 */
function update(req, res, next) {
  debug('ENTER update method!');

  req.body.enterpriseId = res.locals.enterpriseAuth.id;
  req.body.cocId = req.params.cocId;
  req.body.memberId = req.params.memberId;
  return memberRoute.update(req, res, next);
}


/**
 * @api {delete} /enterprise/enterprises/cocs/:cocId([0-9]+)/members/:memberId([0-9]+) 删除
 * @apiName destroy
 * @apiGroup enterprise member
 *
 * @apiSuccess {boolean} status 状态
 *
 */
function destroy(req, res, next) {
  debug('ENTER destroy method!');

  req.params.enterpriseId = res.locals.enterpriseAuth.id;

  return memberRoute.destroy(req, res, next);
}


module.exports = {
  index,
  show,
  update,
  destroy,
};
