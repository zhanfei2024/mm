// core
const debug = require('debug')('APP:Address');

// model

// library
const enterpriseAddressRoute = require('../../routes/mm/cocAddress');

/**
 * @api {get} enterprise/enterprises/cocs/:cocId([0-9]+)/coc-addresss 获取商会的地址列表
 * @apiName index
 * @apiGroup coc address
 * 
 * @apiParam {number} cocId 商会id号
 * 
 * @apiSuccess {number} id 地址id号
 * @apiSuccess {number} enterpriseId 企业id号
 * @apiSuccess {number} cocId 商会id号
 * @apiSuccess {string} address 详细地址
 * @apiSuccess {string} phone 地址中的手机号
 * @apiSuccess {string} fax 地址中的传真
 * @apiSuccess {string} email 地址中的电子邮件
 * @apiSuccess {booloean} isActive 地址是否有效
 * @apiSuccess {date} createdAt 数据创建日期
 * @apiSuccess {date} updatedAt 数据更新日期
 */
function index(req, res, next) {
  debug('ENTER index method!');

  req.params.enterpriseId = res.locals.enterpriseAuth.id;
  req.query.cocId = req.params.cocId;

  return enterpriseAddressRoute.index(req, res, next);
}

/**
 * @api {get} enterprise/enterprises/cocs/:cocId([0-9]+)/coc-addresss/:addressId([0-9]+) 获取商会的一个地址
 * @APIName show 
 * @apiGroup coc address
 * 
 * @apiParam {number} id 地址id号
 * @apiParam {number} cocId 商会id号
 * 
 * @apiSuccess {number} id 地址id号
 * @apiSuccess {number} enterpriseId 企业id号
 * @apiSuccess {number} cocId 商会id号
 * @apiSuccess {string} address 详细地址
 * @apiSuccess {string} phone 地址的联系电话
 * @apiSuccess {string} fax 地址的联系传真
 * @apiSuccess {string} email 地址的联系电子邮件
 * @apiSuccess {boolean} isActive 地址是否有效
 * @apiSuccess {date} createdAt 数据的创建日期
 * @apiSuccess {date} updatedAt 数据的更新日期
 */
function show(req, res, next) {
  debug('ENTER show method!');

  return enterpriseAddressRoute.show(req, res, next);
}

/**
 * @api {post} enterprise/enterprises/cocs/:cocId([0-9]+)/coc-addresss 为商会添加一条地址
 * @apiName create
 * @apiGroup coc address
 * 
 * @apiParam {number} enterpriseId 企业id号
 * @apiParam {number} cocId 商会id号
 * @apiParam {string{..255}} address 详细地址
 * @apiParam {string{..255}} phone 地址的联系电话
 * @apiParam {string{..255}} fax 地址的联系传真
 * @apiParam {string{..255}} email 地址的联系电子邮件
 * @apiParam {boolean} isActive 地址是否有效
 */
function create(req, res, next) {
  debug('ENTER create method!');
  req.body.enterpriseId = res.locals.enterpriseAuth.id;
  req.body.cocId = req.params.cocId;
  return enterpriseAddressRoute.create(req, res, next);
}

/**
 * @api {put} enterprise/enterprises/cocs/:cocId([0-9]+)/coc-addresss 为商会添加一条地址
 * @apiName update
 * @apiGroup coc address
 * 
 * @apiParam {number} enterpriseId 企业id号
 * @apiParam {number} cocId 商会id号
 * @apiParam {string{..255}} [address] 详细地址
 * @apiParam {string{..255}} [phone] 地址的联系电话
 * @apiParam {string{..255}} [fax] 地址的联系传真
 * @apiParam {string{..255}} [email] 地址的联系电子邮件
 * @apiParam {boolean} [isActive] 地址是否有效(false则不展示)
 */
function update(req, res, next) {
  debug('ENTER update method!');
  req.body.enterpriseId = res.locals.enterpriseAuth.id;
  req.body.addressId = req.params.addressId;
  req.body.cocId = req.params.cocId;
  return enterpriseAddressRoute.update(req, res, next);
}

/**
 * @api {delete} enterprise/enterprises/cocs/:cocId([0-9]+)/coc-addresss/:addressId([0-9]+) 删除一条地址
 * @apiName destroy
 * @APIGroup coc address
 * 
 * @apiParam {number} addressId 
 * @apiParam {number} cocId
 * 
 * @apiSuccess {boolean} status 删除操作的结果
 */
function destroy(req, res, next) {
  debug('ENTER destroy method!');

  return enterpriseAddressRoute.destroy(req, res, next);
}

module.exports = {
  index,
  show,
  create,
  update,
  destroy
};
