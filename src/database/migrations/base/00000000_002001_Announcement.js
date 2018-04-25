const trait = require('../helpers/trait');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Announcement
     */
    await queryInterface.createTable('Announcement', {
      id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      employeeId: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'Employee',
          key: 'id'
        },
        onDelete: 'cascade',
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      content: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      isSticky: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      }
    });
    await trait.addTimestamps('Announcement');
    await trait.addTeamId('Announcement');

    /**
     * Announcement Attachment
     */
    await queryInterface.createTable('AnnouncementAttachment', {
      id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      announcementId: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'Announcement',
          key: 'id'
        },
        onDelete: 'cascade',
      },
      size: {
        type: Sequelize.BIGINT,
        allowNull: false,
        defaultValue: 0,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      key: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      extension: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      mime: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });
    await trait.addTimestamps('AnnouncementAttachment');
    await trait.addTeamId('AnnouncementAttachment');

    return true;
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Announcement');
    await queryInterface.dropTable('AnnouncementAttachment');

    return true;
  }
};
