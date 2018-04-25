// core
const logger = require('../../../modules/logger');

// config
const commonConfig = require('../../../config/common');
const mailConfig = require('../../../config/mail');

// library
const _ = require('lodash');
const nodemailer = require('nodemailer');

/**
 * @description send email
 * @method send
 * @param  {Array<Object>|Object} inputUsers
 * users include be `email`, `firstName`, `lastName` fields
 * @param  {String} subject
 * @param  {String} html
 * @return {Promise}
 * @private
 */
const debug = require("debug")("APP:mail");
function sendMail(inputUsers, subject, html) {
  const users = !_.isArray(inputUsers) ? [inputUsers] : inputUsers;

  const mailOptions = {
    from: `"${commonConfig.systemName}" <${commonConfig.systemEmail}>`,
    subject,
    html,
  };

  // send mail
  const transporter = nodemailer.createTransport(mailConfig, { pool: true });

  logger.log('info', 'starting send email...');
  try {
    const sendEmailPromises = [];
    for (let i = 0; i < users.length; i += 1) {
      const user = users[i];
      const promise = new Promise((resolve, reject) => {
        if (_.isUndefined(user.email)) return reject('invalid email');
        try {
          transporter.sendMail(
            _.extend(mailOptions, {
              to: `"${user.firstName} ${user.lastName}" <${user.email}>`,
            }),
            (err, info) => {
              if (err) {
                logger.log('error', `failed to send to ${user.email}`, err);
                return reject(err);
              }
              logger.log('info', `sent to ${user.email}`, info);
              return resolve(info);
            });
        } catch (err) {
          logger.log('error', `failed to send to ${user.email}`, err);
          return reject(err);
        }
      });
      sendEmailPromises.push(promise);
    }
    return Promise.all(sendEmailPromises);
  } catch (err) {
    logger.log('error', 'failed to send email', err);
    return Promise.reject(err);
  }
}

module.exports = {
  sendMail,
};
