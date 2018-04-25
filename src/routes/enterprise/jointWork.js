// core
const debug = require('debug')('APP:ENTERPRISE_JOINTWORK');

// library
const enterpriseJointWorkRoute = require('../../routes/mm/jointWork');

/**
 * @api {get} /enterprise/enterprises/cocs/:cocId([0-9]+)/joint-work 获取合作商会列表
 * @apiName index
 * @apiGroup coc jointWork
 * 
 * @apiParam {number} cocId 商会id
 * @apiParam {number} enterpriseId 企业id
 * @apiParam {string{..255}} search 搜索字符串(只搜索标题)
 * @apiParam {string="orderDESC","orderASC","updatedAtDESC","updatedAtASC"} sorting 排序
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
function index(req, res, next) {
    debug('ENTER index method!');
    
    req.query.cocId = req.params.cocId;
    req.query.enterpriseId = res.locals.enterpriseAuth.id;

    return enterpriseJointWorkRoute.index(req, res, next);
}

/**
 * @api {get} /enterprise/enterprises/cocs/:cocId([0-9]+)/joint-work/:jointWorkId([0-9]+) 获取一条合作商会记录
 * @apiName show
 * @apiGroup coc jointWork
 * 
 * @apiParam {number} cocId 商会id
 * @apiParam {number} enterpriseId 企业id 
 * @apiParam {number} jointWorkId 合作商会的记录id
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
function show(req, res, next) {
    debug('ENTER index method!');

    req.params.enterpriseId = res.locals.enterpriseAuth.id;

    return enterpriseJointWorkRoute.show(req, res, next);
}

/**
 * @api {post} /enterprise/enterprises/cocs/:cocId([0-9]+)/joint-work 添加一个合作商会
 * @apiName create
 * @apiGroup coc jointWork
 * 
 * @apiParam {number} cocId 商会id
 * @apiParam {number} enterpriseId 企业id 
 * @apiParam {number} jointWorkCocId 合作商会的id
 * @apiParam {string{..255}} title 标题
 * @apiParam {string{..255}} linkUrl 合作商会的首页链接
 * @apiParam {string{..255}} logo logo文件名
 * @apiParam {number} [order] 序号
 * @apiParam {boolean} [isActive] 数据是否有效
 * @apiParam {date_iso8601} createdAt 数据创建时间
 * @apiParam {date_iso8601} updatedAt 数据修改时间
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
function create(req, res, next) {
    debug('ENTER create method!');

    debug('locals', res.locals);
    req.body.cocId = req.params.cocId;
    req.body.enterpriseId = res.locals.enterpriseAuth.id;

    return enterpriseJointWorkRoute.create(req, res, next);
}

/**
 * @api {put} /enterprise/enterprises/cocs/:cocId([0-9]+)/joint-work/:jointWorkId([0-9]+) 添加一个合作商会
 * @apiName update
 * @apiGroup coc jointWork
 * 
 * @apiParam {number} cocId 商会id
 * @apiParam {number} enterpriseId 企业id
 * @apiParam {number} jointWorkId 合作商会记录id
 * @apiParam {string{..255}} [title] 标题
 * @apiParam {string{..255}} [linkUrl] 合作商会的首页链接
 * @apiParam {string{..255}} [logo] logo文件名
 * @apiParam {number} [order] 序号
 * @apiParam {boolean} [isActive] 数据是否有效
 * @apiParam {date_iso8601} [createdAt] 数据创建时间
 * @apiParam {date_iso8601} [updatedAt] 数据修改时间
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
function update(req, res, next) {
    debug('ENTER update method!');

    req.params.enterpriseId = res.locals.enterpriseAuth.id;

    return enterpriseJointWorkRoute.update(req, res, next);
}

/**
 * @api {delete} /enterprise/enterprises/cocs/:cocId([0-9]+)/joint-work/:jointWorkId([0-9]+) 删除一个合作商会
 * @apiName destroy
 * @apiGroup coc jointWork
 * 
 * @apiParam {number} cocId 商会id
 * @apiParam {number} jointWorkId 合作商会的id
 * 
 * @apiSuccess {boolean} status 是否删除成功
 */
function destroy(req, res, next) {
    debug('ENTER destroy method!');

    req.params.enterpriseId = res.locals.enterpriseAuth.id;

    return enterpriseJointWorkRoute.destroy(req, res, next);
}

/**
 * @api {post} /enterprise/enterprises/cocs/:cocId([0-9]+)/joint-work/:jointWorkId/logo
 * @apiName uploadLogo
 * @apiGroup coc jointWork
 * 
 * @apiParam {file} file 上传的图片
 * 
 * @apiSuccess {number} id
 * @apiSuccess {string} title
 * @apiSuccess {string} url
 * @apiSuccess {boolean} isActive
 * @apiSuccess {string} path
 * @apiSuccess {string} name
 * @apiSuccess {string} extension
 * @apiSuccess {number} order
 * @apiSuccess {string} slideShowUrl
 */
function uploadLogo(req, res, next) {
    debug('ENTER uploadLogo method!');

    req.params.enterpriseId = res.locals.enterpriseAuth.id;

    return enterpriseJointWorkRoute.uploadLogo(req, res, next);
}

module.exports = {
    index,
    create,
    show,
    update,
    destroy,
    uploadLogo
  }