const _ = require('lodash');

const YunpianSMSChannel = require('../channels/YunpianSMSChannel');

class VerifyPhone {

  constructor(data = {}) {
    /**
     * Use queue
     */
    this.queue = true;

    this.data = data;
  }

  /**
   * Get the notification channels.
   *
   * @return array
   */
  via() {
    return [new YunpianSMSChannel()];
  }

  /**
   * Get the data for the notification.
   *
   * @param {Sequelize} notifiable
   *
   * @return Object
   */
  toYunpianSMS(notifiable) {
    return {
      phone: this.data.sms.phone,
      message: this.data.sms.message,
    };
  }

}

module.exports = VerifyPhone;
