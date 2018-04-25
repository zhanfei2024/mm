const debug = require('debug')('APP:SLIDESHOW');

// model
const models = require('../../models');
const modelHelper = require('../../methods/model');


// validate
const inputCheck = require('input-check');
const validateHelper = require('../../helpers/ValidateHelper');

// library
const _ = require('lodash');
const path = require('path');
const randomstring = require("randomstring");
const Storage = require('../../modules/storage');




async function index(req, res, next) {
  debug('Enter index method!');

  const rules = {
    search: 'nullable|string|min:1|max:255',
    type: 'nullable|string|in:platform,coc',
    cocId: 'nullable|integer',
    enterpriseId: 'nullable|integer',
    isActive: 'nullable|boolean',
    cocName: 'nullable|string|min:1'
  };

  const input = validateHelper.pick(req.query, rules);
  try {
    await inputCheck.validate(input, rules, res.validatorMessage);
  } catch (err) {
    return res.validateError(err);
  }

  const filterScopes = [];
  const scopes = [];
  const filter = await res.paginatorHelper.initFilter(req.query);
  filter.order = [['order', 'DESC']];
  // 必须用isUndefined()方法 type为platform时 会传 null
  if (!_.isUndefined(req.query.cocId)) filter.where.cocId = req.query.cocId;
  if (!_.isUndefined(req.query.enterpriseId)) filter.where.enterpriseId = req.query.enterpriseId;
  if (!_.isNil(input.type)) filter.where.type = req.query.type;
  if (!_.isNil(input.isActive)) filter.where.isActive = req.query.isActive;
  if (!_.isNil(input.search)) filterScopes.push({ method: ['searchTitle', input.search] });
  // 有名称,搜索商会名称,否则只是附带商会信息
  if (!_.isNil(input.cocName)) {
    filterScopes.push({ method: ['includeCoc', input.cocName] });
  } else {
    filterScopes.push('includeCoc');
  }
  
  try {
    const result = await models.SlideShow.scope(filterScopes, scopes).findAndCountAll(filter);

    return res.paginatorWithCount(result, {}, filter);
  } catch (err) {
    return next(err);
  }
}

async function show(req, res, next) {
  debug('Enter show method!');

  const filter = {
    where: {
      id: req.params.slideShowId
    }
  };
  if (!_.isNil(req.params.cocId)) filter.where.cocId = req.params.cocId;
  if (!_.isNil(req.params.enterpriseId)) filter.where.enterpriseId = req.params.enterpriseId;


  try {
    const result = await models.SlideShow.findOne(filter);
    return res.item(result);
  } catch (err) {
    return next(err);
  }

}

async function create(req, res, next) {
  debug('Enter create method!');

  const rules = {
    type: 'required|string|in:platform,coc',
    enterpriseId: 'required_if:type,coc|integer|min:1',
    cocId: 'required_if:type,coc|integer|min:1',
    title: 'required|string|min:1|max:255',
    url: 'required|string|min:1|max:255',
    isActive: 'nullable|boolean',
    path: 'nullable|string|max:255',
    size: 'nullable|integer|min:0',
    name: 'nullable|string|max:255',
    key: 'nullable|string|max:255',
    extension: 'nullable|string|min:1|max:255',
    mime: 'nullable|string|min:1|max:255',
    order: 'required|integer|min:0',

  };

  const input = validateHelper.pick(req.body, rules);
  try {
    await inputCheck.validate(input, rules, res.validatorMessage);
  } catch (err) {
    return res.validateError(err);
  }
  const t = await models.sequelize.transaction();
  try {
    const result = await models.SlideShow.create(input, { transaction: t });
    await t.commit();
    req.params.slideShowId = result.id;

    return show(req, res, next);
  } catch (err) {
    await t.rollback();
    return next(err);
  }
}

async function update(req, res, next) {
  debug('Enter update method!');

  const rules = {
    type: 'nullable|string|in:platform,coc',
    cocId: 'required_if:type,coc|integer|min:0',
    enterpriseId: 'required_if:type,coc|integer|min:0',
    title: 'nullable|string|min:1|max:255',
    url: 'nullable|string|min:1|max:255',
    isActive: 'nullable|boolean',
    path: 'nullable|string|max:255',
    size: 'nullable|integer|min:0',
    name: 'nullable|string|max:255',
    key: 'nullable|string|max:255',
    extension: 'nullable|string|min:1|max:255',
    mime: 'nullable|string|min:1|max:255',
    order: 'nullable|integer|min:0'
  };

  const input = validateHelper.pick(req.body, rules, []);
  try {
    await inputCheck.validate(input, rules, res.validatorMessage);
  } catch (err) {
    return res.validateError(err);
  }

  const t = await models.sequelize.transaction();
  try {
    const result = await models.SlideShow.findById(req.params.slideShowId, {
      transaction: t
    });
    if (_.isNull(result)) throw new MainError('common', 'notFound');

    await result.updateAttributes(input, { transaction: t });
    await t.commit();

    req.params.slideShowId = result.id;

    return show(req, res, next);
  } catch (err) {
    await t.rollback();
    return next(err);
  }
}

async function destroy(req, res, next) {
  debug('Enter destroy method!');

  const filter = {
    where: {
      id: req.params.slideShowId
    }
  };
  if (!_.isNil(req.params.cocId)) filter.where.cocId = req.params.cocId;
  if (!_.isNil(req.params.enterpriseId)) filter.where.enterpriseId = req.params.enterpriseId;

  const t = await models.sequelize.transaction();
  try {
    const result = await models.SlideShow.findOne(filter, {
      transaction: t
    });
    if (_.isNull(result)) throw new MainError('common', 'notFound');
    await result.destroy({ transaction: t });
    await t.commit();

    return res.return();
  } catch (err) {
    await t.rollback();
    return next(err);
  }
}


async function uploadSlideShow(req, res, next) {
  debug('ENTER upload attachment method!');

  const rules = {
    file: 'required|array|size:1',
    'file.*': 'file|image',
  };
  const input = validateHelper.pick(req.files, rules);
  try {
    // 添加图片大小判断
    if (input.file[0].size > 5000000) throw new MainError('common', 'pictureThan5M');

    await inputCheck.validate(input, rules, res.validatorMessage);
  } catch (err) {
    return res.validateError(err);
  }
  const t = await models.sequelize.transaction();
  try {
    const result = await models.SlideShow.findOne({ where: { id: req.params.slideShowId }, transaction: t });
    if (_.isNull(result)) throw new MainError('common', 'notFound');

    const fileKey = randomstring.generate(24);
    const extname = path.extname(input.file[0].originalname).toLowerCase();
    const filename = path.basename(input.file[0].originalname, extname);
    // 文件存放在服务器的位置. ${extname}
    const cloudPath = `/uploads/slideShow/${result.id}/image/${fileKey}${extname}`;

    // upload files
    await Storage.disk('local').put(input.file[0].path, cloudPath);
    // 只能保存一张
    await Storage.disk('local').delete(`/uploads/slideShow/${result.id}/image/${result.key}.${result.extension}`);
        
    const attributes = {};
    //attributes.slideShowId = result.id;
    attributes.name = !_.isNil(req.body.name) ? req.body.name : filename;
    attributes.mime = input.file[0].mimetype;
    attributes.size = input.file[0].size;
    attributes.key = fileKey;
    attributes.extension = extname.substring(1);
    attributes.path = cloudPath;
    const slideShow = await result.updateAttributes(attributes, { transaction: t });
    await t.commit();
    req.params.slideShowId = slideShow.id;
    return show(req, res, next);
  } catch (err) {
    await t.rollback();
    return next(err);
  }
}

module.exports = {
  index,
  create,
  show,
  update,
  destroy,
  uploadSlideShow
};


