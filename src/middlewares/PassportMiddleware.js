// core
const debug = require('debug')('APP:PASSPORT_MIDDLEWARE');

// model
const models = require('../models');
const moment = require('moment');
const _ = require('lodash');

const passport = require('passport');

const inputCheck = require('input-check');
const validateHelper = require('../helpers/ValidateHelper');

function passportAuthenticateUserJWT(type = 'user-jwt') {
  return function (req, res, next) {
    passport.authenticate(type, async function (err, user, info) {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.error('auth', 'invalidJWT');
      }
      req.user = user;
      res.locals.userAuth = user;

      return next();
    })(req, res, next);
  }
}


function passportAuthenticateEnterpriseJWT(type = 'enterprise-jwt') {
  return function (req, res, next) {
    passport.authenticate(type, function (err, enterprise, info) {
      if (err) {
        return next(err);
      }
      if (!enterprise) {
        return res.error('auth', 'invalidJWT');
      }

      req.enterprise = enterprise;
      res.locals.enterpriseAuth = enterprise;
      return next();
    })(req, res, next);
  }
}

function passportAuthenticateAdminJWT(type = 'admin-jwt') {
  return function (req, res, next) {
    passport.authenticate(type, function (err, admin, info) {
      if (err) {
        return next(err);
      }
      if (!admin) {
        return res.error('auth', 'invalidJWT');
      }

      req.admin = admin;
      res.locals.adminAuth = admin;
      return next();
    })(req, res, next);
  }
}

function passportAuthenticateFileJWT(type = 'file-jwt') {
  return function (req, res, next) {
    passport.authenticate(type, async function (err, user, info) {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.error('auth', 'invalidJWT');
      }

      req.user = user;
      res.locals.userAuth = user;
      return next();
    })(req, res, next);
  }
}

module.exports = {
  passportAuthenticateUserJWT,
  passportAuthenticateEnterpriseJWT,
  passportAuthenticateFileJWT,
  passportAuthenticateAdminJWT
};
