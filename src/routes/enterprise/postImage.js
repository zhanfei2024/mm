// core
const debug = require('debug')('APP:ENTERPRISE_POST_IMAGE');


// library
const postImageRoute = require('../../routes/mm/postImage');

function uploadImages(req, res, next) {
  debug('ENTER uploadImages method!');


  return postImageRoute.uploadImages(req, res, next);
}

function uploadCover(req, res, next) {
  debug('ENTER uploadCover method!');


  return postImageRoute.uploadCover(req, res, next);
}

module.exports = {
  uploadImages,
  uploadCover
};
