// core
const debug = require('debug')('APP:ADMIN_CANDIDATE');

// model

// library
const candidateRoute = require('../../routes/mm/candidate');


/**
 *  @api {get} users/candidates  所有申请
 *  @apiName  index
 *  @apiGroup user candidate
 *
 *  @apiParam {number} enterpriseId     公司id
 *  @apiParam {number} cocId     商会id
 *  @apiParam {string="appliy", "invitation"} type 类型
 *  @apiParam {string='pending','success','fail'} status 申请状态
 *  @apiParam {number} userId     用户id
 *  @apiParam {string='user','enterprise,'admin'} role     角色
 *  @apiParam {string} search     搜索内容
 *
 *  @apiSuccess {number} id     申请id
 *  @apiSuccess {number} enterpriseId     公司id
 *  @apiSuccess {number} cocId     商会id
 *  @apiSuccess {number} paymentBalance 交款
 *  @apiSuccess {boolean} statement1 statement1
 *  @apiSuccess {boolean} statement2 statement2
 *  @apiSuccess {boolean} statement3 statement3
 *  @apiSuccess {date} applieAt 申请日期
 *  @apiSuccess {string} attachment 附件
 *
 *  @apiSuccess {number} user.id     用户id
 *  @apiSuccess {string} user.lastNmae     名称
 *  @apiSuccess {string} user.first   姓氏
 *  @apiSuccess {string} user.email     用户邮箱
 *
 *  @apiSuccess {number} user.userEducation.id     学历id
 *  @apiSuccess {string='any', 'master', 'post-graduate', 'degree', 'college', 'school-certificate'} user.userEducation.educationLevel   教育程度
 *  @apiSuccess {string} user.userEducation.schoolName   学校名称
 *  @apiSuccess {string} user.userEducation.subject   科目
 *  @apiSuccess {number} user.userEducation.gpa   绩效
 *  @apiSuccess {number} user.userEducation.graduationYear   毕业年限
 *
 *  @apiSuccess {number} user.userExperience.id  经验id
 *  @apiSuccess {string} user.userExperience.companyName  公司名称
 *  @apiSuccess {string} user.userExperience.title  标题
 *  @apiSuccess {date} user.userExperience.startedDate  开始时间
 *  @apiSuccess {date} user.userExperience.endedDate  结束时间
 *
 *  @apiSuccess {number} coc.id  商会id
 *  @apiSuccess {number} coc.name  商会名称
 *  @apiSuccess {number} coc.logoUrl  商会logo
 *
 *  @apiSuccess {number} group.id 职位id
 *  @apiSuccess {string} group.name 职位名称
 *
 *  @apiSuccess {number} companies.id 用户公司的id
 *  @apiSuccess {string} companies.companyName 用户公司名称
 *
 *
 */
function index(req, res, next) {
  debug('ENTER index method!');

  req.query.userId = res.locals.userAuth.id;
  req.query.role = 'user';

  return candidateRoute.index(req, res, next);
}


/**
 *  @api {get} /users/candidates/:candidateId([0-9]+)  列出一条数据
 *  @apiName  show
 *  @apiGroup user candidate
 *
 *  @apiParam {number} candidateId     申请id
 *
 *  @apiSuccess {number} id     申请id
 *  @apiSuccess {number} enterpriseId     公司id
 *  @apiSuccess {number} cocId     商会id
 *  @apiSuccess {number} paymentBalance 交款
 *  @apiSuccess {boolean} statement1 statement1
 *  @apiSuccess {boolean} statement2 statement2
 *  @apiSuccess {boolean} statement3 statement3
 *  @apiSuccess {date} applieAt 申请日期
 *  @apiSuccess {string} attachment 附件
 *
 *  @apiSuccess {number} user.id     用户id
 *  @apiSuccess {string} user.lastNmae     名称
 *  @apiSuccess {string} user.first   姓氏
 *  @apiSuccess {string} user.email     用户邮箱
 *
 *  @apiSuccess {number} user.userEducation.id     学历id
 *  @apiSuccess {string='any', 'master', 'post-graduate', 'degree', 'college', 'school-certificate'} user.userEducation.educationLevel   教育程度
 *  @apiSuccess {string} user.userEducation.schoolName   学校名称
 *  @apiSuccess {string} user.userEducation.subject   科目
 *  @apiSuccess {number} user.userEducation.gpa   绩效
 *  @apiSuccess {number} user.userEducation.graduationYear   毕业年限
 *
 *  @apiSuccess {number} user.userExperience.id  经验id
 *  @apiSuccess {string} user.userExperience.companyName  公司名称
 *  @apiSuccess {string} user.userExperience.title  标题
 *  @apiSuccess {date} user.userExperience.startedDate  开始时间
 *  @apiSuccess {date} user.userExperience.endedDate  结束时间
 *
 *  @apiSuccess {number} coc.id  商会id
 *  @apiSuccess {number} coc.name  商会名称
 *  @apiSuccess {number} coc.logoUrl  商会logo
 *
 *  @apiSuccess {number} group.id 职位id
 *  @apiSuccess {string} group.name 职位名称
 *
 *  @apiSuccess {number} companies.id 用户公司的id
 *  @apiSuccess {string} companies.companyName 用户公司名称
 *
 *
 */
function show(req, res, next) {
  debug('ENTER show method!');

  req.params.userId = res.locals.userAuth.id;

  return candidateRoute.show(req, res, next);
}

/**
 *  @api {post} users/cocs/:cocId([0-9]+)/candidates/:candidateId([0-9]+)/voucher  上传凭证
 *  @apiName  uploadVoucher
 *  @apiGroup user candidate
 *
 *  @apiParam {number} candidateId     申请id
 *  @apiParam {file} file     上传的凭证
 *
 */
function uploadVoucher(req, res, next) {
  debug('ENTER upload voucher method!');
  return candidateRoute.uploadVoucher(req, res, next);
}

/**
 *  @api {post} /users/cocs/:cocId([0-9]+)/candidates/:candidateId([0-9]+)/email-notice  发送邮件通知商会审核
 *  @apiName  uploadVoucher
 *  @apiGroup user candidate
 *
 *  @apiParam {number} candidateId     申请id
 *
 */
function noticeForEmail(req, res, next) {
  debug('ENTER notice for email method!');

  req.body.candidateId = req.params.candidateId;

  return candidateRoute.noticeForEmail(req, res, next);
}


/**
 * @api {post} users/cocs/:cocId([0-9]+)/candidates  申请加入商会
 * @apiName  uploadVoucher
 * @apiGroup user candidate
 
 * @apiParam {number} groupId     职位id
 * @apiParam {array} companyIds     用户公司id
 * @apiParam {boolean} statement1   条款一
 * @apiParam {boolean} statement2   条款二
 * @apiParam {boolean} statement3   条款三
 * @apiParam {string} description  描述
 * @apiParam {string} remark 预留
 * @apiParam {string} lang 语言
 */
function applyCoc(req, res, next) {
  debug('ENTER applyCoc method!');

  req.body.userId = res.locals.userAuth.id;
  req.body.cocId = req.params.cocId;
  req.body.type = 'appliy';
  req.body.email = res.locals.userAuth.email;

  return candidateRoute.create(req, res, next);
}

module.exports = {
  index,
  show,
  noticeForEmail,
  uploadVoucher,
  applyCoc
};
