// debug
const debug = require('debug')('APP:COC');

// model
const models = require('../../models');

// validate
const inputCheck = require('input-check');
const validateHelper = require('../../helpers/ValidateHelper');

// library
const _ = require('lodash');
const path = require('path');
const randomstring = require("randomstring");
const Storage = require('../../modules/storage');

// method
const modelHelper = require('../../methods/model');


async function index(req, res, next) {
  debug('ENTER index method!');

  const rules = {
    search: 'nullable|string|min:1',
    enterpriseId: 'nullable|integer|min:1|exists:Enterprise,id',
    countryId: 'array',
    "countryId.*": 'required_if:countryId|integer|exists:Country,id|min:1',
    industryId: 'array',
    "industryId.*": 'required_if:countryId|integer|exists:Industry,id|min:1',
    locationId: 'array',
    'locationId.*': 'required_if:locationId|integer|exists:Location,id|min:1',
    scale: 'array',
    'scale.*': 'required_if:scale|in:30-50,50-100,100+',
    foundingDate: 'nullable|string',
    startFoundingDateSpan: 'nullable|date_iso8601',
    endFoundingDateSpan: 'nullable|date_iso8601',
    isApproved: 'nullable|boolean',
    sorting: 'nullable|string|in:createAtDESC,createAtASC,nameDESC,nameASC,foundingDateDESC,foundingDateASC,scaleDESC,scaleASC,viewASC,viewDESC',
    name: 'nullable|string|min:1',
    account: 'nullable|string|min:1',
    username: 'nullable|string|min:1'
  };

  // 切割foundingDate 然后赋值
  if (!_.isNil(req.query.foundingDate)) {
    const foundingDateSpan = req.query.foundingDate.split('-');
    req.query.startFoundingDateSpan = `${foundingDateSpan[0]}-01-01`;
    req.query.endFoundingDateSpan = `${foundingDateSpan[1]}-12-31`;
  }

  // 判断req.query.scale 是否为数组
  if (!_.isNil(req.query.scale)) {
    req.query.scale = !_.isArray(req.query.scale) ? [req.query.scale] : req.query.scale;
  }
  const input = validateHelper.pick(req.query, rules);
  try {
    await inputCheck.validate(input, rules, res.validatorMessage);
  } catch (err) {
    return res.validateError(err);
  }

  // 附带内容
  const scopes = ['includeCountries', 'includeLocation', 'includeIndustries', 'includeEnterprise'];
  const filter = await res.paginatorHelper.initFilter(req.query);

  // 根据enterpriseId搜索
  if (!_.isNil(input.enterpriseId)) {
    filter.where.enterpriseId = input.enterpriseId;
  }
  // 四种搜索（地区，行业，规模，建立时间）
  if (!_.isNil(input.locationId)) {
    filter.where.locationId = {
      $in: input.locationId
    };
  }

  if (!_.isNil(input.industryId)) {
    filter.where.industryId = {
      $in: input.industryId
    };
  }

  if (!_.isNil(input.scale)) {
    filter.where.scale = {
      $in: input.scale
    };
  }

  if (!_.isNil(input.endFoundingDateSpan) && !_.isNil(input.startFoundingDateSpan)) {
    filter.where.foundingDate = {
      $between: [input.startFoundingDateSpan, input.endFoundingDateSpan]
    };
  }

  if (!_.isNil(input.isApproved)) {
    filter.where.isApproved = input.isApproved;
  }

  // sorting 默认是 createAt DESC 排序
  switch (input.sorting) {
    case 'createAtDESC':
      filter.order = [['createdAt', 'DESC']];
      break;
    case 'createAtASC':
      filter.order = [['createdAt', 'ASC']];
      break;
    case 'nameASC':
      filter.order = [['name', 'ASC']];
      break;
    case 'nameDESC':
      filter.order = [['name', 'DESC']];
      break;
    case 'foundingDateASC':
      filter.order = [['foundingDate', 'ASC']];
      break;
    case 'foundingDateDESC':
      filter.order = [['foundingDate', 'DESC']];
      break;
    case 'scaleASC':
      filter.order = [['scale', 'ASC']];
      break;
    case 'scaleDESC':
      filter.order = [['scale', 'DESC']];
      break;
    case 'viewASC':
      filter.order = [['view', 'ASC']];
      break;
    case 'viewDESC':
      filter.order = [['view', 'DESC']];
      break;
    default:
      filter.order = [['createdAt', 'DESC']];
      break;
  }

  try {
    // search相关内容搜索
    if (!_.isNil(input.search)) {
      const locationIds = [], industryIds = [];
      const location = await models.Location.findAll({
        where: {
          name: {
            $iLike: `%${input.search}%`
          }
        }
      });

      const industry = await models.Industry.findAll({
        where: {
          name: {
            $iLike: `%${input.search}%`
          }
        }
      });

      if (!_.isNull(location)) {
        _.filter(location, (o) => {
          return locationIds.push(+o.id);
        });
      }

      if (!_.isNull(industry)) {
        _.filter(industry, (o) => {
          return industryIds.push(+o.id);
        });
      }

      filter.where.$or = {
        name: {
          $iLike: `%${input.search}%`
        },
        industryId: {
          $in: industryIds
        },
        locationId: {
          $in: locationIds
        },
        description: {
          $iLike: `%${input.search}%`
        },
      }
    }
    const result = await models.Coc.scope(scopes).findAndCountAll(filter);

    return res.paginatorWithCount(result, {}, filter);
  } catch (err) {
    return next(err);
  }
}


async function show(req, res, next) {
  debug('Enter show method!');

  const scopes = ['includeIndustries', 'includeCountries', 'includeLocation'];
  if (req.params.adminId) scopes.push('includeEnterprise');

  const filter = {
    where: {
      id: req.params.cocId
    },
  };
  if (!_.isNil(req.params.isApproved)) filter.where.isApproved = req.params.isApproved;

  const t = await models.sequelize.transaction();
  try {
    const result = await models.Coc.scope(scopes).findOne(filter);
    if (_.isNull(result)) throw new MainError('coc', 'unApproved');
    // 公共路由进入点击+1
    if (!_.isNull(result) && req.params.clicked === true) {
      await result.updateAttributes({view: (result.view + 1)}, {transaction: t});
    }
    await t.commit();

    return res.item(result);
  } catch (err) {
    await t.rollback();
    return next(err);
  }
}


async function create(req, res, next) {
  debug('ENTER create method!');

  const rules = {
    enterpriseId: 'required|integer|min:1|exists:Enterprise,id',
    countryId: 'required|integer|min:1|exists:Country,id',
    industryId: 'required|integer|min:1|exists:Industry,id',
    name: 'required|string|min:1|unique:Coc,name',
    webDomain: 'nullable|string|min:1',
    foundingDate: 'required|date_iso8601',
    scale: 'required|string|in:30-50,50-100,100+',
    field: 'nullable|string|min:1',
    purpose: 'required|string|min:1',
    coverImage: 'nullable|string|min:1|max:255',
    qualifications: 'nullable|string|min:1|max:255',
    email: 'required|string|min:1|max:255',
    locationId: 'required|integer|exists:Location,id|min:1',
    contacts: 'required|string|min:1',
    phone: 'required|string|min:1',
    description: 'required|string',
    logo: 'nullable|string|min:1|max:255',
    address: 'required|string|min:1'
  };
  const input = validateHelper.pick(req.body, rules);
  try {
    await inputCheck.validate(input, rules, res.validatorMessage);
  } catch (err) {
    return res.validateError(err);
  }

  const t = await models.sequelize.transaction();
  try {

    // 判断location是否为最小分类
    if (!_.isNil(input.locationId)) {
      const location = await models.Location.findById(input.locationId);
      if (_.isNull(location) || _.isNil(location.parentId))
        throw new MainError('common', 'locationError');
    }

    const result = await models.Coc.create(input, {transaction: t});
    await t.commit();
    req.params.cocId = result.id;
    return show(req, res, next);

  } catch (err) {
    await t.rollback();
    return next(err);
  }
}


async function update(req, res, next) {
  debug('ENTER update method!');

  const rules = {
    countryId: 'nullable|integer|min:1|exists:Country,id',
    industryId: 'nullable|integer|min:1|exists:Industry,id',
    webDomain: 'nullable|string|min:1',
    foundingDate: 'nullable|date_iso8601',
    scale: 'nullable|string|in:30-50,50-100,100+',
    field: 'nullable|string|min:1',
    purpose: 'nullable|string|min:1',
    isApproved: 'nullable|boolean|in:true,false',
    locationId: 'nullable|integer|exists:Location,id|min:1',
    qualifications: 'nullable|string|min:1|max:255',
    description: 'nullable|string',
    phone: 'nullable|string|min:1|max:255',
    email: 'nullable|string|min:1|max:255',
    contacts: 'nullable|string|min:1|max:255',
    address: 'nullable|string|min:1',
    name: 'nullable|string|min:1',

  };
  const input = validateHelper.pick(req.body, rules);
  try {
    await inputCheck.validate(input, rules, res.validatorMessage);
  } catch (err) {
    return res.validateError(err);
  }

  const t = await models.sequelize.transaction();
  try {

    // 判断location是否为最小分类
    if (!_.isNil(input.locationId)) {
      const location = await models.Location.findById(input.locationId);
      if (_.isNull(location) || _.isNil(location.parentId))
        throw new MainError('common', 'locationError');
    }

    const result = await models.Coc.findById(req.params.cocId, {transaction: t});
    if (_.isNull(result)) throw new MainError('common', 'notFound');

    await result.updateAttributes(input, {transaction: t});
    await t.commit();

    req.params.cocId = result.id;

    return show(req, res, next);
  } catch (err) {
    await t.rollback();
    return next(err);
  }
}

async function destroy(req, res, next) {
  debug('Enter destroy method!');

  const t = await models.sequelize.transaction();
  try {
    const result = await models.Coc.findById(req.params.cocId, {transaction: t});
    if (_.isNull(result)) throw new MainError('common', 'notFound');

    await result.destroy({transaction: t});
    await t.commit();

    return res.return();
  } catch (err) {
    await t.rollback();
    return next(err);
  }
}

async function uploadLogo(req, res, next) {
  debug('ENTER upload logo method!');

  const rules = {
    file: 'required|array',
    'file.*': 'file|image',
    lang: 'nullable|string|min:1|in:en,hk,cn'
  };
  const input = validateHelper.pick(req.files, rules, ['file.*']);
  try {
    await inputCheck.validate(input, rules, res.validatorMessage);
  } catch (err) {
    return res.validateError(err);
  }

  const t = await models.sequelize.transaction();
  try {
    const coc = await models.Coc.findOne({where: {id: req.params.cocId}, transaction: t});
    if (_.isNull(coc)) throw new MainError('common', 'notFound');

    const fileKey = randomstring.generate(24);
    const extname = path.extname(input.file[0].originalname).toLowerCase();
    // 云地址
    const cloudPath = `/uploads/coc/${coc.id}/logo/${fileKey}${extname}`;

    // upload files
    await Storage.disk('local').put(input.file[0].path, cloudPath);
    // 只能保存一张logo
    await Storage.disk('local').delete(`/uploads/coc/${coc.id}/logo/${coc.logo}`);

    await coc.updateAttributes({logo: `${fileKey}${extname}`}, {transaction: t});
    await t.commit();


    req.params.cocId = coc.id;
    return show(req, res, next);
  } catch (err) {
    await t.rollback();
    return next(err);
  }

}


async function uploadCover(req, res, next) {
  debug('ENTER upload logo method!');

  const rules = {
    file: 'required|array',
    'file.*': 'file|image',
    lang: 'nullable|string|min:1|in:en,hk,cn'
  };
  const input = validateHelper.pick(req.files, rules, ['file.*']);
  try {
    await inputCheck.validate(input, rules, res.validatorMessage);
  } catch (err) {
    return res.validateError(err);
  }

  const t = await models.sequelize.transaction();
  try {
    const coc = await models.Coc.findOne({where: {id: req.params.cocId}, transaction: t});
    if (_.isNull(coc)) throw new MainError('common', 'notFound');

    const fileKey = randomstring.generate(24);
    const extname = path.extname(input.file[0].originalname).toLowerCase();
    // 云地址
    const cloudPath = `/uploads/coc/${coc.id}/coverImage/${fileKey}${extname}`;

    // upload files
    await Storage.disk('local').put(input.file[0].path, cloudPath);
    // 只能保存一张cover
    await Storage.disk('local').delete(`/uploads/coc/${coc.id}/coverImage/${coc.coverImage}`);
    await coc.updateAttributes({coverImage: `${fileKey}${extname}`}, {transaction: t});
    await t.commit();

    req.params.cocId = coc.id;
    return show(req, res, next);
  } catch (err) {
    await t.rollback();
    return next(err);
  }

}

async function uploadQualification(req, res, next) {
  debug('ENTER upload qualification method!');

  const rules = {
    enterpriseId: 'required|integer|min:1',
    cocId: 'required|integer|min:1',
    file: 'required|array|size:1',
    'file.*': 'required_if:file|file|image',
  };
  const input = validateHelper.pick(req.body, rules);
  debug('input', input);
  try {
    await inputCheck.validate(input, rules, res.validatorMessage);
  } catch (err) {
    return res.validateError(err);
  }
  const t = await models.sequelize.transaction();
  try {
    const result = await models.Coc.findOne({
      where: {id: input.cocId, enterpriseId: input.enterpriseId},
      transaction: t
    });
    if (_.isNull(result)) throw new MainError('common', 'notFound');

    const fileKey = randomstring.generate(24);
    const extname = path.extname(input.file[0].originalname).toLowerCase();
    const filename = path.basename(input.file[0].originalname, extname);
    // 文件存放在服务器的位置. ${extname}
    const cloudPath = `/uploads/coc/${result.id}/qualification/${fileKey}${extname}`;

    // upload files
    await Storage.disk('local').put(input.file[0].path, cloudPath);
    // 只能保存一张qualification
    await Storage.disk('local').delete(`/uploads/coc/${result.id}/qualification/${result.qualifications}`);

    await result.updateAttributes({qualifications: `${fileKey}${extname}`}, {transaction: t});
    await t.commit();

    return show(req, res, next);
  } catch (err) {
    await t.rollback();
    return next(err);
  }
}

async function isCocMember(req, res, next) {
  debug('ENTER isCocMember method!');

  const rules = {
    userId: 'required|integer|min:1',
    cocId: 'required|integer|min:1|exists:Coc,id'
  };
  const input = validateHelper.pick(req.query, rules);
  try {
    await inputCheck.validate(input, rules, res.validatorMessage);
  } catch (err) {
    return res.validateError(err);
  }

  try {
    const member = await models.Member.findOne({where: {userId: input.userId, cocId: input.cocId}});
    if (!_.isNull(member)) {
      return res.return({status: 'true'});
    }
    const candidate = await models.Candidate.findOne({
      where: {
        status: 'pending',
        cocId: input.cocId,
        userId: input.userId
      }
    });
    if (!_.isNull(candidate)) {
      if (candidate.type === 'appliy') {
        return res.return({status: 'applying'});
      } else {
        return res.return({status: 'invited'});
      }
    } else {
      return res.return({status: 'false'});
    }
  } catch (err) {
    return next(err);
  }
}

module.exports = {
  index,
  show,
  create,
  update,
  destroy,
  uploadLogo,
  uploadCover,
  uploadQualification,
  isCocMember
};
