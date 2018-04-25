// core
const debug = require('debug')('APP:UESR_Invitation');

// model

// library
const candidateRoute = require('../mm/candidate');

/**
 * @api {get} /user/users/invitations 接到的邀请列表
 * @apiName index
 * @apiGroup user invitation
 *
 * @apiSuccess {number} id 会员id
 * @apiSuccess {number} enterpriseId 公司id
 * @apiSuccess {number} cocId 商会id
 * @apiSuccess {number} group 组id
 * @apiSuccess {number} userId 用户id
 * @apiSuccess {date} esxpireDate 到期日期
 * @apiSuccess {string='fail', 'success'} invitationStatus 邀请是否成功
 * @apiSuccess {boolean} isActive 生效
 * @apiSuccess {sting{..255}} email 邮箱
 */
function index(req, res, next) {
    debug('ENTER index method!');

    // req.query.userId = res.locals.userAuth.id;
    req.query.email = res.locals.userAuth.email;
    req.query.type = 'invitation';

    return candidateRoute.index(req, res, next);
}

/**
 * @api {get} /user/users/invitations/:invitationId([0-9]+) 查看一个邀请
 * @apiName show
 * @apiGroup user invitation
 *
 * @apiParam {number} invitationId 邀请id
 *
 * @apiSuccess {number} id 会员id
 * @apiSuccess {number} enterpriseId 公司id
 * @apiSuccess {number} cocId 商会id
 * @apiSuccess {number} group 组id
 * @apiSuccess {number} userId 用户id
 * @apiSuccess {date} esxpireDate 到期日期
 * @apiSuccess {string='fail', 'success'} invitationStatus 邀请是否成功
 * @apiSuccess {boolean} isActive 生效
 * @apiSuccess {sting{..255}} email 邮箱
 */
function show(req, res, next) {
    debug('ENTER show method!');

    req.params.userId = res.locals.userAuth.id;
    req.params.candidateId = req.params.invitationId;

    return candidateRoute.show(req, res, next);
}
/**
 * @api {put} /user/users/invitations/:invitationId([0-9]+) 同意或拒绝一个邀请
 * @apiName update
 * @apiGroup user invitation
 *
 * @apiParam {number} invitationId
 * @apiParam {string="success", "fail"} status 同意或拒绝
 *
 * @apiSuccess {number} id 会员id
 * @apiSuccess {number} enterpriseId 公司id
 * @apiSuccess {number} cocId 商会id
 * @apiSuccess {number} group 组id
 * @apiSuccess {number} userId 用户id
 * @apiSuccess {date} esxpireDate 到期日期
 * @apiSuccess {string='fail', 'success'} status 是否成功
 * @apiSuccess {boolean} isActive 生效
 * @apiSuccess {sting{..255}} email 邮箱
 */
function update(req, res, next) {
    debug('ENTER update method!');

    req.body.candidateId = req.params.invitationId;
    req.body.type = 'invitation';
    // req.body.userId = res.locals.userAuth.id;

    return candidateRoute.update(req, res, next);
}

module.exports = {
    index,
    show,
    update
};
