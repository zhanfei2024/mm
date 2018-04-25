// core
const debug = require('debug')('APP:USER_EXPERIENCE');

// library
const userExperienceRoute = require('../mm/userExperience');

/**
 *  @api {get} /user/users/experience    获取用户所有工作经验
 *  @apiName  index
 *  @apiGroup user experience
 *
 *  @apiSuccess {Number} id  用户经验的id号
 *  @apiSuccess {Number} userId   用户的id号
 *  @apiSuccess {String} companyName  公司名
 *  @apiSuccess {Number} title  标题
 *  @apiSuccess {Date} startedDate  开始日期
 *  @apiSuccess {Date} endedDate  user 结束日期
 *  @apiSuccess {String}  description  工作内容
 *  @apiSuccess {String}  remark   评论
 *  @apiSuccess {Date}  createdAt     创建日期
 *  @apiSuccess {Date}  updatedAt     更新日期
 *
 */
function index(req, res, next) {
  debug('ENTER index method!');

  req.query.userId = res.locals.userAuth.id;

  return userExperienceRoute.index(req, res, next);
}

/**
 *  @api {get} /user/users/experience 获取一条用户经验信息
 *  @apiName  show
 *  @apiGroup user experience
 *
 *  @apiSuccess {Number} id  用户经验的id号
 *  @apiSuccess {Number} userId   用户的id号
 *  @apiSuccess {String} companyName  公司名
 *  @apiSuccess {Number} title  标题
 *  @apiSuccess {Date} startedDate  开始日期
 *  @apiSuccess {Date} endedDate  user 结束日期
 *  @apiSuccess {String}  description  工作内容
 *  @apiSuccess {String}  remark   评论
 *  @apiSuccess {Date}  createdAt     创建日期
 *  @apiSuccess {Date}  updatedAt     更新日期
 */
function show(req, res, next) {
  debug('ENTER show method!');

  req.params.userId = res.locals.userAuth.id;
  
  return userExperienceRoute.show(req, res, next);
}

/**
 *  @api {post} /user/users/experience/experienceId  创建工作经验
 *  @apiName  create
 *  @apiGroup user experience
 *

 *  @apiSuccess {String} companyName  公司名
 *  @apiSuccess {Number} title  标题
 *  @apiSuccess {Date} startedDate  开始日期
 *  @apiSuccess {Date} endedDate  user 结束日期
 *  @apiSuccess {String}  description  工作内容
 *  @apiSuccess {String}  remark   评论
 *  @apiSuccess {Date}  createdAt     创建日期
 *  @apiSuccess {Date}  updatedAt     更新日期

 *
 *  @apiSuccess {Number} id  用户经验的id号
 *  @apiSuccess {Number} userId   用户的id号
 *  @apiSuccess {String} companyName  公司名
 *  @apiSuccess {Number} title  标题
 *  @apiSuccess {Date} startedDate  开始日期
 *  @apiSuccess {Date} endedDate  user 结束日期
 *  @apiSuccess {String}  description  工作内容
 *  @apiSuccess {String}  remark   评论
 *  @apiSuccess {Date}  createdAt     创建日期
 *  @apiSuccess {Date}  updatedAt     更新日期
 *
 */
function create(req, res, next) {
  debug('ENTER create method!');
  
  req.body.userId = res.locals.userAuth.id;
  
  return userExperienceRoute.create(req, res, next);
}

/**
 *  @api {put} /user/users/experience/experienceId([0-9]+) 修改用户的工作经验
 *  @apiName  update
 *  @apiGroup user experience
 *
 *  @apiSuccess {Number} id  用户经验的id号
 *  @apiSuccess {String} companyName  公司名
 *  @apiSuccess {Number} title  标题
 *  @apiSuccess {Date} startedDate  开始日期
 *  @apiSuccess {Date} endedDate  user 结束日期
 *  @apiSuccess {String}  description  工作内容
 *  @apiSuccess {string} opsition 职位
 *  @apiSuccess {String}  remark   评论
 *
 *
 *  @apiSuccess {Number} id  用户经验的id号
 *  @apiSuccess {Number} userId   用户的id号
 *  @apiSuccess {String} companyName  公司名
 *  @apiSuccess {Number} title  标题
 *  @apiSuccess {Date} startedDate  开始日期
 *  @apiSuccess {Date} endedDate  user 结束日期
 *  @apiSuccess {String}  description  工作内容
 *  @apiSuccess {String}  remark   评论
 *  @apiSuccess {string}  position 职位
 *  @apiSuccess {Date}  createdAt     创建日期
 *  @apiSuccess {Date}  updatedAt     更新日期
 *
 */
function update(req, res, next) {
  debug('ENTER update method!');
  
  req.body.userId = res.locals.userAuth.id;
  req.body.experienceId = req.params.experienceId;

  return userExperienceRoute.update(req, res, next);
}

/**
 *  @api {delete} /user/users/experience/experienceId([0-9]+) 删除一条用户工作经验
 *  @apiName  destroy
 *  @apiGroup user experience
 *
 *  @apiParam  {Number} experienceId 用户经验的id号
 *
 *  @apiSuccess {Boolean} status 是否删除成功
 */
function destroy(req, res, next){
  debug('ENTER destroy method!');
  
  req.params.userId = res.locals.userAuth.id;

  return userExperienceRoute.destroy(req, res, next);
}

module.exports = {
  show,
  create,
  index,
  update,
  destroy
};
