'use strict';

// core
const debug = require('debug')('APP:POST_IMAGE');

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

  const filter = await res.paginatorHelper.initFilter(req.query);
  filter.where.postId = req.params.postId;
  filter.where.isCover = false;

  try {
    const result = await models.PostImage.findAndCountAll(filter);
    return res.paginatorWithCount(result, {}, filter);
  } catch (err) {
    return next(err);
  }
}

async function show(req, res, next) {
  debug('Enter show method!');

  const filter = {
    where: {
      id: req.params.imageId,
      postId: req.params.postId,
      isCover: false
    }
  };

  try {
    const result = await models.PostImage.findOne(filter);
    return res.item(result);
  } catch (err) {
    return next(err);
  }
}

async function showCover(req, res, next) {
  debug('Enter showIcon method!');

  const filter = {
    where: {
      id: req.params.imageId,
      postId: req.params.postId,
      isCover: true
    }
  };

  try {
    const result = await models.PostImage.findOne(filter);
    return res.item(result);
  } catch (err) {
    return next(err);
  }
}

async function destroy(req, res, next) {
  debug('Enter destroy method!');

  const t = await models.sequelize.transaction();
  try {
    const result = await models.PostImage.findOne({
      where: {
        id: req.params.imageId,
        postId: req.params.postId,
      },
      transaction: t
    });
    if (result === null) throw new MainError('common', 'notFound');

    await result.destroy({
      transaction: t
    });
    await t.commit();

    return res.return();
  } catch (err) {
    await t.rollback();
    return next(err);
  }
}

async function uploadImage(req, res, next) {
  debug('Enter upload picture method!');

  const rules = {
    file: 'required|array|size:1',
    'file.*': 'file|image',
  };
  const input = _.pick(req.files, Object.keys(rules));
  try {
    // 添加图片大小判断
    if(input.file[0].size > 5000000) throw new MainError('common', 'pictureThan5M');

    await inputCheck.validate(input, rules, res.validatorMessage);
  } catch (err) {
    return res.validateError(err);
  }

  const t = await models.sequelize.transaction();
  try {
    const post = await models.Post.findOne({where: {id: req.params.postId}, transaction: t});
    if (_.isNull(post)) throw new MainError('common', 'notFound');

    const fileKey = randomstring.generate(24);
    const extname = path.extname(input.file[0].originalname).toLowerCase();
    const filename = path.basename(input.file[0].originalname, extname);
    // 文件存放在服务器的位置. ${extname}
    const cloudPath = `/uploads/post/${post.id}/image/${fileKey}/original${extname}`;

    // upload files
    await Storage.disk('local').put(input.file[0].path, cloudPath);
    
    // remove old cover if uploading cover
    if (req.body.isCover === true) {
      const postImage = await models.PostImage.findOne({
        where: {postId: post.id, isCover: true},
        transaction: t
      });
      if (!_.isNull(postImage)) {
        await postImage.destroy({transaction: t});
      }
    }

    const postImageAttributes = {};
    postImageAttributes.postId = post.id;
    postImageAttributes.name = !_.isNil(req.body.name) ? req.body.name : filename;
    postImageAttributes.mime = input.file[0].mimetype;
    postImageAttributes.size = input.file[0].size;
    postImageAttributes.key = fileKey;
    postImageAttributes.isCover = req.body.isCover === true;
    postImageAttributes.extension = extname.substring(1);
    const result = await models.PostImage.create(postImageAttributes, {transaction: t});
    await t.commit();

    req.params.imageId = result.id;
    if (result.isCover) return showCover(req, res, next);

    return show(req, res, next);
  } catch (err) {
    await t.rollback();
    return next(err);
  }
}

async function uploadCover(req, res, next) {
  req.body.isCover = true;
  return uploadImage(req, res, next);
}

async function uploadImages(req, res, next) {
  req.body.isCover = false;
  return uploadImage(req, res, next);
}


module.exports = {
  index,
  show,
  destroy,
  uploadCover,
  uploadImages
};
