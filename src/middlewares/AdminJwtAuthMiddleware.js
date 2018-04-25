// core
const debug = require('debug')('APP:ADMIN_JWT_AUTH_MIDDLEWARE');

// model
const models = require('../models');
const moment = require('moment');

// jwt
const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/auth');

async function middleware(req, res, next) {
  debug('ENTER ADMIN AUTH METHOD!');
  try {
    // get token
    let token = null;
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.query && req.query.token) {
      token = req.query.token;
    }
    if (token === null) throw new MainError('auth', 'invalidJWT');

    let session = null;
    const decoded = jwt.verify(token, jwtConfig.secret);
    if (decoded.type === 'admin') {
      session = await models.AdminSession.findOne({
        where: {
          adminId: decoded.adminId,
          token: decoded.jti,
        },
      });
      if (session === null) throw new MainError('auth', 'invalidJWT');
      await session.updateAttributes({
        lastUsedAt: moment.utc().toISOString(),
      });

      const admin = await models.Admin.findById(decoded.adminId);
      res.locals.adminAuth = admin;
    }
    res.locals.session = session;
    return next();
  } catch (err) {
    return next(err);
  }
}

module.exports = middleware;
