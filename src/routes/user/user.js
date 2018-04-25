// core
const debug = require('debug')('APP:USER_USER');

// model

// library
const userRoute = require('../../routes/user');

function show(req, res, next) {
  debug('ENTER show method!');
  if (!req.params.userId) {
    req.params.userId = res.locals.userAuth.id;
  }
  return userRoute.show(req, res, next);
}

function update(req, res, next) {
  debug('ENTER update method!');
  req.params.userId = res.locals.userAuth.id;
  delete req.body.active;
  return userRoute.update(req, res, next);
}

module.exports = {
  show,
  update,
};
