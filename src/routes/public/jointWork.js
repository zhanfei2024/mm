// core
const debug = require('debug')('APP:ENTERPRISE_JOINTWORK');

// library
const enterpriseJointWorkRoute = require('../../routes/mm/jointWork');

/**
 * @api {get} /enterprise/enterprises/cocs/:cocId([0-9]+)/joint-work 获取合作商会列表
 * @apiName index
 * @apiGroup public jointWork
 *
 * @apiParam {number} cocId 商会id
 *
 * @apiSuccess {number} id 数据id
 * @apiSuccess {number} enterpriseId 企业id
 * @apiSuccess {number} cocId 商会id
 * @apiSuccess {string{..255}} title 标题
 * @apiSuccess {number} jointWorkCocId 合作商会id
 * @apiSuccess {string{..255}} linkUrl 合作商会首页的链接
 * @apiSuccess {string{..255}} logo logo文件名
 * @apiSuccess {boolean} isActive 数据是否有效
 * @apiSuccess {number} order 序号
 * @apiSuccess {date_iso8601} createdAt 数据创建时间
 * @apiSuccess {date_iso8601} updatedAt 数据修改时间
 * @apiSuccess {string{..255}} url logo的url地址
 */
function indexJoinWork(req, res, next) {
    debug('ENTER index method!');

    req.query.cocId = req.params.cocId;

    return enterpriseJointWorkRoute.index(req, res, next);
}

module.exports = {
  indexJoinWork
  }
