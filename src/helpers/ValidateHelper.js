'use strict';
const _ = require('lodash');
const inputCheck = require('input-check');
const models = require(__base + 'models');
const Parser = require('./ValidateRuleParser');

const moment = require('moment');

/**
 * @description figures out whether value can be skipped
 * or not from validation, as non-existing values
 * should be validated using required.
 * @method skippable
 * @param  {Mixed}  value
 * @return {Boolean}
 * @private
 */
const skippable = function (value) {
  return !inputCheck.is.existy(value);
};

let Helper = module.exports = {};

/**
 * @description enforces to pick input by filter
 * @method pick
 * @param  {Object} input,  data source
 * @param  {String} rules, rules for validation
 * @param  {Array} exclude, field list should be exclude
 * @param  {Array} include, field list should be include
 * @param  {Boolean} include not nullable input if present
 * @return {Object}
 * @public
 */
Helper.pick = function (input, rules = [], exclude = [], include = [], includeAllNotNullable = true) {
  let result = Helper.attributeParseType(input, rules);

  if (includeAllNotNullable) {
    const transformedRules = Parser.transformRules(input, rules);
    _.each(transformedRules, function (rule, key) {
      const ruleNameList = _.map(rule, 'name');
      if (ruleNameList.indexOf('nullable') === -1) {
        include.push(key);
      }
    });
  }

  result = _.pick(result, exclude.length > 0 ? Object.keys(_.omit(rules, exclude)) : Object.keys(rules));

  return _.cloneDeep(_.pickBy(result, (val, key) => {
    return !skippable(val) || include.indexOf(key) !== -1;
  }));
};

Helper.transform = {
  trim: function (input) {
    if (typeof input === 'string') {
      return input.trim();
    } else if (typeof input === 'object') {
      for (var key in input) {
        input[key] = Helper.transform.trim(input[key]);
      }
    }

    return input;
  },
  emptyStringToNull: function (input) {
    if (typeof input === 'string') {
      return input === '' ? null : input;
    } else if (typeof input === 'object') {
      for (var key in input) {
        input[key] = Helper.transform.emptyStringToNull(input[key]);
      }
    }

    return input;
  }
};

/**
 * Attribute Parse Type
 * @description force change `input` value type from `rules`
 */
Helper.attributeParseType = function (input, rules) {
  const transformedRules = Parser.transformRules(input, rules);
  _.each(transformedRules, function (rule, key) {
    const ruleNameList = _.map(rule, 'name');
    if (!skippable(_.get(input, key))) {
      if (ruleNameList.indexOf('string') !== -1) _.set(input, key, (_.get(input, key)).toString());
      if (ruleNameList.indexOf('integer') !== -1) _.set(input, key, parseInt(_.get(input, key), 10));
      if (ruleNameList.indexOf('boolean') !== -1) _.set(input, key, inputCheck.sanitizor.toBoolean(_.get(input, key)));
    }
  });
  return input;
};

/**
 *
 * Read Attribute Filter
 * @description for filter field output by ACL system
 */
Helper.readAttributeFilter = function (value, accessList, mainValue) {
  if (_.isString(value)) value = _.compact(value.split(','));
  if (!_.isArray(value)) return accessList;

  let attributes = value.length > 0 ? _.filter(value, function (val) {
    return _.includes(accessList, val);
  }) : accessList;

  _.each(mainValue, function (val) {
    if (attributes.indexOf(val) === -1) attributes.push(val);
  });

  return attributes.length > 0 ? attributes : accessList;
};

/**
 *
 * Edit Attribute Filter
 * @description for filter field output by ACL system
 */
Helper.editAttributeFilter = function (value, accessList, mainValue) {
  let attributes = _.pick(value, accessList);
  _.each(mainValue, function (val) {
    if (!_.has(attributes, val)) attributes[val] = value[val];
  });
  return attributes;
};

/**
 * Paginator Helper
 * @description init page & limit
 */
Helper.paginatorHelper = {
  initFilter: function (data) {
    return new Promise(async (resolve) => {
      const rules = {
        ids: 'array|min:1',
        limit: 'integer|range:0,201',
        page: 'integer|range:0,201',
      };

      let input = Helper.pick(data, rules);
      try {
        await inputCheck.validate(input, rules, Helper.message);
      } catch (err) {
        input = _.omit(input, _.map(err, 'field'));
      }

      let filter = {
        limit: input.limit ? input.limit : 50,
        where: {}
      };
      filter.offset = input.page ? ((input.page - 1) * filter.limit) : 0;
      if (!_.isUndefined(input.ids)) filter.where.id = {$in: input.ids};

      return resolve(filter);
    });
  },
  initFilter2: function (data) {
    return new Promise(async (resolve) => {
      let filter = await Helper.paginatorHelper.initFilter(data);
      filter.limit = filter.limit + 1;
      return resolve(filter);
    });
  }
};

/**
 *
 * extra validation method
 * @description
 */
Helper.extend = {
  /**
   example:
   1. basic
   'exists:tableName,fieldName,whereField,whereValue'
   */
  exists: function (data, field, message, args) {
    return new Promise(function (resolve, reject) {
      // get value of field under validation
      const fieldValue = _.get(data, field);

      // resolve if value does not exists, value existence
      // should be taken care by required rule.
      if (!fieldValue) return resolve('validation skipped');

      const modelName = args[0];
      const modelField = args[1];
      let where = {[modelField]: fieldValue};

      if (args.length > 2) {
        args.splice(0, 2);
        let condition = args.length === 1 ? args[0] : args.join(',');
        _.extend(where, JSON.parse(condition));
      }

      models[modelName].findOne({
        where: where
      }).then(function (result) {
        if (result === null) return reject(message);
        return resolve('validation passed');
      }).catch(reject);
    });
  },
  /**
   example:
   1. basic
   'unique:tableName,fieldName'
   2. Forcing A Unique Rule To Ignore A Given ID
   'unique:tableName,fieldName,ignoreField, ignoreValue'
   */
  unique: function (data, field, message, args) {
    return new Promise(function (resolve, reject) {
      // get value of field under validation
      const fieldValue = _.get(data, field);

      // resolve if value does not exists, value existence
      // should be taken care by required rule.
      if (!fieldValue) return resolve('validation skipped');

      const modelName = args[0];
      const modelField = args[1];
      let where = {[modelField]: fieldValue};

      if (args.length > 2) {
        args.splice(0, 2);
        let condition = args.length === 1 ? args[0] : args.join(',');
        _.extend(where, JSON.parse(condition));
      }

      models[modelName].findOne({
        where: where
      }).then(function (result) {
        if (result !== null) return reject(message);
        return resolve('validation passed');
      }).catch(reject);
    });
  },
  dateIso8601: function (data, field, message, args) {
    return new Promise(function (resolve, reject) {
      const fieldValue = _.get(data, field);
      if (skippable(fieldValue)) {
        resolve('validation skipped');
        return;
      }
      if (inputCheck.is.dateFormat(fieldValue, moment.ISO_8601)) {
        resolve('validation passed');
        return;
      }
      reject(message);
    });
  },
  timeBefore: function (data, field, message, args) {
    return new Promise(function (resolve, reject) {
      const fieldValue = _.get(data, field);
      if (skippable(fieldValue)) {
        resolve('validation skipped');
        return;
      }
      if (inputCheck.is.before(moment(fieldValue, 'HH:mm:ss'), moment(args[0], 'HH:mm:ss'))) {
        resolve('validation passed');
        return;
      }
      reject(message);
    });
  },
  timeAfter: function (data, field, message, args) {
    return new Promise(function (resolve, reject) {
      const fieldValue = _.get(data, field);
      if (skippable(fieldValue)) {
        resolve('validation skipped');
        return;
      }
      if (inputCheck.is.after(moment(fieldValue, 'HH:mm:ss'), moment(args[0], 'HH:mm:ss'))) {
        resolve('validation passed');
        return;
      }
      reject(message);
    });
  },
};
