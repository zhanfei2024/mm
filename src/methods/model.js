// core
const debug = require('debug')('APP:MODEL_METHOD');
const logger = require(__base + 'modules/logger');

// model
const models = require(__base + 'models');

// library
const _ = require('lodash');

/**
 * combine filter action and list action
 * @param modelName
 * @param filterScope
 * @param filter
 * @param returnScope
 * @param modelOptions
 * @returns {*|any[]|{[^2.0.0], [>=3.0.0 || ^4.0.0-0]}}
 */
async function findAll(modelName, filterScope, filter, resultScope, modelOptions = {}) {
  if (_.isEmpty(filterScope)) {
    const result = await models[modelName].scope(resultScope).findAll(filter);

    return result;
  } else {
    const filterIds = await models[modelName].scope(filterScope).findAll(_.extend(filter, modelOptions));
    if (filterIds.length === 0) return filterIds;

    const resultFilter = _.extend({
      where: {
        id: {
          $in: filterIds.map(item => item.id)
        }
      }
    }, modelOptions);
    if (filter.order) resultFilter.order = filter.order;
    if (filter.attributes) resultFilter.attributes = filter.attributes;
    if (!_.isUndefined(filter.paranoid)) resultFilter.paranoid = filter.paranoid;
    const result = await models[modelName].scope(resultScope).findAll(resultFilter);

    return result;
  }

}

async function findAndCountAll(modelName, scope, filter) {
  const _result = await models[modelName].scope(_.cloneDeep(scope)).findAll(filter);


  return result = {
    row: _result
  }
}

async function countAll(model, scope, filter) {
  let newFilter = _.cloneDeep(filter);
  const _result = await models[model].scope(_.cloneDeep(scope)).findAll(_.omit(newFilter, ['limit', 'offset']));

  if (!_.isUndefined(newFilter.offset)) {
    if (newFilter.offset > _result.length) {
      newFilter.offset = _result.length;
    }
  } else {
    newFilter.offset = 0;
  }

  if (!_.isUndefined(newFilter.limit)) {
    if (newFilter.limit > _result.length) {
      newFilter.limit = _result.length;
    }
  } else {
    newFilter.limit = _result.length > 50 ? 50 : _result.length;
  }

  if (newFilter.offset + newFilter.limit > _result.length) {
    newFilter.limit = _result.length - newFilter.offset;
  }

  const result = {
    count: _result.length,
    rows: _result.length ? _result.slice(newFilter.offset, newFilter.offset + newFilter.limit) : []
  };
  return result;
}

/**
 * Method
 * @module Method
 */
module.exports = {
  countAll,
  findAndCountAll,
  findAll,
};
