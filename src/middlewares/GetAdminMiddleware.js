const debug = require('debug')('APP:GET_ADMIN_MIDDLEWARE');

const models = require('../models');

/**
 * @description auth admin
 * @public
 */
async function middleware(req, res, next) {
  debug('ENTER get admin middleware method!');
  if (res.locals.adminAuth === null) return next(new MainError('auth', 'invalidJWT'));

  try {
    const result = await models.Admin.findOne({
      where: {
        id: res.locals.adminAuth.id,
      },
    });
    if (result === null) throw new MainError('common', 'notFound');

    res.locals.adminAuth = result;
    return next();
  } catch (err) {
    return next(err);
  }
}

module.exports = middleware;
