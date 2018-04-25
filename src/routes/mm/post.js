'use strict';

// core
const debug = require('debug')('APP:POST');

const fs = require('fs');

// model
const models = require('../../models');
const randomstring = require("randomstring");
const commonConfig = require('../../config/common');
const Storage = require('../../modules/storage');

// method
const modelHelper = require('../../methods/model');


// library
const _ = require('lodash');
const moment = require('moment');
const pathHelper = require('path');
const inputCheck = require('input-check');
const validateHelper = require('../../helpers/ValidateHelper');
const tag = require('../../methods/TagMethod');
const stringHelper = require('../../helpers/StringHelper');

async function index(req, res, next) {
  debug('ENTER index method!');

  if (!_.isNil(req.query.categoryIds)) {
    req.query.categoryIds = !_.isArray(req.query.categoryIds) ? [req.query.categoryIds] : req.query.categoryIds;
  }

  const rules = {
    enterpriseId: 'nullable|integer|min:1|exists:Enterprise,id',
    cocId: 'nullable|integer|min:1|exists:Coc,id',
    categoryIds: 'nullable|array',
    'categoryIds.*': 'required_if:categoryIds|integer|min:1',
    sorting: 'nullable|in:featured,newest,popular',
    search: 'nullable|string|min:1',
    isApproved: 'nullable|boolean',
    isActive: 'nullable|boolean',
    isPublic: 'nullable|boolean',
    tags: 'nullable|string|min:1',
    cocName: 'nullable|string|min:1',
    title: 'nullable|string|min:1'
  };
  const input = validateHelper.pick(req.query, rules, ['categoryIds.*']);
  try {
    await inputCheck.validate(input, rules, res.validatorMessage);
  } catch (err) {
    return res.validateError(err);
  }

  try {
    const scopes = ['includeCover', 'includeCategories', 'includeCoc'];
    const filterScopes = [];

    const filter = await res.paginatorHelper.initFilter(req.query);
    if (!_.isNil(input.search)) {
      filter.where.$or = {
        title: {
          $iLike: '%' + input.search + '%'
        }
      };
    }

    if (!_.isNil(input.tags)) {
      const key = input.tags.split(',');
      const orCondition = [];
      _.each(key, function (str) {
        str = stringHelper.slugify(str);
        orCondition.push({
          slug: {
            $iLike: `%${str}%`
          }
        })
      });
      const tagResult = await models.Tag.findAll({
        attributes: ['id'],
        where: {
          $or: orCondition
        }
      });
      scopes.push({method: ['includePostTagsWithSearch', tagResult]});
    }

    if (!_.isNil(input.isApproved)) filter.where.isApproved = input.isApproved;
    if (!_.isNil(input.isActive)) filter.where.isActive = input.isActive;
    if (!_.isNil(input.isPublic)) filter.where.isPublic = input.isPublic;
    if (!_.isNil(input.cocId)) filter.where.cocId = input.cocId;
    if (!_.isNil(input.enterpriseId)) filter.where.enterpriseId = input.enterpriseId;

    if (!_.isNil(input.categoryIds)) filterScopes.push({method: ['includeCategoriesWithSearch', input.categoryIds]});
    if (!_.isNil(input.cocName)) {
      filterScopes.push({method: ['includeCocWithSearch', input.cocName]});
      scopes.pop();
    }
    if (!_.isNil(input.title)) filter.where.title = {$iLike: `%${input.title}%`};
    if (!_.isNil(input.sorting)) {
      switch (input.sorting) {
        case 'popular':
          filter.order = [['view', 'DESC']];
          break;
        case 'featured':
          filter.order = [['isFeatured', 'DESC'], ['createdAt', 'DESC']];
          break;
        default:
          filter.order = [['createdAt', 'DESC']];
          break;
      }
    }

    const result = await models.Post.scope(filterScopes, scopes).findAndCountAll(filter);

    return res.paginatorWithCount(result, {}, filter);
  } catch (err) {
    return next(err);
  }
}


async function show(req, res, next) {
  debug(`ENTER show method!`);

  const rules = {
    enterpriseId: 'nullable|integer|min:1|exists:Enterprise,id',
    cocId: 'nullable|integer|min:1|exists:Coc,id',
    isApproved: 'nullable|boolean',
    isActive: 'nullable|boolean',
    isPublic: 'nullable|boolean',
  };
  const input = validateHelper.pick(req.params, rules);
  try {
    await inputCheck.validate(input, rules, res.validatorMessage);
  } catch (err) {
    return res.validateError(err);
  }

  const filter = {where: {id: req.params.postId}};
  const scopes = ['includeCover', 'includeCategories', 'includePostTags', 'includeCoc'];
  if (!_.isNil(input.cocId)) filter.where.cocId = input.cocId;
  if (!_.isNil(input.isActive)) filter.where.isActive = input.isActive;
  if (!_.isNil(input.isApproved)) filter.where.isApproved = input.isApproved;
  if (!_.isNil(input.isPublic)) filter.where.isPublic = input.isPublic;
  if (!_.isNil(input.enterpriseId)) filter.where.enterpriseId = input.enterpriseId;

  const t = await models.sequelize.transaction();
  try {
    const result = await models.Post.scope(scopes).findOne(filter, {transaction: t});
    // 公共路由进入点击数+1
    if (result && true === req.query.clicked) {
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
  debug(`ENTER create method!`);

  const rules = {
    enterpriseId: 'required|integer|min:1|exists:Enterprise,id',
    cocId: 'required|integer|min:1|exists:Coc,id',
    title: 'required|string|min:1',
    content: 'required|string|min:1',
    isPublic: 'required|boolean',
    isApproved: 'nullable|boolean',
    isActive: 'nullable|boolean',
    isFeatured: 'nullable|boolean',
    tags: 'array',
    'tags.*.name': 'required_if:tags|string',
    categoryIds: 'array',
    'categoryIds.*': 'required_if:categoryIds|integer'
  };
  const input = validateHelper.pick(req.body, rules, ['tags.*', 'categoryIds.*']);
  try {
    await inputCheck.validate(input, rules, res.validatorMessage);
  } catch (err) {
    return res.validateError(err);
  }

  const t = await models.sequelize.transaction();
  try {

    // 验证，商会是否通过审核
    if (!_.isNil(input.cocId)) {
      const checkCoc = await models.Coc.findOne({
        where: {
          id: input.cocId,
          isApproved: true
        }
      }, {transaction: t});
      if (_.isNull(checkCoc)) throw new MainError('coc', 'applyCoc');
    }

    if (!_.isNil(input.title)) input.slug = stringHelper.slugify(input.title);
    if (!_.isNil(input.content)) input.content = await imageBase64CovertUrl(input.content);

    const result = await models.Post.create(input, {transaction: t});

    if (!_.isNil(input.categoryIds)) {
      const categories = await models.PostCategory.findAll({
        where: {
          id: input.categoryIds,
          parentId: {
            $ne: null
          }
        }
      });
      if (categories.length !== input.categoryIds.length) throw new MainError('post', 'postCategoryNotExists');
      await result.setCategories(categories, {transaction: t});
    }

    if (!_.isNil(input.tags)) await tag.retag('PostTag', result.id, _.map(input.tags, 'name'));
    await t.commit();

    req.params.postId = result.id;
    return show(req, res, next);
  } catch (err) {
    await t.rollback();
    return next(err);
  }

}

async function update(req, res, next) {
  debug(`ENTER update method!`);

  const rules = {
    enterpriseId: 'nullable|integer|min:1|exists:Enterprise,id',
    cocId: 'nullable|integer|min:1|exists:Coc,id',
    title: 'nullable|string|min:1',
    content: 'nullable|string|min:1',
    tags: 'nullable|array',
    'tags.*.name': 'required_if:tags|string',
    categoryIds: 'nullable|array',
    'categoryIds.*': 'required_if:categoryIds|integer',
    isApproved: 'nullable|boolean',
    isFeatured: 'nullable|boolean',
    isActive: 'nullable|boolean',
    isPublic: 'nullable|boolean',
  };
  debug(req.body,"444444444444444444")
  const input = validateHelper.pick(req.body, rules, ['tags.*', 'categoryIds.*']);
  try {
    await inputCheck.validate(input, rules, res.validatorMessage);
  } catch (err) {
    return res.validateError(err);
  }

  const t = await models.sequelize.transaction();
  try {
    const result = await models.Post.findById(req.params.postId);
    if (_.isNull(result)) throw new MainError('common', 'notFound');

    if (!_.isNil(input.categoryIds)) {
      const categories = await models.PostCategory.findAll({
        where: {
          id: input.categoryIds,
          parentId: {
            $ne: null
          }
        }
      });
      if (categories.length !== input.categoryIds.length) throw new MainError('post', 'postCategoryNotExists');
      await result.setCategories(categories, {transaction: t});
    }

    if (!_.isNil(input.title)) input.slug = stringHelper.slugify(input.title);
    if (!_.isNil(input.content)) input.content = await imageBase64CovertUrl(input.content);
    if (input.isActive === false) input.isFeatured = false;

    await result.updateAttributes(_.omit(input, ['categoryIds', 'tags']), {transaction: t});
    if (!_.isNil(input.tags)) await tag.retag('Post', result.id, _.map(input.tags, 'name'));
    await t.commit();

    req.params.postId = result.id;
    return show(req, res, next);
  } catch (err) {
    await t.rollback();
    return next(err);
  }
}

async function destroy(req, res, next) {
  debug('ENTER destroy method!');

  const t = await models.sequelize.transaction();
  try {
    const result = await models.Post.findById(req.params.postId);
    if (_.isNull(result)) throw new MainError('common', 'notFound');

    await result.destroy({transaction: t});
    await t.commit();

    return res.return();
  } catch (err) {
    await t.rollback();
    return next(err);
  }
}

async function imageBase64CovertUrl(content) {
  debug('Image base64 covert url');

  try {
    // get image base64 data
    const src = content.match(/<img.*?src="(data:image\/.*?;base64,.*?)".*?>/g);
    if (!_.isNull(src)) {
      const datas = [];

      for (let i = 0; i < src.length; i++) {
        let dataSrc = src[i].replace(/^<img.*?src="data:image\/.*?;base64,/, '');
        let data = dataSrc.replace(/["]/g, '');
        let fileKey = randomstring.generate(24);
        let imagePath = `.tmp/${fileKey}.png`;

        // image base64 convert
        fs.writeFileSync(imagePath, data, {encoding: 'base64'}, function (err) {
          //Finished
          if (err) throw new MainError('common', 'notFound');
        });
        let cloudPath = `uploads/post/static/${moment().format('YYYY')}/${moment().format('MM')}/${fileKey}.png`;

        // upload files
        await Storage.disk('local').put(`.tmp/${fileKey}.png`, cloudPath);
        // 替换内容
        datas.push(src[i].replace(/src="(data:image\/.*?;base64,.*?)"/, `src="${commonConfig.sourceUrl}/files/w1024/${cloudPath}"`));
        // 删除文件
        // fs.unlinkSync(imagePath);
      }

      // 替换内容
      if (datas.length > 0) {
        let i = 0;
        let newContent = content.replace(/<img.*?src="(data:image\/.*?;base64,.*?)".*?>/gi, function () {
          return datas[i++];
        });
        content = newContent;
      }
    }
    return Promise.resolve(content);
  } catch (err) {
    return Promise.reject(err);
  }
}


module.exports = {
  index,
  show,
  create,
  update,
  destroy
};
