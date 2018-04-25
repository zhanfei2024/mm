// core
const debug = require('debug')('APP:ENTERPRISE_COC');

// model

// library
const cocRoute = require('../../routes/mm/coc');

/**
 * @api {get} enterprise/enterprises/cocs 列出商会列表
 * @apiName index
 * @apiGroup enterprise coc
 *
 * @apiParam {number} [emterpriseId] 企业id号
 * @apiParam {string} [search] 要查询的字符串
 * @apiParam {number} [countryId] 国家id号
 * @apiParam {number} [industryId] 行业id号
 * @apiParam {boolean} [isAproved] 是否审核通过
 * @apiParam {string} [sorting] 排序的字段
 *
 * @apiSuccess {number} id 商会id号
 * @apiSuccess {number} enterpriseId 企业id号
 * @apiSuccess {number} industryId 行业id号
 * @apiSuccess {string} name 商会名称
 * @apiSuccess {string} logo 商会logo文件名称
 * @apiSuccess {string} webDomain 商会网址
 * @apiSuccess {date} foundingDate 商会创建日期
 * @apiSuccess {string='30-50', '50-100', '100+'} scale 商会规模
 * @apiSuccess {string} field 商会领域
 * @apiSuccess {string} purpose 商会宗旨
 * @apiSuccess {boolean} isApproved 是否审核通过
 * @apiSuccess {string} coverImage 组织结构图
 * @apiSuccess {number} view 商会视图
 * @apiSuccess {date} createdAt 创建日期
 * @apiSuccess {date} updatedAt 更新日期
 * @apiSuccess {date} deletedAt 删除日期
 *
 * @apiSuccess {object} country 商会所在国家
 * @apiSuccess {number} country.id 国家id号
 * @apiSuccess {number} country.parentId 父id
 * @apiSuccess {number} country.depth 树的深度
 * @apiSuccess {string} country.code 国家code码
 * @apiSuccess {string} country.name 国家名称
 *
 * @apiSuccess {object} industry 商会所在行业
 * @apiSuccess {number} industry.id 行业id
 * @apiSuccess {number} industry.parentId 父id
 * @apiSuccess {string} industry.name 行业名称
 * @apiSuccess {number} industry.depth 树的深度
 * @apiSuccess {number} industry.order
 * @apiSuccess {string} industry.description 行业描述
 * @apiSuccess {date} industry.createdAt 创建日期
 * @apiSuccess {date} industry.updatedAt 更新日期
 */
function index(req, res, next) {
  debug('ENTER index method!');

  req.query.enterpriseId = res.locals.enterpriseAuth.id;

  return cocRoute.index(req, res, next);
}

/**
 * @api {get} /enterprise/enterprises/cocs/:cocId([0-9]+) 获取指定商会的信息
 * @apiName show
 * @apiGroup enterprise coc
 *
 * @apiParam {number} cocId 商会id号
 *
 * @apiSuccess {number} id 商会id
 * @apiSuccess {number} enterpriseId 企业id号
 * @apiSuccess {number} industryId 行业id号
 * @apiSuccess {number} countryId 商会所在国家id号
 * @apiSuccess {string{..255}} name 商会名称
 * @apiSuccess {string{..255}} logo 商会logo文件名
 * @apiSuccess {strng{..255}} webDomain 商会网址
 * @apiSuccess {date} foundingDate 商会创建时间
 * @apiSuccess {string='30-50', '50-100', '100+'} scale 商会规模
 * @apiSuccess {string} field 商会领域
 * @apiSuccess {string}  purpose 商会宗旨
 * @apiSuccess {boolean} isApproved 是否审核通过
 * @apiSuccess {string{..255}} coverImage 商会组织结构
 * @apiSuccess {number} view 商会视图
 * @apiSuccess {date} createdAt 创建日期
 * @apiSuccess {date} deletedAt 更新日期
 * @apiSuccess {string{..255}} logoUrl 商会logo的url地址
 *
 * @apiSuccess {object[]} address 商会地址列表
 * @apiSuccess {number} address.id id号
 * @apiSuccess {number} address.enterpriseId 商会地址企业id号
 * @apiSuccess {number} address.cocId 商会地址id号
 * @apiSuccess {string{..255}} address.address 详细地址
 * @apiSuccess {string{..255}} address.phone 地址的手机号
 * @apiSuccess {string{..255}} address.fax 地址的传真
 * @apiSuccess {string{..255}} address.email 地址的电子邮件
 * @apiSuccess {boolean} address.isActive 地址是否激活
 * @apiSuccess {date} address.createdAt 地址创建日期
 * @apiSuccess {date} address.updatedAt 地址根系日期
 * @apiSuccess {number} address.addressId 地址id号
 *
 * @apiSuccess {object} country 商会所在国家
 * @apiSuccess {number} country.id 国家id号
 * @apiSuccess {number} country.parentId 父id
 * @apiSuccess {number} country.depth 树的深度
 * @apiSuccess {string{{..5}}} country.code 国家code码
 * @apiSuccess {string{..255}} country.name 国家名称
 *
 * @apiSuccess {object} industry 商会所在行业
 * @apiSuccess {number} industry.id 行业id
 * @apiSuccess {number} industry.parentId 父id
 * @apiSuccess {string{..255}} industry.name 行业名称
 * @apiSuccess {number} industry.depth 树的深度
 * @apiSuccess {number} industry.order
 * @apiSuccess {string} industry.description 行业描述
 * @apiSuccess {date} industry.createdAt 创建日期
 * @apiSuccess {date} industry.updatedAt 更新日期
  */
function show(req, res, next) {
  debug('ENTER show method!');

  req.query.enterpriseId = res.locals.enterpriseAuth.id;

  return cocRoute.show(req, res, next);
}

/**
 * @api {post} enterprise/enterprises/cocs 创建商会
 * @apiName create
 * @apiGroup enterprise coc
 *
 * @apiParam {number} enterpriseId 企业id号
 * @apiParam {number} countryId 国家id号
 * @apiParam {number} industryId 行业id号
 * @apiParam {string{1..255}} name 商会名称
 * @apiParam {string{..255}} [webDomain] 商会网址
 * @apiParam {date} foundingDate 商会创建日期
 * @apiParam {string='30-50', '50-100', '100+'} scale 商会规模
 * @apiParam {string} [field] 商会领域
 * @apiParam {number} [locationId] 地区id号
 * @apiParam {string} [purpose] 商会宗旨
 * @apiParam {number} [addressId] 商会地址id
 *
 * @apiSuccess {number} id 商会id号
 * @apiSuccess {number} enterpriseId 企业id号
 * @apiSuccess {number} countryId 商会所在国家id号
 * @apiSuccess {number} industryId 商会所在行业id号
 * @apiSuccess {string{..255}} name 商会名称
 * @apiSuccess {string{..255}} logo 商会logo文件名
 * @apiSuccess {string{..255}} webDomain 商会网址
 * @apiSuccess {date} foundingDate 商会创建日期
 * @apiSuccess {string='30-50', '50-100', '100+'} scale 商会规模
 * @apiSuccess {string} field 商会领域
 * @apiSuccess {number} locationId 地区id号
 * @apiSuccess {string} purpose 商会宗旨
 * @apiSuccess {boolean} isApproved 审核是否通过
 * @apiSuccess {string{..255}} coverImage 商会组织结构
 * @apiSuccess {string} view 商会视图
 * @apiSuccess {date} createdAt 数据创建日期
 * @apiSuccess {date} updatedAt 数据更新日期
 * @apiSuccess {date} deletedAt 数据删除日期
 * @apiSuccess {string{..255}} logoUrl 商会logo图片地址
 *
 * @apiSuccess {object[]} address 商会地址列表
 * @apiSuccess {number} address.id id号
 * @apiSuccess {number} address.enterpriseId 商会地址企业id号
 * @apiSuccess {number} address.cocId 商会地址id号
 * @apiSuccess {string{..255}} address.address 详细地址
 * @apiSuccess {string{..255}} address.phone 地址的手机号
 * @apiSuccess {string{..255}} address.fax 地址的传真
 * @apiSuccess {string{..255}} address.email 地址的电子邮件
 * @apiSuccess {boolean} address.isActive 地址是否激活
 * @apiSuccess {date} address.createdAt 地址创建日期
 * @apiSuccess {date} address.updatedAt 地址根系日期
 * @apiSuccess {number} address.addressId 地址id号
 *
 * @apiSuccess {object} country 商会所在国家
 * @apiSuccess {number} country.id 国家id号
 * @apiSuccess {number} country.parentId 父id
 * @apiSuccess {number} country.depth 树的深度
 * @apiSuccess {string} country.code 国家简称代码
 * @apiSuccess {string{..255}} country.name 国家名称
 *
 * @apiSuccess {object} industry 商会所在行业
 * @apiSuccess {number} industry.id 行业id
 * @apiSuccess {number} industry.parentId 父id
 * @apiSuccess {string{..255}} industry.name 行业名称
 * @apiSuccess {number} industry.depth 树的深度
 * @apiSuccess {number} industry.order
 * @apiSuccess {string} industry.description 行业描述
 * @apiSuccess {date} industry.createdAt 创建日期
 * @apiSuccess {date} industry.updatedAt 更新日期
 * @apiSuccess {date} industry.deletedAt 删除日期
 */
function create(req, res, next) {
  debug('ENTER create method!');
  req.body.enterpriseId = res.locals.enterpriseAuth.id;

  return cocRoute.create(req, res, next);
}

/**
 * @api {put} enterprise/enterprises/cocs/:cocId([0-9]+) 更新商会信息
 * @apiName update
 * @apiGroup enterprise coc
 *
 * @apiParam {number} [countryId] 国家id号
 * @apiParam {number} [industryId] 行业id号
 * @apiParam {string{1..255}} [name] 商会名称
 * @apiParam {string{6..255}} [logo] 商会logo文件名
 * @apiParam {string{..255}} [webDomain] 商会网址
 * @apiParam {date} [foundingDate] 商会创建日期
 * @apiParam {string='30-50', '50-100', '100+'} [scale] 商会规模
 * @apiParam {string} [field] 商会领域
 * @apiParam {number} [locationId] 地区id号

 * @apiParam {string} [purpose] 商会宗旨
 * @apiParam {number} [addressId] 商会地址id
 * @apiParam {boolean} [isApproved] 审核是否通过
 *
 * @apiSuccess {number} id
 * @apiSuccess {number} enterpriseId 商会id号
 * @apiSuccess {number} countryId 商会所在国家id号
 * @apiSuccess {number} industryId 商会所在行业id号
 * @apiSuccess {string} name 商会名称
 * @apiSuccess {string} logo 商会logo文件名
 * @apiSuccess {string} webDomain 商会网址
 * @apiSuccess {date} foundingDate 商会创建日期
 * @apiSuccess {string='30-50', '50-100', '100+'} scale 商会规模
 * @apiSuccess {string} field 商会领域
 * @apiSuccess {number} [locationId] 地区id号
 * @apiSuccess {string} purpose 商会宗旨
 * @apiSuccess {boolean} isApproved 审核是否通过
 * @apiSuccess {string} coverImage 商会组织结构
 * @apiSuccess {string} view 商会视图
 * @apiSuccess {date} createdAt 数据创建日期
 * @apiSuccess {date} updatedAt 数据更新日期
 * @apiSuccess {date} deletedAt 数据删除日期
 * @apiSuccess {string} logoUrl 商会logo图片地址
 *
 * @apiSuccess {object[]} address 商会地址列表
 * @apiSuccess {number} address.id id号
 * @apiSuccess {number} address.enterpriseId 商会地址企业id号
 * @apiSuccess {number} address.cocId 商会地址id号
 * @apiSuccess {string} address.address 详细地址
 * @apiSuccess {string} address.phone 地址的手机号
 * @apiSuccess {string} address.fax 地址的传真
 * @apiSuccess {string} address.email 地址的电子邮件
 * @apiSuccess {boolean} address.isActive 地址是否激活
 * @apiSuccess {date} address.createdAt 地址创建日期
 * @apiSuccess {date} address.updatedAt 地址根系日期
 * @apiSuccess {number} address.addressId 地址id号
 *
 * @apiSuccess {object} country 商会所在国家
 * @apiSuccess {number} country.id 国家id号
 * @apiSuccess {number} country.parentId 父id
 * @apiSuccess {number} country.depth 树的深度
 * @apiSuccess {string} country.code 国家简称代码
 * @apiSuccess {string} country.name 国家名称
 *
 * @apiSuccess {object} industry 商会所在行业
 * @apiSuccess {number} industry.id 行业id
 * @apiSuccess {number} industry.parentId 父id
 * @apiSuccess {string} industry.name 行业名称
 * @apiSuccess {number} industry.depth 树的深度
 * @apiSuccess {number} industry.order
 * @apiSuccess {string} industry.description 行业描述
 * @apiSuccess {date} industry.createdAt 创建日期
 * @apiSuccess {date} industry.updatedAt 更新日期
 * @apiSuccess {date} industry.deletedAt 删除日期
 */
function update(req, res, next) {
  debug('ENTER update method!');

  req.body.enterpriseId = res.locals.enterpriseAuth.id;
  // 企业没有权限修改商会是否审核通过
  delete req.body.isApproved;

  return cocRoute.update(req, res, next);
}

/**
 * @api {delete} enterprise/enterprises/cocs/:cocId([0-9]+) 删除指定商会
 * @apiName destroy
 * @apiGroup enterprise coc
 *
 * @apiParam {number} cocId 商会id
 *
 * @apiSuccess {boolean} status 请求结果
 */
function destroy(req, res, next) {
  debug('ENTER destroy method!');

  req.params.enterpriseId = res.locals.enterpriseAuth.id;

  return cocRoute.destroy(req, res, next);
}

/**
 * @api {post} /enterprise/enterprises/cocs/:cocId([0-9]+)/upload-logo 上传商会logo
 * @apiName uploadLogo
 * @apiGroup enterprise coc
 *
 * @apiParam {number} [cocId] 商会id
 * @apiParam {file} file 上传图片
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
 * @apiSuccess {string} qualificationUrl  资质证明
  */
function uploadLogo(req, res, next) {
  debug('ENTER update logo method!');

  req.params.enterpriseId = res.locals.enterpriseAuth.id;

  return cocRoute.uploadLogo(req, res, next);
}

/**
 * @api {post} /enterprise/enterprises/cocs/:cocId([0-9]+)/upload-cover 上传商会封面
 * @apiName uploadCover
 * @apiGroup enterprise coc
 *
 * @apiParam {number} [cocId] 商会id
 * @apiParam {file} file 上传图片
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
 * @apiSuccess {string} qualificationUrl  资质证明

 */
function uploadCover(req, res, next) {
  debug('ENTER upload coverImage method!');

  req.params.enterpriseId = res.locals.enterpriseAuth.id;
  return cocRoute.uploadCover(req, res, next);
}

/**
 * @api {post} /enterprise/enterprises/cocs/:cocId([0-9]+)/upload-qualification 上传商会资质
 * @apiName uploadQualification
 * @apiGroup enterprise coc
 *
 * @apiParam {number} [cocId] 商会id
 * @apiParam {file} file 上传图片
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
 * @apiSuccess {string} qualificationUrl  资质证明
  */
function uploadQualification(req, res, next) {
  debug('ENTER upload qualification method!');

  req.body.enterpriseId = res.locals.enterpriseAuth.id;
  req.body.cocId = req.params.cocId;
  req.body.file = req.files.file;

  return cocRoute.uploadQualification(req, res, next);
}

module.exports = {
  index,
  show,
  create,
  update,
  destroy,
  uploadLogo,
  uploadCover,
  uploadQualification
};


