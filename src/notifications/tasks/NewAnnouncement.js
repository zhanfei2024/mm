const _ = require('lodash');

const DatabaseChannel = require('../channels/DatabaseChannel');

class NewAnnouncement {

  constructor(teamId, data = {}) {
    /**
     * Use queue
     */
    this.queue = true;

    this.data = data;
    this.teamId = teamId;
  }

  /**
   * Get the notification channels.
   *
   * @return array
   */
  via() {
    return [new DatabaseChannel()];
  }

  /**
   * Get the data for the notification.
   *
   * @param {Sequelize} notifiable
   *
   * @return Object
   */
  toDatabase(notifiable) {
    return this.data;
  }

}

module.exports = NewAnnouncement;
