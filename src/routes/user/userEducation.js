// core
const debug = require('debug')('APP:USER_Education');

// model

// library
const userRoute = require('../mm/userEducation');



/**
 *  @api {get} user/users/user-education 列出该用户所有学历
 *  @apiName  index
 *  @apiGroup user education
 *
 *  @apiSuccess {Number} id  用户学历的id号
 *  @apiSuccess {Nubber} userId  用户id
 *  @apiSuccess {string='any', 'master', 'post-graduate', 'degree', 'college', 'school-certificate'} educationLevel  学历级别
 *  @apiSuccess {string} schoolName  学校名
 *  @apiSuccess {string} subject  专业
 *  @apiSuccess {String}  gpa  gpa
 *  @apiSuccess {Nubber}  graduationYear   学年
 *  @apiSuccess {string} description  在校经历
 *  @apiSuccess {string}  remark 标签
 *
 *
 */
function index(req, res, next){
  debug('ENTER index method!');

  req.query.userId = res.locals.userAuth.id;
  return userRoute.index(req, res, next);
}



/**
 *  @api {get} user/users/user-education/:userEducationId([0-9]+) 列出一条
 *  @apiName  show
 *  @apiGroup user education
 *
 *  @apiParam {Number} userId 用户id
 *
 *  @apiSuccess {Number} id  用户学历的id号
 *  @apiSuccess {Nubber} userId  用户id
 *  @apiSuccess {string='any', 'master', 'post-graduate', 'degree', 'college', 'school-certificate'} educationLevel  学历级别
 *  @apiSuccess {string} schoolName  学校名
 *  @apiSuccess {string} subject  专业
 *  @apiSuccess {String}  gpa  gpa
 *  @apiSuccess {Nubber}  graduationYear   学年
 *  @apiSuccess {string}  description  在校经历
 *  @apiSuccess {string}   remark   标签
 *
 *
 */
function show(req, res, next) {
  debug('ENTER show method!');
  if (!req.params.userId) {
    req.params.userId = res.locals.userAuth.id;
  }
  return userRoute.show(req, res, next);
}

/**
 *  @api {post} user/users/user-education 创建
 *  @apiName  create
 *  @apiGroup user education
 *
 *  @apiParam {Number} userId 用户id
 *  @apiParam {Number} id  用户学历的id号
 *  @apiParam {Nubber} userId  用户id
 *  @apiParam {string='any', 'master', 'post-graduate', 'degree', 'college', 'school-certificate'} educationLevel  学历级别
 *  @apiParam {string} schoolName  学校名
 *  @apiParam {string} subject  专业
 *  @apiParam {String}  gpa  gpa
 *  @apiParam {Nubber}  graduationYear   学年
 *  @apiParam {string}  description  在校经历
 *  @apiParam {string}  remark   标签
 *
 *  @apiSuccess {Number} id  用户学历的id号
 *  @apiSuccess {Nubber} userId  用户id
 *  @apiSuccess {string='any', 'master', 'post-graduate', 'degree', 'college', 'school-certificate'} educationLevel  学历级别
 *  @apiSuccess {string} schoolName  学校名
 *  @apiSuccess {string} subject  专业
 *  @apiSuccess {String}  gpa  gpa
 *  @apiSuccess {Nubber}  graduationYear   学年
 *  @apiSuccess {string}  description  在校经历
 *  @apiSuccess {string}  remark 标签
 *
 *
 */
function create(req, res, next){
  debug('ENTER show method!');
  if (!req.body.userId) {
    req.body.userId = res.locals.userAuth.id;
  }
  return userRoute.create(req, res, next);
}


/**
 *  @api {put} user/users/user-education/:userEducationId([0-9]+) 更新
 *  @apiName  update
 *  @apiGroup user education
 *
 *  @apiParam {string='any', 'master', 'post-graduate', 'degree', 'college', 'school-certificate'} [educationLevel]  学历级别
 *  @apiParam {string} [schoolName]  学校名
 *  @apiParam {string} [subject]  专业
 *  @apiParam {String}  [gpa]  gpa
 *  @apiParam {Nubber}  [graduationYear]   学年
 *  @apiParam {string}  [description]  在校经历
 *  @apiParam {string}   [remark]   标签
 *
 *  @apiSuccess {Number} id  用户学历的id号
 *  @apiSuccess {Nubber} userId  用户id
 *  @apiSuccess {string='any', 'master', 'post-graduate', 'degree', 'college', 'school-certificate'} educationLevel  学历级别
 *  @apiSuccess {string} schoolName  学校名
 *  @apiSuccess {string} subject  专业
 *  @apiSuccess {String}  gpa  gpa
 *  @apiSuccess {Nubber}  graduationYear   学年
 *  @apiSuccess {string}  description  在校经历
 *  @apiSuccess {string}  remark 标签
 *
 *
 */
function update(req, res, next) {
  debug('ENTER update method!');
  req.body.userId = res.locals.userAuth.id;
  req.body.userEducationId = req.params.userEducationId;
  return userRoute.update(req, res, next);
}


/**
 *  @api {delete} user/users/user-education/:userEducationId([0-9]+) 删除
 *  @apiName  destroy
 *  @apiGroup user education
 *
 *
 */
function destroy(req, res, next) {

  return userRoute.destroy(req, res, next);
}

module.exports = {
  index,
  show,
  create,
  update,
  destroy
};
