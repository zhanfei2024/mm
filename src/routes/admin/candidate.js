// core
const debug = require('debug')('APP:ADMIN_CANDIDATE');

// library
const candidateRoute = require('../../routes/mm/candidate');

/**
 *  @api {get} /admin/candidates 获取申请商会列表
 *  @apiName  index
 *  @apiGroup admin candidate
 *
 *  @apiParam {string} [name] 用户名
 *  @apiParam {string} [account] 用户id或email账号
 *  @apiParam {string} [cocName] 搜索商会名称
 *
 *  @apiSuccess {number} id 申请id
 *  @apiSuccess {number} enterpriseId 公司id
 *  @apiSuccess {number} cocId 商会id
 *  @apiSuccess {number} paymentBalance 交款
 *  @apiSuccess {boolean} statement1 statement1
 *  @apiSuccess {boolean} statement2 statement2
 *  @apiSuccess {boolean} statement3 statement3
 *  @apiSuccess {date_iso8601} applieAt 申请日期
 *  @apiSuccess {string} attachment 附件
 *
 *  @apiSuccess {number} user.id 用户id
 *  @apiSuccess {string} user.lastNmae 名称
 *  @apiSuccess {string} user.first 姓氏
 *  @apiSuccess {string} user.email 用户邮箱
 *
 *  @apiSuccess {number} user.userEducation.id 学历id
 *  @apiSuccess {string='any', 'master', 'post-graduate', 'degree', 'college', 'school-certificate'} user.userEducation.educationLevel 教育程度
 *  @apiSuccess {string} user.userEducation.schoolName 学校名称
 *  @apiSuccess {string} user.userEducation.subject 科目
 *  @apiSuccess {number} user.userEducation.gpa 绩效
 *  @apiSuccess {number} user.userEducation.graduationYear 毕业年限
 *
 *  @apiSuccess {number} user.userExperience.id 经验id
 *  @apiSuccess {string} user.userExperience.companyName 公司名称
 *  @apiSuccess {string} user.userExperience.title  标题
 *  @apiSuccess {date_iso8601} user.userExperience.startedDate 开始时间
 *  @apiSuccess {date_iso8601} user.userExperience.endedDate 结束时间
 *
 *  @apiSuccess {number} coc.id 商会id
 *  @apiSuccess {number} coc.name 商会名称
 *  @apiSuccess {number} coc.logoUrl 商会logo
 *
 *  @apiSuccess {number} group.id 职位id
 *  @apiSuccess {string} group.name 职位名称
 *
 *  @apiSuccess {number} companies.id 用户公司的id
 *  @apiSuccess {string} companies.companyName 用户公司名称
 *
 */
function index(req, res, next) {
  debug('ENTER index method!');

  req.query.role = 'admin';

  return candidateRoute.index(req, res, next);
}



/**
 * @api {get} admin/candidates/:candidateId([0-9]+) 获取申请商会详情
 * @apiName  show
 * @apiGroup admin candidate
 *
 * @apiParam {number} candidateId 申请id
 *
 * @apiSuccess {number} id 申请id
 * @apiSuccess {number} enterpriseId 公司id
 * @apiSuccess {number} cocId 商会id
 * @apiSuccess {number} paymentBalance 交款
 * @apiSuccess {boolean} statement1 statement1
 * @apiSuccess {boolean} statement2 statement2
 * @apiSuccess {boolean} statement3 statement3
 * @apiSuccess {date_iso8601} applieAt 申请日期
 * @apiSuccess {string} attachment 附件
 *
 * @apiSuccess {object} user 用户信息
 * @apiSuccess {number} user.id 用户id
 * @apiSuccess {string} user.lastNmae 名称
 * @apiSuccess {string} user.first 姓氏
 * @apiSuccess {string} user.email 用户邮箱
 *
 * @apiSuccess {number} user.userEducation.id 学历id
 * @apiSuccess {string='any', 'master', 'post-graduate', 'degree', 'college', 'school-certificate'} user.userEducation.educationLevel 教育程度
 * @apiSuccess {string} user.userEducation.schoolName 学校名称
 * @apiSuccess {string} user.userEducation.subject 科目
 * @apiSuccess {number} user.userEducation.gpa 绩效
 * @apiSuccess {number} user.userEducation.graduationYear 毕业年限
 *
 * @apiSuccess {number} user.userExperience.id 经验id
 * @apiSuccess {string} user.userExperience.companyName 公司名称
 * @apiSuccess {string} user.userExperience.title 标题
 * @apiSuccess {date_iso8601} user.userExperience.startedDate 开始时间
 * @apiSuccess {date_iso8601} user.userExperience.endedDate 结束时间
 *
 * @apiSuccess {object} coc 商会信息
 * @apiSuccess {number} coc.id 商会id
 * @apiSuccess {number} coc.name 商会名称
 * @apiSuccess {number} coc.logoUrl 商会logo
 *
 * @apiSuccess {object} group 职位信息
 * @apiSuccess {number} group.id 职位id
 * @apiSuccess {string} group.name 职位名称
 *
 * @apiSuccess {number} companies.id 用户公司的id
 * @apiSuccess {string} companies.companyName 用户公司名称
 */
function show(req, res, next) {
  debug('ENTER show method!');
  return candidateRoute.show(req, res, next);
}


module.exports = {
  index,
  show
};
