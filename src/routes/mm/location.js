'use strict';

// core
const debug = require('debug')('APP:LOCATION');

// model
const models = require('../../models');

// library
const _ = require('lodash');
const inputCheck = require('input-check');
const validateHelper = require('../../helpers/ValidateHelper');


async function index(req, res, next) {
  debug(`ENTER index method!`);

  const rules = {
    name: 'min:1',
  };
  const input = _.pick(req.query, Object.keys(rules));
  try {
    await inputCheck.validate(input, rules, res.validatorMessage);
  } catch (err) {
    return res.validateError(err);
  }

  // defined an filter
  let filter = {
    where: {
      parentId: 1
    }
  };

  if (!_.isNil(input.name)) {
    filter.where.name = {
      $iLike: '%' + input.name + '%'
    };
  }

  // query OrderBy
  filter.order = [['id', 'ASC']];
  try {
    let result = await models.Location.findAndCountAll(filter);

    return res.paginatorWithCount(result, {}, filter);
  } catch (err) {
    return next(err);
  }

}


async function show(req, res, next) {
  debug(`ENTER location show method!`);

  try {
    let filter = {
      where: {
        id: req.params.locationId,
      }
    };
    let result = await models.Location.findOne(filter);
    return res.item(result);
  } catch (err) {
    return next(err);
  }
}


async function indexTree(req, res, next) {
  debug(`ENTER indexByTree method!`);

  try {
    let result = await models.Location.findAll();
    return res.collection(result);
  } catch (err) {
    return next(err);
  }
}


async function create(req, res, next) {
  debug(`ENTER create method!`);

  const rules = {
    name: 'required|min:1',
    parentId: 'integer|exists:Location,id',
    depth: 'min:0',
    order: 'min:1|integer'
  };
  const input = validateHelper.pick(req.body, rules, [], ['parentId']);
  try {
    await inputCheck.validate(input, rules, res.validatorMessage);
  } catch (err) {
    return res.validateError(err);
  }

  let t = await models.sequelize.transaction();
  try {
    if (_.isNaN(parseInt(input.parentId))) delete input.parentId;
    const result = await models.Location.create(input, {transaction: t});
    await t.commit();
    req.params.locationId = result.id;
    return Route.show(req, res, next);
  } catch (err) {
    await t.rollback();
    return next(err);
  }

}


async function update(req, res, next) {
  debug(`ENTER update method!`);

  const rules = {
    name: 'min:1',
    parentId: 'integer|exists:Location,id',
    depth: 'min:0',
    order: 'min:1|integer'
  };
  const input = validateHelper.pick(req.body, rules, [], ['parentId']);
  try {
    await inputCheck.validate(input, rules, res.validatorMessage);
  } catch (err) {
    return res.validateError(err);
  }

  let t = await models.sequelize.transaction();
  try {
    if (_.isNaN(parseInt(input.parentId))) delete input.parentId;
    const result = await models.Location.findById(req.params.locationId, {transaction: t});
    if (_.isNull(result)) throw new MainError('common', 'notFound');

    await result.updateAttributes(input, {transaction: t});
    await t.commit();

    return Route.show(req, res, next);
  } catch (err) {
    await t.rollback();
    return next(err);
  }
}


async function destroy(req, res, next) {
  debug('ENTER destroy method!');

  const t = await models.sequelize.transaction();
  try {
    const result = await models.Location.findOne({
      where: {
        id: req.params.locationId
      },
      transaction: t,
    });
    if (_.isNull(result)) throw new MainError('common', 'notFound');

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


module.exports = {
  index,
  show,
  indexTree,
  create,
  update,
  destroy
};
