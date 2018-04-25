// core
const debug = require('debug')('APP:PUBLIC_MEMBER_RATING');

// library
const memberRatingRoute = require('../../routes/mm/memberRating');


function memberRatingIndex(req, res, next) {
  debug('ENTER index method!');

  req.query.cocId = req.params.cocId;

  return memberRatingRoute.index(req, res, next);
}

module.exports = {
  memberRatingIndex
};
