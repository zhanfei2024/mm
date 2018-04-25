// core
const debug = require('debug')('APP:ENTERPRISE');

// model

// library
const enterpriseRoute = require('../enterprise');
const _ = require('lodash');

function index(req, res, next) {
  debug('ENTER enterprise index method!');

  return enterpriseRoute.index(req, res, next);
}

function create(req, res, next) {
  debug('ENTER enterprise create method!');

  return enterpriseRoute.create(req, res, next);
}

function show(req, res, next) {
  debug('ENTER enterprise show method!');

  if (!req.params.enterpriseId) {
    req.params.enterpriseId = res.locals.enterpriseAuth.id;
  }

  return enterpriseRoute.show(req, res, next);
}

function update(req, res, next) {
  debug('ENTER enterprise update method!');

  return enterpriseRoute.update(req, res, next);
}

function destroy(req, res, next) {
  debug('ENTER enterprise destory method!');

  return enterpriseRoute.destroy(req, res, next);
}

function uploadIDFront(req, res, next) {
  debug('ENTER enterprise uploadIDFont method!');

  req.body.type = 'IDFront';
  req.body.enterpriseId = res.locals.enterpriseAuth.id;
  req.body.file = req.files.file;
  return enterpriseRoute.uploadID(req, res, next);
}

function uploadIDBack(req, res, next) {
  debug('ENTER uploadIDBack method!');

  req.files.type = 'IDBack';
  req.body.enterpriseId = res.locals.enterpriseAuth.id;
  req.body.file = req.files.file;
  return enterpriseRoute.uploadID(req, res, next);
}

module.exports = {
  index,
  create,
  show,
  update,
  destroy,
  uploadIDFront,
  uploadIDBack
};
