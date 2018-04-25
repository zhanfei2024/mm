// core
const debug = require('debug')('APP:USER_COC');

// model

// library
const userMemberRoute = require('../../routes/mm/member');
const userCocRoute = require('../../routes/mm/coc');

/**
 * @api {get} /user/users/cocs 用户加入的商会列表
 * @apiName index
 * @apiGroup user coc
 * 
 * @apiSuccess {number} id
 */
function index(req, res, next) {
  debug('ENTER index method!');
  
  req.query.userId = res.locals.userAuth.id;
  req.params.isUser = true;

  return userMemberRoute.index(req, res, next);
}

/**
 * @api {get} /user/users/cocs/:cocId([0-9]+)/is-coc-member 是否是商会成员状态判断
 * @apiName isCocMember
 * @apiGroup user coc
 * 
 * @apiParam {number} cocId 商会id
 * 
 * @apiSuccess {string="true", "applying", "invited", "false"} status  状态:已是成员,申请中,已被邀请,不是成员
 */
function isCocMember(req, res, next) {
  debug('ENTER isCocMember method!');

  req.query.userId = res.locals.userAuth.id;
  req.query.cocId = req.params.cocId;

  return userCocRoute.isCocMember(req, res, next);
}

module.exports = {
  index,
  isCocMember
};
