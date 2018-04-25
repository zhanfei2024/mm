// core
const debug = require('debug')('APP:VIEW_METHOD');
const logger = require(__base + 'modules/logger');
const fs = require('fs');

// library
const _ = require('lodash');
const juice = require('juice');

const handlebarsLayouts = require('handlebars-layouts');
let hbs = require('hbs');
hbs.registerPartials(__dirname + '/../views');
hbs.registerHelper(handlebarsLayouts(hbs.handlebars));

/**
 * View Helper Method
 * @module Method
 */
let Method = {};

/**
 * @description Render View
 * @method compile
 * @param {String} path
 * @param {Object} data
 * @return {Promise}
 * @public
 */
Method.compile = async function (path, data = {}) {
  try {
    const source = fs.readFileSync(`${__base}views/${path}`);
    const template = hbs.handlebars.compile(source.toString())(data);
    return Promise.resolve(template);
  } catch (err) {
    return Promise.reject(err);
  }
};

/**
 * @description Render view with css inline function
 * @method inlineCssCompile
 * @param {String} path
 * @param {Object} data
 * @return {Promise}
 * @public
 */
Method.inlineCssCompile = async function (path, data = {}) {
  try {
    let source = await Method.compile(path, data);
    return Promise.resolve(juice(source));
  } catch (err) {
    return Promise.reject(err);
  }
};

module.exports = Method;
