// core
const debug = require('debug')('APP:PUBLIC_COC');


// library
const cocRoute = require('../../routes/mm/coc');
const _ = require('lodash');

/**
 * @api {get} /public/cocs 获取审核通过的商会列表
 * @apiName index
 * @apiGroup public coc
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
 * @apiSuccess {string='myself-only', '2--10', '11-50', '51-1200', '201-500', '501-1000', '1001-5000', '5001-10000', '10001+'} scale 商会规模
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
 * @apiSuccess {string} logoUrl logo的url地址
 */
function indexcocs(req, res, next) {
  debug('ENTER index method!');

  req.query.isApproved = true;

  return cocRoute.index(req, res, next);
}

/**
 * @api {get} /public/cocs/:cocId([0-9]+) 获取指定商会的信息
 * @apiName show
 * @apiGroup public coc
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
 * @apiSuccess {string='myself-only', '2--10', '11-50', '51-1200', '201-500', '501-1000', '1001-5000', '5001-10000', '10001+'} scale 商会规模
 * @apiSuccess {string} field 商会领域
 * @apiSuccess {string} purpose 商会宗旨
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
 *
 * @apiSuccess {string} logoUrl logo的url地址
 */
function showCoc(req, res, next) {
  debug('ENTER show method!');

  req.params.isApproved = true;
  // 公共路由进入点击数+1
  req.params.clicked = true;

  return cocRoute.show(req, res, next);
}

module.exports = {
  indexcocs,
  showCoc
};
