// core
const debug = require('debug')('APP:RATE_LIMIT_MIDDLEWARE');

// model
const models = require('../models');
const moment = require('moment');

// config
const cacheConfig = require('../config/cache');
const Limiter = require('ratelimiter');
const redis = require('redis');

const redisClient = redis.createClient({
  prefix: cacheConfig.connections.redis.prefix,
  port: cacheConfig.connections.redis.port,
  host: cacheConfig.connections.redis.host,
});

/**
 * Rate limit Middleware Helper & Method
 * @module Method
 */

const rateLimitErrorHandler = function (req, res, next) {
  return function (err, limit) {
    if (err) return next(err);

    res.set('X-RateLimit-Limit', limit.total);
    res.set('X-RateLimit-Remaining', limit.remaining - 1);
    res.set('X-RateLimit-Reset', moment((limit.reset * 1000), 'x').toISOString());

    // all good
    debug('remaining %s/%s %s', limit.remaining - 1, limit.total);
    if (limit.remaining) return next();

    // not good
    const delta = (limit.reset * 1000) - Date.now() | 0;
    const after = limit.reset - (Date.now() / 1000) | 0;
    res.set('Retry-After', after);
    return res.send(429, {
      status: false,
      message: `Rate limit exceeded`
    });
  }
};

function authApiCallLimitMiddleware(req, res, next) {
  const authApiCallLimiter = new Limiter({
    id: `authApiCallLimit:${req.ip}`,
    db: redisClient,
    max: process.env.NODE_ENV === 'test' ? 9999 : 500,
    duration: (60 * 1000)
  });
  authApiCallLimiter.get(rateLimitErrorHandler(req, res, next));
}

function publicLoginLimitMiddleware(req, res, next) {
  const publicLoginLimiter = new Limiter({
    id: `publicLoginLimit:${req.ip}`,
    db: redisClient,
    max: process.env.NODE_ENV === 'test' ? 9999 : 10,
    duration: (60 * 1000) // 1 minutes
  });
  publicLoginLimiter.get(rateLimitErrorHandler(req, res, next));
}

function reset(id) {
  return new Promise((resolve, reject) => {
    redisClient.del(`limit:${id}`, function (err, res) {
      if (err) reject(err);
      return resolve();
    });
  });
}

module.exports = {
  authApiCallLimitMiddleware,
  publicLoginLimitMiddleware,
  reset,
};
