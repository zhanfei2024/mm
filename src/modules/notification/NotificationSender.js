// core
const debug = require('debug')('APP:NOTIFICATION');
const logger = require('../../modules/logger');

// config

// library
const _ = require('lodash');
const uuidV4 = require('uuid/v4');
const jobs = require('../../jobs');

/**
 * @class Notification
 */
class Notification {

  /**
   * @constructor
   */
  constructor() {
  }

  /**
   * Send the given notification to the given notifiable entities.
   *
   * @param  {Sequelize|Sequelize[]} notifiables
   * @param  {class}  notification
   * @return Promise
   */
  send(notifiables, notification) {
    if (notification.queue === true) {
      return this._queueNotification(notifiables, notification);
    }

    return this.sendNow(notifiables, notification);
  }

  /**
   * Send the given notification immediately.
   *
   * @param  {Sequelize|Sequelize[]} notifiables
   * @param  {class}  notification
   * @return Promise
   */
  async sendNow(notifiables, notification) {
    if (!_.isArray(notifiables)) notifiables = [notifiables];

    try {
      const sendTasks = [];
      _.each(notifiables, notifiable => {
        const notificationId = uuidV4();
        const viaChannels = _.uniqBy(notification.via(notifiable), channel => {
          return channel.constructor.name;
        });

        _.each(viaChannels, channel => {
          sendTasks.push(this._sendToNotifiable(notifiable, notificationId, _.clone(notification), channel));
        });
      });
      await Promise.all(sendTasks);
      return Promise.resolve(true);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  /**
   * Send the given notification to the given notifiable via a channel.
   *
   * @param  {Sequelize} notifiable
   * @param  {string}  notificationId
   * @param  {class}  notification
   * @param  {class}  channel
   * @return Promise
   */
  _sendToNotifiable(notifiable, notificationId, notification, channel) {
    if (!notification.id) {
      notification.id = notificationId;
    }

    const sendData = channel.getSendData(notifiable, notification);
    return channel.send(sendData);
  }

  /**
   * Queue the given notification instances.
   *
   * @param  {Sequelize|Sequelize[]} notifiables
   * @param  {class}  notification
   * @return Promise
   */
  async _queueNotification(notifiables, notification) {
    if (!_.isArray(notifiables)) notifiables = [notifiables];

    try {
      const sendTasks = [];
      _.each(notifiables, notifiable => {
        const notificationId = uuidV4();
        const viaChannels = _.uniqBy(notification.via(notifiable), channel => {
          return channel.constructor.name;
        });

        _.each(viaChannels, channel => {
          let newNotification = _.clone(notification);
          newNotification.id = notificationId;

          const sendData = channel.getSendData(notifiable, newNotification);

          sendTasks.push(jobs.create(`notification::${channel.constructor.name}`, {
            sendData
          }));
        });
      });
      await Promise.all(sendTasks);
      return Promise.resolve(true);
    } catch (err) {
      return Promise.reject(err);
    }
  }

}

module.exports = Notification;
