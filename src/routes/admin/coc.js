// core
const debug = require('debug')('APP:ADMIN_COC');

// model

// library
const cocRoute = require('../../routes/mm/coc');

/**
 * @api {get} /admin/enterprises/cocs 列出商会列表
 * @apiName index
 * @apiGroup  admin coc
 *
 * @apiParam {number} [emterpriseId] 企业id号
 * @apiParam {string} [search] 要查询的字符串
 * @apiParam {number} [countryId] 国家id号
 * @apiParam {number} [industryId] 行业id号
 * @apiParam {boolean} [isAproved] 是否审核通过
 * @apiParam {string} [sorting] 排序的字段
 *
 * @apiSuccess {number} id 商会id号
 * @apiSuccess {number} locationId 地区id
 * @apiSuccess {string} name 商会名称
 * @apiSuccess {string} contacts 商会联系人
 * @apiSuccess {string} phone 商会联系电话
 * @apiSuccess {string} email 商会联系邮件
 * @apiSuccess {date} foundingDate 商会创建日期
 * @apiSuccess {string} webDomain 商会网址
 * @apiSuccess {string='30-50', '50-100', '100+'} scale 商会规模
 * @apiSuccess {string} field 商会领域
 * @apiSuccess {boolean} isApproved 是否审核通过
 * @apiSuccess {string} purpose 商会宗旨
 * @apiSuccess {string} qualifications 商会资质
 * @apiSuccess {number} view 商会点击数
 * @apiSuccess {string} purpose 商会宗旨
 * @apiSuccess {string} description 商会描述
 *
 * @apiSuccess {object} address 商会地址
 * @apiSuccess {object} address.address 商会地址
 * @apiSuccess {object} address.phone 商会地址联系电话
 * @apiSuccess {object} address.fax 商会地址联系传真
 * @apiSuccess {object} address.email 商会地址联系邮件
 *
 * @apiSuccess {object} country 商会所在国家
 * @apiSuccess {string} country.name 国家名称
 *
 * @apiSuccess {object} industry 商会所在行业
 * @apiSuccess {number} industry.id 行业id
 * @apiSuccess {string} industry.name 行业名称
 *
 * @apiSuccess {string} logoUrl 商会logo
 * @apiSuccess {string} coverImageUrl 商会封面
 */
function index(req, res, next) {
  debug('ENTER index method!');

  req.params.adminId = res.locals.adminAuth.id;

  return cocRoute.index(req, res, next);
}

/**
 * @api {get} /admin/enterprises/cocs/:cocId([0-9]+) 商会详情
 * @apiName show
 * @apiGroup  admin coc
 *
 * @apiParam {number} [cocId] 商会id
 *
 * @apiSuccess {number} id 商会id号
 * @apiSuccess {number} locationId 地区id
 * @apiSuccess {string} name 商会名称
 * @apiSuccess {string} contacts 商会联系人
 * @apiSuccess {string} phone 商会联系电话
 * @apiSuccess {string} email 商会联系邮件
 * @apiSuccess {date} foundingDate 商会创建日期
 * @apiSuccess {string} webDomain 商会网址
 * @apiSuccess {string='30-50', '50-100', '100+'} scale 商会规模
 * @apiSuccess {string} field 商会领域
 * @apiSuccess {boolean} isApproved 是否审核通过
 * @apiSuccess {string} purpose 商会宗旨
 * @apiSuccess {string} qualifications 商会资质
 * @apiSuccess {number} view 商会点击数
 * @apiSuccess {string} purpose 商会宗旨
 * @apiSuccess {string} description 商会描述
 *
 * @apiSuccess {object} address 商会地址
 * @apiSuccess {object} address.address 商会地址
 * @apiSuccess {object} address.phone 商会地址联系电话
 * @apiSuccess {object} address.fax 商会地址联系传真
 * @apiSuccess {object} address.email 商会地址联系邮件
 *
 * @apiSuccess {object} country 商会所在国家
 * @apiSuccess {string} country.name 国家名称
 *
 * @apiSuccess {object} industry 商会所在行业
 * @apiSuccess {number} industry.id 行业id
 * @apiSuccess {string} industry.name 行业名称
 *
 * @apiSuccess {string} logoUrl 商会logo
 * @apiSuccess {string} coverImageUrl 商会封面
 */
function show(req, res, next) {
  debug('ENTER show method!');

  req.params.adminId = res.locals.adminAuth.id;

  return cocRoute.show(req, res, next);
}

/**
 * @api {put} /enterprise/enterprises/cocs/:cocId([0-9]+) 修改商会(审核)
 * @apiName update
 * @apiGroup admin coc
 *
 * @apiParam {boolean} [isApproved] 审核是否通过
 *
 * @apiSuccess {number} id 商会id号
 * @apiSuccess {number} locationId 地区id
 * @apiSuccess {string} name 商会名称
 * @apiSuccess {string} contacts 商会联系人
 * @apiSuccess {string} phone 商会联系电话
 * @apiSuccess {string} email 商会联系邮件
 * @apiSuccess {date} foundingDate 商会创建日期
 * @apiSuccess {string} webDomain 商会网址
 * @apiSuccess {string='30-50', '50-100', '100+'} scale 商会规模
 * @apiSuccess {string} field 商会领域
 * @apiSuccess {boolean} isApproved 是否审核通过
 * @apiSuccess {string} purpose 商会宗旨
 * @apiSuccess {string} qualifications 商会资质
 * @apiSuccess {number} view 商会点击数
 * @apiSuccess {string} purpose 商会宗旨
 * @apiSuccess {string} description 商会描述
 *
 * @apiSuccess {object} address 商会地址
 * @apiSuccess {object} address.address 商会地址
 * @apiSuccess {object} address.phone 商会地址联系电话
 * @apiSuccess {object} address.fax 商会地址联系传真
 * @apiSuccess {object} address.email 商会地址联系邮件
 *
 * @apiSuccess {object} country 商会所在国家
 * @apiSuccess {string} country.name 国家名称
 *
 * @apiSuccess {object} industry 商会所在行业
 * @apiSuccess {number} industry.id 行业id
 * @apiSuccess {string} industry.name 行业名称
 *
 * @apiSuccess {string} logoUrl 商会logo
 * @apiSuccess {string} coverImageUrl 商会封面
 */
function update(req, res, next) {
  debug('ENTER update method!');
  req.params.adminId = res.locals.adminAuth.id;

  req.params.adminId = res.locals.adminAuth.id;
  req.body= { isApproved: req.body.isApproved };

  return cocRoute.update(req, res, next);
}

/**
 * @api {delete} /admin/enterprises/cocs/:cocId([0-9]+) 删除商会
 * @apiName destroy
 * @apiGroup admin coc
 *
 * @apiParam {number} cocId 商会id
 *
 * @apiSuccess {boolean} status 是否删除成功
 */
function destroy(req, res, next) {
  debug('ENTER destroy method!');

  return cocRoute.destroy(req, res, next);
}

module.exports = {
  index,
  show,
  update,
  destroy
};
