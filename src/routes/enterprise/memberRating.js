// core
const debug = require('debug')('APP:MEMBER_RATING');

// model

// library
const memberRatingRoute = require('../../routes/mm/memberRating');

function indexRating(req, res, next) {
  debug('ENTER index method!');

  req.query.enterpriseId = res.locals.enterpriseAuth.id;
  req.query.cocId = req.params.cocId;
  return memberRatingRoute.index(req, res, next);
}

function showDetails(req, res, next) {
  debug('ENTER show method!');

  return memberRatingRoute.show(req, res, next);
}

function createRating(req, res, next) {
  debug('ENTER create method!');

  req.body.enterpriseId = res.locals.enterpriseAuth.id;
  req.body.cocId = req.params.cocId;
  return memberRatingRoute.create(req, res, next);
}

function updateRating(req, res, next) {
  debug('ENTER update method!');

  return memberRatingRoute.update(req, res, next);
}


function destroyRating(req, res, next) {
  debug('ENTER destroy method!');

  return memberRatingRoute.destroy(req, res, next);
}

module.exports = {
  indexRating,
  showDetails,
  createRating,
  updateRating,
  destroyRating
};
