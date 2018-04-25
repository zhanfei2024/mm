'use strict';

// core
const debug = require('debug')('APP:COC_FILE');

// model
const models = require('../../models');

// library
const _ = require('lodash');
const path = require('path');
const randomstring = require('randomstring');
const validateHelper = require('../../helpers/ValidateHelper');
const Storange = require('../../modules/storage');
const inputCheck = require('input-check');

async function index(req, res, next) {
  debug('Enter index method');

  const filter = await res.paginatorHelper.initFilter(req.query);
  filter.where.cocId = req.params.cocId;

  try {
    const result = await models.CocFile.findAndCount(filter);
    return res.paginatorWithCount(result, {}, filter);
  } catch (err) {
    return next(err);
  }

}

async function show(req, res, next) {
  debug('Enter show method');

  const filter = {
    where: {
      id: req.params.cocFileId,
      cocId: req.params.cocId,
    }
  };

  try {
    const result = await models.CocFile.findOne(filter);
    return res.item(result);
  } catch (err) {
    return next(err);
  }

}


async function uploadFile(req, res, next) {
  debug('Enter uploadFile method');

  const rules = {
    file: 'required|array|size:1',
    'file.*': 'file'
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
    if (_.isNull(coc)) throw new MainError('commom', 'notFound');

    const fileKey = randomstring.generate(24);
    const extname = path.extname(input.file[0].originalname).toLowerCase();
    const filename = path.basename(input.file[0].originalname, extname);


    // 文件存放在服务器的位置
    const cloudPath = `/uploads/coc/${coc.id}/file/${fileKey}${extname}`;

    // upload files
    await Storange.disk('local').put(input.file[0].path, cloudPath);


    const cocFileAttributes = {};
    cocFileAttributes.cocId = coc.id;
    cocFileAttributes.type = "file";
    cocFileAttributes.path = cloudPath;
    cocFileAttributes.size = input.file[0].size;
    cocFileAttributes.name = filename;
    cocFileAttributes.key = fileKey;
    cocFileAttributes.extension = extname.substring(1);
    cocFileAttributes.mime = input.file[0].mimetype;


    const result = await models.CocFile.create(cocFileAttributes, {transaction: t});
    await t.commit();


    req.params.cocFileId = result.id;
    return show(req, res, next);
  } catch (err) {
    await t.rollback();
    return next(err);
  }
}

async function uploadImage(req, res, next) {
  debug('Enter uploadImage method');

  const rules = {
    file: 'required|array|size:1',
    'file.*': 'file|image'
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
    if (_.isNull(coc)) throw new MainError('commom', 'notFound');

    const fileKey = randomstring.generate(24);
    const extname = path.extname(input.file[0].originalname).toLowerCase();
    const filename = path.basename(input.file[0].originalname, extname);


    // 文件存放在服务器的位置
    const cloudPath = `/uploads/coc/${coc.id}/image/${fileKey}${extname}`;

    // upload files
    await Storange.disk('local').put(input.file[0].path, cloudPath);

    const cocFileAttributes = {};
    cocFileAttributes.cocId = coc.id;
    cocFileAttributes.type = "picture";
    cocFileAttributes.path = cloudPath;
    cocFileAttributes.size = input.file[0].size;
    cocFileAttributes.name = filename;
    cocFileAttributes.key = fileKey;
    cocFileAttributes.extension = extname.substring(1);
    cocFileAttributes.mime = input.file[0].mimetype;

    const result = await models.CocFile.create(cocFileAttributes, {transaction: t});
    await t.commit();

    req.params.cocFileId = result.id;
    return show(req, res, next);
  } catch (err) {
    await t.rollback();
    return next(err);
  }
}


module.exports = {
  index,
  show,
  uploadFile,
  uploadImage
};









