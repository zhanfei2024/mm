const debug = require('debug')('APP:PRESENT');
const _ = require('lodash');

const defaultOptions = {
  errorDir: '',
};
/**
 * Adds output methods to response object via express middleware
 *
 * @method presenter
 * @param  {object}         options
 * @return {function}       middleware
 */
const presenter = (options) => {
  const newOptions = _.extend(defaultOptions, options) || defaultOptions;
  return (req, res, next) => {
    res.return = (params) => {
      res.json(_.assign({status: true}, params));
    };
    res.item = (result, params) => {
      res.json(_.assign({status: true}, {result: result === null ? {} : result}, params));
    };
    res.collection = (result, params) => {
      res.json(_.assign({status: true}, {result: result === null ? [] : result}, params));
    };
    /**
     * 计算 分页资料，采用Limit+1 模式计算
     * @param result
     * @param params
     * @param filter
     */
    res.paginatorLimitPlusStyle = (result, params, filter) => {

      const hasNextPage = filter.limit === result.length;
      filter.limit = filter.limit - 1;
      if (hasNextPage) result = _.dropRight(result);

      const offsetLimit = filter.offset / filter.limit;
      const totalOffset = filter.limit + filter.offset;
      res.json(_.assign({status: true}, {
        meta: {
          pagination: {
            count: result.length,
            currentPage: offsetLimit + 1,
            nextPage: !hasNextPage ? null : (offsetLimit + 2),
            prevPage: Math.max(req.query.page - 1, 1),
          },
        },
        result: result,
      }, params));
    };
    res.paginatorWithCount = (result, params, filter) => {
      const offsetLimit = filter.offset / filter.limit;
      const totalOffset = filter.limit + filter.offset;
      res.json(_.assign({status: true}, {
        meta: {
          pagination: {
            totalCount: result.count,
            count: result.rows.length,
            currentPage: offsetLimit + 1,
            nextPage: (totalOffset > result.count ||
              result.rows.length < filter.limit || result.count === result.rows.length) ? null : (offsetLimit + 2),
            prevPage: Math.max(req.query.page - 1, 1),
          },
        },
        result: result.rows,
      }, params));
    };
    res.error = (moduleName, typeName, params) => {
      const error = require(`${newOptions.errorDir}${res.locals.locale}.json`)[moduleName][typeName];
      return res.status(error.statusCode).json({
        status: false,
        code: error.code || 400,
        message: req.__(error.message, (params || []))
      });
    };
    res.customError = (name, params) => {
      return res.status(400).json({
        status: false,
        message: req.__(name, (params || [])),
      });
    };

    /**
     * 回传 验证错误
     * @param errors
     */
    res.validateError = (errors) => {
      debug('ERROR validateError: %j', errors);
      if (_.isArray(errors)) {
        const field = errors[0].field;
        const validateMessage = require(`${newOptions.errorDir}/${res.locals.locale}.json`)['validate'][errors[0].validation];
        return res.status(400).json({
          status: false,
          field,
          validation: errors[0].validation,
          message: res.__(validateMessage, errors[0]) || errors[0].message,
        });
      }
      return res.status(400).json({
        status: false,
        message: 'Bad Request',
      });
    };
    next();
  };
};

module.exports = presenter;
