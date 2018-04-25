// debug
const debug = require('debug')('APP:CURRENCY');

// model
const models = require('../models');

// validate
const inputCheck = require('input-check');
const validateHelper = require('../helpers/ValidateHelper');

// library
const _ = require('lodash');

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

  const filter = await res.paginatorHelper.initFilter(req.query);
  if (!_.isNil(input.search)) {
    filter.where.$or = {
      name: {
        $iLike: `%${input.search}%`,
      },
      languageCode: {
        $iLike: `%${input.search}%`,
      },
    };
  }

  try {
    const result = await models.Language.findAll(filter);

    return res.collection(result);

  } catch (err) {
    return next(err);
  }
}

module.exports = {
  index,
};
