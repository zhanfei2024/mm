// core
const debug = require('debug')('APP:ADMIN_INVITATION');

// library
const invitationRoute = require('../../routes/mm/candidate');

/**
 *  @api {get} /enterprises/cocs/:cocId([0-9]+)/invitations  所有邀请
 *  @apiName  index
 *  @apiGroup enterprise invitation
 *
 *  @apiParam {number} cocId     商会id
 *  @apiParam {string='pending','success','fail'} status 邀请状态
 *  @apiParam {number} userId     用户id
 *  @apiParam {string='user','enterprise,'admin'} role     角色
 *  @apiParam {string} search     搜索内容
 *
 *  @apiSuccess {number} id     邀请id
 *  @apiSuccess {number} enterpriseId     公司id
 *  @apiSuccess {number} cocId     商会id
 *  @apiSuccess {number} paymentBalance 交款
 *  @apiSuccess {boolean} statement1 statement1
 *  @apiSuccess {boolean} statement2 statement2
 *  @apiSuccess {boolean} statement3 statement3
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
function index(req, res, next) {
    debug('ENTER index method!');

    req.body.enterpriseId = res.locals.enterpriseAuth.id;

    return invitationRoute.index(req, res, next);
}

/**
 *  @api {get} /enterprises/cocs/:cocId([0-9]+)/invitations/:invitationId([0-9]+)  列出一条数据
 *  @apiName  show
 *  @apiGroup enterprise invitation
 *
 *  @apiParam {number} cocId
 *  @apiParam {number} invitationId     邀请id
 *
 *  @apiSuccess {number} id     邀请id
 *  @apiSuccess {number} enterpriseId     公司id
 *  @apiSuccess {number} cocId     商会id
 *  @apiSuccess {number} paymentBalance 交款
 *  @apiSuccess {boolean} statement1 statement1
 *  @apiSuccess {boolean} statement2 statement2
 *  @apiSuccess {boolean} statement3 statement3
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

    req.body.enterpriseId = res.locals.enterpriseAuth.id;
    req.params.candidateId = req.params.invitationId;

    return invitationRoute.show(req, res, next);
}

/**
 *  @api {post} enterprises/cocs/:cocId([0-9]+)/invitations  邀请
 *  @apiName  create
 *  @apiGroup enterprise invitation
 *
 *  @apiParam {string} name 姓名
 *  @apiParam {string} email 电子邮件
 *  @apiParam {string} phone 手机号
 *  @apiParam {number} groupId 职位id
 *  @apiParam {string='en', 'hk', 'cn'} [lang] 语言
 *
 *  @apiSuccess {number} id     邀请id
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
function create(req, res, next) {
    debug('ENTER create method!');

    req.body.enterpriseId = res.locals.enterpriseAuth.id;
    req.body.cocId = req.params.cocId;
    req.body.type = 'invitation';
    req.body.status = 'pending';

    return invitationRoute.create(req, res, next);
}

module.exports = {
    index,
    show,
    create
};
