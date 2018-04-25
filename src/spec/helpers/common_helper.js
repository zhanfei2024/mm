// jwt
const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');
const authConfig = require(`${__base}config/auth`);
const fs = require('fs');

const commonHelper = module.exports = {};

commonHelper.getBaseUrl = function () {
  return 'http://127.0.0.1:7777';
};

commonHelper.getSiteUrl = function () {
  return 'http://127.0.0.1:7777/api/v1';
};

commonHelper.getMasterUrl = function () {
  return 'http://127.0.0.1:6666/api/v1';
};

commonHelper.getPublicAPIUrl = function () {
  return `${commonHelper.getSiteUrl()}/public`;
};

commonHelper.getUserAPIUrl = function () {
  return `${commonHelper.getSiteUrl()}/user`;
};

commonHelper.getAdminAPIUrl = function () {
  return `${commonHelper.getSiteUrl()}/admin`;
};

commonHelper.getTAPIUrl = function () {
  return `${commonHelper.getSiteUrl()}/t`;
};

commonHelper.getYAPIUrl = function () {
  return `${commonHelper.getSiteUrl()}/y`;
};


commonHelper.getOwnerLoginToken = function () {
  return global.token;
};

commonHelper.getEmployeeLoginTokenById = function (id) {
  return '';
};

commonHelper.getOwnerLoginToken = function () {
  return global.token;
};

module.exports = commonHelper;
