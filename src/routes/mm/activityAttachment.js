'use strict';

// core
const debug = require('debug')('APP:ACTIVITY_FILE');

// model
const models = require('../../models');

// library
const _ = require('lodash');
const path = require('path');
const randomstring = require("randomstring");

const Storage = require('../../modules/storage');
const inputCheck = require('input-check');
const validateHelper = require('../../helpers/ValidateHelper');


async function index(req, res, next) {
  debug('Enter index method!');

  const rules = {
    search: 'nullable|string|min:1',
    activityId: 'nullable|integer|min:1|exists:Activity,id',
  };
  const input = validateHelper.pick(req.query, rules);
  try {
    await inputCheck.validate(input, rules, res.validatorMessage);
  } catch (err) {
    return res.validateError(err);
  }

  const filter = await res.paginatorHelper.initFilter(req.query);

  if (!_.isNil(input.search) && !_.isNil(input.search)) {
    filter.where.$or = {
      name: {
        $iLike: '%' + input.search + '%'
      }
    };
  }
  if (!_.isNil(input.activityId)) filter.where.activityId = input.activityId;

  try {
    const result = await models.ActivityFile.findAndCountAll(filter);
    return res.paginatorWithCount(result, {}, filter);
  } catch (err) {
    return next(err);
  }
}

async function show(req, res, next) {
  debug('Enter show method!');

  const filter = {
    where: {
      id: req.params.attachmentId
    }
  };

  try {
    const result = await models.ActivityFile.findOne(filter);
    return res.item(result);
  } catch (err) {
    return next(err);
  }
}


async function destroy(req, res, next) {
  debug('Enter destroy method!');

  const t = await models.sequelize.transaction();
  try {
    const result = await models.ActivityFile.findOne({
      where: {
        id: req.params.attachmentId,
      },
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


async function uploadAttachment(req, res, next) {
  debug('ENTER upload attachment method!');

  const rules = {
    type: 'required|string|in:cover,file',
    file: 'required|array|size:1',
    'file.*': 'required_if:file',
  };
  const input = validateHelper.pick(req.body, rules, ['file.*']);
  try {
    // 添加图片大小判断
    if(input.file[0].size > 5000000) throw new MainError('common', 'pictureThan5M');

    await inputCheck.validate(input, rules, res.validatorMessage);
  } catch (err) {
    return res.validateError(err);
  }
  const t = await models.sequelize.transaction();
  try {
    const result = await models.Activity.findOne({where: {id: req.params.activityId}, transaction: t});
    if (_.isNull(result)) throw new MainError('common', 'notFound');

    const fileKey = randomstring.generate(24);
    const extname = path.extname(input.file[0].originalname).toLowerCase();
    const filename = path.basename(input.file[0].originalname, extname);
    // 文件存放在服务器的位置. ${extname}
    const cloudPath = `/uploads/activity/${result.id}/file/${fileKey}/${filename}${extname}`;

    // upload files
    await Storage.disk('local').put(input.file[0].path, cloudPath);

    const attributes = {};
    attributes.activityId = result.id;
    attributes.type = input.type;
    attributes.name = !_.isNil(req.body.name) ? req.body.name : filename;
    attributes.mime = input.file[0].mimetype;
    attributes.size = input.file[0].size;
    attributes.key = fileKey;
    attributes.extension = extname.substring(1);
    
    const activity = await models.ActivityFile.create(attributes, {transaction: t});
    await t.commit();

    req.params.attachmentId = activity.id;
    return show(req, res, next);
  } catch (err) {
    await t.rollback();
    return next(err);
  }
}

module.exports = {
  index,
  show,
  destroy,
  uploadAttachment
};
