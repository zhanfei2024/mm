const _ = require('lodash');
const models = require('../../models');

class DatabaseChannel {

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
    return models.Notification.create(data);
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
    return {
      id: notification.id,
      teamId: notification.teamId,
      notifiableType: notifiable.constructor.name,
      notifiableId: notifiable.id,
      data: notification.toDatabase(notifiable),
      type: notification.constructor.name,
      readAt: null,
    };
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

module.exports = DatabaseChannel;
