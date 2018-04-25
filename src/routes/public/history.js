const historyRoute = require('../mm/cocHistory');

const debgu = require('debug')('APP:Public_Coc_History');

async function indexHistories(req, res, next) {
  debgu('ENTER index method!');

  req.query.cocId = req.params.cocId;
  return historyRoute.index(req, res, next);
}

async function showHistory(req, res, next) {
  debgu('ENTER show method!');

  return historyRoute.show(req, res, next);
}

module.exports = {
  indexHistories,
  showHistory
}


