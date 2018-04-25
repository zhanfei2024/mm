const debug = require('debug')("APP:Eterprise_Candidate");

const enterpriseCandidateRoute = require('../mm/candidate');

/**
 *  @api {get} /enterprise/enterprises/cocs/:cocId([0-9]+)/candidates 列出所有candidate内容
 *  @apiName index
 *  @apiGroup  enterprise candidate
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
 *  @apiSuccess {number} user.companies.id 用户公司的id
 *  @apiSuccess {string} user.companies.companyName 用户公司名称
 *
 *  @apiSuccess {number} coc.id  商会id
 *  @apiSuccess {number} coc.name  商会名称
 *  @apiSuccess {number} coc.logoUrl  商会logo
 *
 *  @apiSuccess {number} group.id 职位id
 *  @apiSuccess {string} group.name 职位名称
 *
 */
function index(req, res, next) {
  debug('Enter index method!');

  req.query.cocId = req.params.cocId;
  return  enterpriseCandidateRoute.index(req, res, next);
}


/**
 *  @api {get} /enterprise/enterprises/cocs/:cocId([0-9]+)/candidates/:candidateId([0-9]+) 详情
 *  @apiName show
 *  @apiGroup  enterprise candidate
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
 */
function show(req, res, next) {
  debug('Enter show method!');

  return enterpriseCandidateRoute.show(req, res, next);
}

module.exports = {
  index,
  show
};
