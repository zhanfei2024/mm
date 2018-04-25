// core
const debug = require('debug')('APP:USER_BILL');

// library
const userBillRoute = require('../mm/bills');

function index(req, res, next) {
  debug('ENTER index method!');

  req.params.userId = res.locals.userAuth.id;
  return userBillRoute.index(req, res, next);
}

function show(req, res, next) {
  debug('ENTER show method!');

  req.params.userId = res.locals.userAuth.id;
  return userBillRoute.show(req, res, next);
}

function create(req, res, next) {
  debug('ENTER create method!');

  req.body.userId = res.locals.userAuth.id;
  return userBillRoute.create(req, res, next);
}

function update(req, res, next) {
  debug('ENTER update method!');

  req.body.userId = res.locals.userAuth.id;
  return userBillRoute.update(req, res, next);
}

function destroy(req, res, next){
  debug('ENTER destroy method!');

  req.params.userId = res.locals.userAuth.id;
  return userBillRoute.destroy(req, res, next);
}

module.exports = {
  index,
  show,
  create,
  update,
  destroy
};
