const debug = require('debug')('APP:USER_PROFILE');

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


async function show(req, res, next) {
  debug('ENTER show method!');

  const filter = {
    where: {
      userId: req.params.userId
    }
  };
  if (req.params.isAvatar === true) {
    filter.attributes = ['id', 'avatar'];
  }
  const scopes = ['includeCountry'];
  try {
    const result = await models.UserProfile.scope(scopes).findOne(filter);
    return res.item(result);
  } catch (err) {
    return next(err);
  }
}

async function create(req, res, next) {
  debug('ENTER create method!');

  const rules = {
    userId: 'required|integer|min:1|exists:User,id',
    countryId: 'required|integer|exists:Country,id',
    name: 'required|string|max:255',
    IDNumber: 'required|string|max:255',
    gender: 'required|in:M,F',
    phone: 'nullable|string|max:255',
    age:'required|string|min:1',
    IDType:'required|string|in:id,pass,passport,driver',
    description: 'nullable|string',
    email: 'required|string|min:1',
    remark: 'nullable|string'

  };
  const input = validateHelper.pick(req.body, rules);
  try {
    await inputCheck.validate(input, rules, res.validatorMessage);
  } catch (err) {
    return res.validateError(err);
  }

  const t = await models.sequelize.transaction();
  try {
    let result = await models.UserProfile.findOne({ where: { userId: input.userId }});
    if(!_.isNull(result)) {
      throw new MainError('user', 'userProfileExists');
    }
    result = await models.UserProfile.create(input, { transaction: t });
    await t.commit();

    req.params.userId = result.userId;
    req.params.userProfileId = result.id;

    return show(req, res, next);
  } catch (err) {
    await t.rollback();
    return next(err);
  }
}

async function update(req, res, next) {
  debug('ENTER update method!');

  const rules = {
    userId: 'nullable|integer|min:1|exists:User,id',
    countryId: 'nullable|integer|exists:Country,id',
    name: 'nullable|string|max:255',
    IDNumber: 'nullable|string|max:255',
    gender: 'nullable|in:M,F',
    phone: 'nullable|string|max:255',
    age: 'nullable|string|min:1',
    IDType: 'nullable|string|in:id,pass,passport,driver',
    description: 'nullable|string',
    email: 'nullable|string|min:1',
    remark: 'nullable|string'
  };
  const filter = {
    where: {
      userId: req.body.userId
    }
  };
  const input = validateHelper.pick(req.body, rules, [], Object.keys(rules));
  try {
    await inputCheck.validate(input, rules, res.validatorMessage);
  } catch (err) {
    return res.validateError(err);
  }

  const t = await models.sequelize.transaction();
  try {
    const result = await models.UserProfile.findOne(filter, {
      transaction: t
    });
    if (_.isNull(result)) throw new MainError('common', 'notFound');

    await result.updateAttributes(input, { transaction: t });
    await t.commit();

    req.params.userId = result.userId;
    req.params.userProfileId = result.id;

    return show(req, res, next);
  } catch (err) {
    await t.rollback();
    return next(err);
  }
}

async function avatar(req, res, next) {
  debug('ENTER upload avatar method!');

  const rules = {
    file: 'required|array',
    'file.*': 'file|image',
    lang: 'nullable|string|min:1|in:en,hk,cn'
  };
  const input = validateHelper.pick(req.files, rules, ['file.*']);
  try {
    // 添加图片大小判断
    if(input.file[0].size > 5000000) throw new MainError('common', 'pictureThan5M');

    await inputCheck.validate(input, rules, res.validatorMessage);
  } catch (err) {
    return res.validateError(err);
  }

  const t = await models.sequelize.transaction();
  try {
    const userProfile = await models.UserProfile.findOne({
      where: {
        userId: req.params.userId
      },
      transaction: t
    });
    if (_.isNull(userProfile)) throw new MainError('common', 'notFound');

    const fileKey = randomstring.generate(24);
    const extname = path.extname(input.file[0].originalname).toLowerCase();

    // 云地址
    const cloudPath = `/uploads/userProfile/${userProfile.id}/image/${fileKey}${extname}`;

    // upload files
    await Storage.disk('local').put(input.file[0].path, cloudPath);
    // await Storage.disk('local').delete(`/uploads/userProfile/${userProfile.id}/image/${userProfile.avatar}`);

    // 只能保存一张头像
    await userProfile.updateAttributes({ avatar: `${fileKey}${extname}` }, { transaction: t });
    await t.commit();

    req.query.userId = userProfile.userId;
    req.query.userProfileId = userProfile.id;

    return show(req, res, next);
  } catch (err) {
    await t.rollback();
    return next(err);
  }

}

module.exports = {
  create,
  show,
  update,
  avatar
};


