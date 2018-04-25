// debug
const debug = require('debug')('APP:PERMISSION');

// model
const models = require('../../models/index');

// validate
const inputCheck = require('input-check');
const validateHelper = require('../../helpers/ValidateHelper');

// library
const _ = require('lodash');

// method
const modelHelper = require('../../methods/model');

async function index(req, res, next) {
  debug('Enter index method!');

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
  if (!_.isNil(input.search) && _.trim(input.search) !== '') {
    filter.where = {
      name: {
        $iLike: `${req.query.search}%`,
      },
    };
  }

  try {
    // const result = await models.Permission.findAndCountAll(filter);
    const result = await modelHelper.findAll('Permission', [], filter, []);
    return res.paginatorLimitPlusStyle(result, {}, filter);
  } catch (err) {
    return next(err);
  }
}

async function show(req, res, next) {
  debug('Enter show method!');

  try {
    const result = await models.Permission.findById(req.params.permissionId);
    if (_.isNull(result)) return res.error('common', 'notFound');

    return res.item(result);
  } catch (err) {
    return next(err);
  }
}


module.exports = {
  index,
  show,
};
