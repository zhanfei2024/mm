const debug = require('debug')('APP:JOINTWORK');

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
    search: 'nullable|string|min:1',
    enterpriseId: 'nullable|integer|min:1',
    cocId: 'required|integer|min:1',
    sorting: 'nullable|string|in:orderDESC,orderASC,createdAtDESC,createdAtASC'
  };

  const input = validateHelper.pick(req.query, rules);
  try {
    await inputCheck.validate(input, rules, res.validatorMessage);
  } catch (err) {
    return res.validateError(err);
  }

  const filter = await res.paginatorHelper.initFilter2(req.query);

  if (!_.isNil(input.search)) {
    filter.where.title = {$iLike: `%${input.search}%`};
  }

  if (!_.isNil(input.cocId)) {
    filter.where.cocId = input.cocId;
  }

  if (!_.isNil(input.enterpriseId)) {
    filter.where.enterpriseId = input.enterpriseId;
  }

  switch (rules.sorting) {
    case 'orderASC':
      filter.order = [['order', 'ASC']];
      break;
    case 'createdAtDESC':
      filter.order = [['createdAt', 'DESC']];
      break;
    case 'createdAtASC':
      filter.order = [['createdAt', 'ASC']];
      break;
    default:
      filter.order = [['order', 'DESC']];
      break;
  }
  try {
    const result = await modelHelper.findAll('JointWork', [], filter, []);

    return res.paginatorLimitPlusStyle(result, {}, filter);
  } catch (err) {
    return next(err);
  }
}

async function show(req, res, next) {
  debug('Enter show method!');

  const filter = {
    where: {
      id: req.params.jointWorkId,
      cocId: req.params.cocId,
      enterpriseId: req.params.enterpriseId
    }
  };

  try {
    const result = await models.JointWork.findOne(filter);
    return res.item(result);
  } catch (err) {
    return next(err);
  }

}

async function create(req, res, next) {
  debug('Enter create method!');

  const rules = {
    cocId: 'required|integer|min:0|exists:Coc,id',
    enterpriseId: 'required|integer|min:0',
    title: 'required|string|min:1|max:255',
    jointWorkCocId: 'required|integer|min:0|exists:Coc,id',
    linkUrl: 'required|string|min:1|max:255',
    order: 'nullable|integer|min:0',
    isActive: 'nullable|boolean',
  };

  const input = validateHelper.pick(req.body, rules);
  try {
    await inputCheck.validate(input, rules, res.validatorMessage);
    if (input.cocId === input.jointWorkCocId) throw new MainError('jointWork', 'isSelf');
  } catch (err) {
    return res.validateError(err);
  }
  const t = await models.sequelize.transaction();
  try {
    // 防止添加一个商会多次
    const jointWorkCoc = await models.JointWork.findOne({
      where: {
        cocId: input.cocId,
        enterpriseId: input.enterpriseId,
        jointWorkCocId: input.jointWorkCocId
      }
    });
    if (!_.isNull(jointWorkCoc)) throw new MainError('jointWork', 'jointedCoc');
    const result = await models.JointWork.create(input, {transaction: t});
    await t.commit();

    req.params.jointWorkId = result.id;
    req.params.enterpriseId = result.enterpriseId;

    return show(req, res, next);
  } catch (err) {
    await t.rollback();
    return next(err);
  }
}

async function update(req, res, next) {
  debug('Enter update method!');

  const rules = {
    title: 'nullable|string|min:1|max:255',
    linkUrl: 'nullable|string|min:1|max:255',
    logo: 'nullable|string|min:1|max:255',
    order: 'nullable|integer|min:0',
    isActive: 'nullable|boolean',
  };

  const input = validateHelper.pick(req.body, rules, [], Object.keys(rules));
  try {
    await inputCheck.validate(input, rules, res.validatorMessage);
  } catch (err) {
    return res.validateError(err);
  }

  const t = await models.sequelize.transaction();
  try {
    const result = await models.JointWork.findOne({
      where: {
        id: req.params.jointWorkId,
        cocId: req.params.cocId,
        enterpriseId: req.params.enterpriseId
      }
    }, {
      transaction: t
    });
    if (_.isNull(result)) throw new MainError('common', 'notFound');
    await result.updateAttributes(input, {transaction: t});
    await t.commit();

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
      id: req.params.jointWorkId,
      cocId: req.params.cocId,
      enterpriseId: req.params.enterpriseId
    }
  };
  const t = await models.sequelize.transaction();
  try {
    const result = await models.JointWork.findOne(filter, {
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
    'file.*': 'file|image',
    lang: 'nullable|string|in:en,hk,cn'
  };
  const input = validateHelper.pick(req.files, rules, ['file.*']);
  try {
    // 添加图片大小判断
    if (input.file[0].size > 5000000) throw new MainError('common', 'pictureThan5M');

    await inputCheck.validate(input, rules, res.validatorMessage);
  } catch (err) {
    return res.validateError(err);
  }

  const t = await models.sequelize.transaction();
  try {
    const JointWork = await models.JointWork.findOne({
      where: {
        id: req.params.jointWorkId,
        cocId: req.params.cocId,
        enterpriseId: req.params.enterpriseId
      },
      transaction: t
    });
    if (_.isNull(JointWork)) throw new MainError('common', 'notFound');

    const fileKey = randomstring.generate(24);
    const extname = path.extname(input.file[0].originalname).toLowerCase();
    // 云地址
    const cloundPath = `/uploads/joint-work/${JointWork.id}/image/${fileKey}${extname}`;
    // upload files
    await Storage.disk('local').put(input.file[0].path, cloundPath);
    // 只能保存一张
    await Storage.disk('local').delete(`/uploads/joint-work/${JointWork.id}/image/${JointWork.logo}`);

    await JointWork.updateAttributes({logo: `${fileKey}${extname}`}, {transaction: t});
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


