const debug = require('debug')('APP:LINK');

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
    isActive: 'nullable|boolean'
  };
  const input = validateHelper.pick(req.query, rules);
  try {
    await inputCheck.validate(input, rules, res.validatorMessage);
  } catch (err) {
    return res.validateError(err);
  }

  const filter = await res.paginatorHelper.initFilter2(req.query);

  if (input.isActive) {
    filter.where.isActive = input.isActive;
  }

  filter.order = [['order', 'DESC']];
  try {
    const result = await modelHelper.findAll('Link', [], filter, []);

    return res.paginatorLimitPlusStyle(result, {}, filter);
  } catch (err) {
    return next(err);
  }
}

async function show(req, res, next) {
  debug('Enter show method!');

  const filter = {
    where: {
      id: req.params.linkId
    }
  };
  try {
    const result = await models.Link.findOne(filter);
    return res.item(result);
  } catch (err) {
    return next(err);
  }

}

async function create(req, res, next) {
  debug('Enter create method!');

  const rules = {
    title: 'required|string|min:1|max:255',
    linkUrl: 'required|string|min:1|max:255',
    logo: 'nullable|string|min:1|max:255',
    contacts: 'required|string|min:1|max:255',
    phone: 'required|string|min:1|max:255',
    isActive: 'nullable|boolean',
    order: 'nullable|integer|min:0',
    createdAt: 'nullable|date_iso8601',
    updatedAt: 'nullable|date_iso8601',
    file: 'nullable|array',
    'file.*': 'file|image'
  };

  const input = validateHelper.pick(req.body, rules, ['file.*']);
  try {
    await inputCheck.validate(input, rules, res.validatorMessage);
  } catch (err) {
    return res.validateError(err);
  }
  const t = await models.sequelize.transaction();
  try {
    const result = await models.Link.create(input, {transaction: t});
    await t.commit();

    req.params.linkId = result.id;
  } catch (err) {
    await t.rollback();
    return next(err);
  }
  if (!_.isEmpty(input.file)) {
    return uploadLogo(req, res, next);
  } else {
    return show(req, res, next);
  }
}

async function update(req, res, next) {
  debug('Enter update method!');

  const rules = {
    title: 'nullable|string|min:1|max:255',
    linkUrl: 'nullable|string|min:1|max:255',
    contacts: 'nullable|string|min:1|max:255',
    phone: 'nullable|string|min:1|max:255',
    isActive: 'nullable|boolean',
    order: 'nullable|integer|min:0',
    file: 'nullable|array',
    'file.*': 'file|image'
  };

  const input = validateHelper.pick(req.body, rules, [], Object.keys(rules));
  try {
    await inputCheck.validate(input, rules, res.validatorMessage);
  } catch (err) {
    return res.validateError(err);
  }

  const t = await models.sequelize.transaction();
  try {
    const result = await models.Link.findById(req.params.linkId, {
      transaction: t
    });
    if (_.isNull(result)) throw new MainError('common', 'notFound');
    await result.updateAttributes(input, {transaction: t});
    await t.commit();

    req.params.linkId = result.id;

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
      id: req.params.linkId
    }
  };
  const t = await models.sequelize.transaction();
  try {
    const result = await models.Link.findOne(filter, {
      transaction: t
    });
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
    'file.*': 'file|image'
  };
  const input = validateHelper.pick(req.body, rules, ['file.*']);
  try {
    await inputCheck.validate(input, rules, res.validatorMessage);
  } catch (err) {
    return res.validateError(err);
  }

  const t = await models.sequelize.transaction();
  try {
    const link = await models.Link.findOne({
      where: {
        id: req.params.linkId
      },
      transaction: t
    });
    if (_.isNull(link)) throw new MainError('common', 'notFound');

    const fileKey = randomstring.generate(24);
    const extname = path.extname(input.file[0].originalname).toLowerCase();
    // 云地址
    const cloundPath = `/uploads/link/${link.id}/image/${fileKey}${extname}`;
    // upload files
    await Storage.disk('local').put(input.file[0].path, cloundPath);
    // 只能保存一张
    await Storage.disk('local').delete(`/uploads/link/${link.id}/image/${link.logo}`);

    await link.updateAttributes({logo: `${fileKey}${extname}`}, {transaction: t});
    await t.commit();

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
  uploadLogo
}


