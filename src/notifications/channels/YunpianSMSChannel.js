// core
const debug = require('debug')('APP:YUNPIAN_SMS');

// library
const smsConfig = require('../../config/sms');
const request = require('superagent');

const moment = require('moment');
const _ = require('lodash');

class YunpianSMSChannel {

  constructor() {

  }

  /**
   * Send the given notification.
   *
   * @param  {Object} data
   *
   * @return Promise
   */
  send(data) {
    const phone = data.phone;
    const message = data.message;

    return new Promise((resolve, reject) => {
      request
        .post(smsConfig.yunpian.url)
        .set('Accept', 'application/json; charset=utf-8;')
        .set('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8;')
        .send({
          apikey: smsConfig.yunpian.key,
          mobile: phone,
          text: message,
        })
        .end((err, res) => {
          if (err) return reject(err);
          return resolve(res.body);
        });
    });
  }

  /**
   * Get the data for the notification.
   *
   * @param  {Sequelize} notifiable
   * @param  {class}  notification
   *
   * @return Object
   */
  getSendData(notifiable, notification) {
    return notification.toYunpianSMS(notifiable);
  }

  /**
   * Handle for queue Process
   *
   * @param  {Kue} queue
   *
   * @return Object
   */
  queueProcess(queue) {
    const self = this;
    queue.process(`notification::${this.constructor.name}`, 1, async (job, done) => {
      try {
        await self.send(job.data.sendData);
        done();
      } catch (err) {
        done(err);
      }
    });
  }

}

module.exports = YunpianSMSChannel;
