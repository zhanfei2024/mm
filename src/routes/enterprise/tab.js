// core
const debug = require('debug')('APP:TAB');

// model

// library
const tabRoute = require('../../routes/mm/tab');



function index(req, res, next) {
  debug('ENTER index method!');

  req.query.cocId = req.params.cocId;
  req.query.enterpriseId = res.locals.enterpriseAuth.id;

  return tabRoute.index(req, res, next);
}


function show(req, res, next) {
  debug('ENTER show method!');

  return tabRoute.show(req, res, next);
}


function create(req, res, next) {
  debug('ENTER create method!');

  req.body.enterpriseId = res.locals.enterpriseAuth.id;
  req.body.cocId = req.params.cocId;

  return tabRoute.create(req, res, next);
}



function update(req, res, next) {
  debug('ENTER update method!');

  req.body.id = res.locals.enterpriseAuth.id;

  return tabRoute.update(req, res, next);
}




function destroy(req, res, next) {
  debug('ENTER destroy method!');

  return tabRoute.destroy(req, res, next);
}

module.exports = {
  index,
  show,
  create,
  update,
  destroy
};
