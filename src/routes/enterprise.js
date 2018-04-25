// debug
const debug = require('debug')('APP:ENTERPRISE');

// model
const models = require('../models');

// validate
const inputCheck = require('input-check');
const validateHelper = require('../helpers/ValidateHelper');

// library
const _ = require('lodash');
const path = require('path');
const Storage = require('../modules/storage');
const randomstring = require("randomstring");



async function index(req, res, next) {
  const rules = {
    search: 'nullable|string|min:1',
  };
  const input = validateHelper.pick(req.query, rules);
  try {
    await inputCheck.validate(input, rules, res.validatorMessage);
  } catch (err) {
    return res.validateError(err);
  }
  const filter = await res.paginatorHelper.initFilter2(req.query);
  if (!_.isNil(input.search) && input.search !== '') {
    filter.where.$or = {
      lastName: {
        $iLike: `%${input.search}%`,
      },
      firstName: {
        $iLike: `%${input.search}%`,
      },
      email: {
        $iLike: `%${input.search}%`,
      },
    };
  }

  filter.order = [['createdAt', 'DESC']];
  // attribute handle
  filter.attributes = validateHelper.readAttributeFilter(req.query.attributes, models.Enterprise.getAttributes(), ['createdAt']);
  try {
    const result = await models.Enterprise.findAndCountAll(filter);
    return res.paginatorWithCount(result, {}, filter);
  } catch (err) {
    return next(err);
  }
}

async function show(req, res, next) {
  debug('Enter enterprise show method!');

  const filter = {
    where: {
      id: req.params.enterpriseId,
    },
  };
  // attribute handle
  filter.attributes = validateHelper.readAttributeFilter(req.query.attributes, models.Enterprise.getAttributes(), ['createdAt', 'enterpriseId']);
  try {
    const result = await models.Enterprise.findOne(filter);

    return res.item(result);
  } catch (err) {
    return next(err);
  }
}

async function create(req, res, next) {
  debug('ENTER create method!');

  const rules = {
    planId:'nullable|integer|exists:Plan,id',
    lastName: 'required|string|min:1',
    firstName: 'required|string|min:1',
    email: 'required|email|min:6',
    password: 'required|string|,min:6',
    active:'nullable|boolean',
    verifiedEmail:'required|boolean',
    emailToken:'string|max:255',
    languageId: 'nullable|integer|exists:Language,id',
    emailTokenUpdatedAt:'nullable|string',
    phone: 'nullable|string',
    timezone:'nullable|string|max:255',
    credit:'nullable|numeric|min:1',
    remark:'nullable|string'
  };

  const input = validateHelper.pick(req.body, rules);
  try {
    await inputCheck.validate(input, rules, res.validatorMessage);
  } catch (err) {
    return res.validateError(err);
  }

  const t = await models.sequelize.transaction();
  try {
    const result = await models.Enterprise.create(input, {transaction: t});
    await t.commit();
    req.params.enterpriseId = result.id;
    return show(req, res, next);
  } catch (err) {
    await t.rollback();
    return next(err);
  }
}

async function update(req, res, next) {
  const rules = {
    planId:'nullable|integer|exists:Plan,id',
    lastName: 'nullable|string|min:1',
    firstName: 'nullable|string|min:1',
    email: 'nullable|email|min:6',
    password: 'nullable|string|,min:6',
    active:'nullable|boolean',
    verifiedEmail:'nullable|boolean',
    emailToken:'nullable|string|max:255',
    languageId: 'nullable|integer|exists:Language,id',
    emailTokenUpdatedAt:'nullable|string',
    phone: 'required|string|min:1',
    timezone:'nullable|string|max:255',
    credit:'nullable|numeric|min:1',
    remark:'nullable|string'
  };
  const input = validateHelper.pick(req.body, rules, [], Object.keys(rules));
  try {
    await inputCheck.validate(input, rules, res.validatorMessage);
  } catch (err) {
    return res.validateError(err);
  }

  const t = await models.sequelize.transaction();
  try {
    const result = await models.Enterprise.findById(req.params.enterpriseId, {
      transaction: t
    });
    if (_.isNull(result)) throw new MainError('common', 'notFound');
    await result.updateAttributes(input, {transaction: t});
    await t.commit();

    req.params.enterpriseId = result.id;
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
    const userResult = await models.Enterprise.findById(req.params.enterpriseId, {transaction: t});
    if (_.isNull(userResult)) throw new MainError('common', 'notFound');

    await userResult.destroy({transaction: t});
    await t.commit();

    return res.return();
  } catch (err) {
    await t.rollback();
    return next(err);
  }
}


async function uploadID(req, res, next) {
  debug('ENTER upload logo method!');

  const rules = {
    type:'required|string',
    file: 'required|array',
    'file.*': 'required_if:file|image',
    enterpriseId:'required|integer|exists:Enterprise,id',
    lang: 'nullable|string|min:1|in:en,hk,cn'
  };
  const input = validateHelper.pick(req.body, rules, ['file.*']);
  try {
    await inputCheck.validate(input, rules, res.validatorMessage);
  } catch (err) {
    return res.validateError(err);
  }


  const t = await models.sequelize.transaction();
  try {

    if(input.file[0].size > 5000000) throw new MainError('common', 'pictureThan5M');

    const enterprise = await models.Enterprise.findOne({where: {id: input.enterpriseId}, transaction: t});
    if (_.isNull(enterprise)) throw new MainError('common', 'notFound');

    const fileKey = randomstring.generate(24);
    const extname = path.extname(input.file[0].originalname).toLowerCase();
    // 云地址
    const cloudPath = `/uploads/enterprise/${input.enterpriseId}/${input.type}/image/${fileKey}${extname}`;

    // upload files
    await Storage.disk('local').put(input.file[0].path, cloudPath);

    // 只能保存一张logo
    await enterprise.updateAttributes({[input.type]: `${fileKey}${extname}`}, {transaction: t});
    await t.commit();


    req.params.enterpriseId = enterprise.id;
    return show(req, res, next);
  } catch (err) {
    await t.rollback();
    return next(err);
  }

}



module.exports = {
  index,
  show,
  create,
  update,
  destroy,
  uploadID
};
