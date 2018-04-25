// core
const debug = require('debug')('APP:TAG');

// model
const models = require('../../models');

// library
const _ = require('lodash');
const inputCheck = require('input-check');
const validateHelper = require('../../helpers/ValidateHelper');

let Route = module.exports = {};

Route.index = async function (req, res, next) {
  debug(`ENTER index method!`);

  const rules = {
    search: 'min:1',
    type: 'min:1'
  };
  const input = validateHelper.pick(req.query, rules);
  try {
    await inputCheck.validate(input, rules, res.validatorMessage);
  } catch (err) {
    res.validateError(err);
  }

  let filter = await res.paginatorHelper.initFilter(req.query);

  if (!_.isNil(input.search) && input.search !== '') {
    filter.where.$or = {
      slug: {
        $iLike: '%' + input.search + '%'
      }
    };
  }

  filter.order = [['count', 'DESC']];
  try {
    const result = await models.Tag.findAll(filter);
    return res.paginatorWithCount(result, {}, filter);
  } catch (err) {
    next(err);
  }

};

