// core
const debug = require('debug')('APP:History');

// model

// library
const enterpriseHistoryRoute = require('../../routes/mm/cocHistory');

function index(req, res, next) {
  debug('ENTER index method!');

  req.query.cocId = req.params.cocId;
  return enterpriseHistoryRoute.index(req, res, next);
}

function show(req, res, next) {
  debug('ENTER show method!');

  return enterpriseHistoryRoute.show(req, res, next);
}

function create(req, res, next) {
  debug('ENTER create method!');
  req.body.enterpriseId = res.locals.enterpriseAuth.id;
  req.body.cocId = req.params.cocId;
  return enterpriseHistoryRoute.create(req, res, next);
}

function update(req, res, next) {
  debug('ENTER update method!');
  return enterpriseHistoryRoute.update(req, res, next);
}

function destroy(req, res, next) {
  debug('ENTER destroy method!');

  return enterpriseHistoryRoute.destroy(req, res, next);
}

module.exports = {
  index,
  show,
  create,
  update,
  destroy
};
