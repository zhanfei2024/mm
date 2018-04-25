const trait = require('../helpers/trait');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('AnnouncementEmployee', {
      announcementId: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'Announcement',
          key: 'id'
        }
      },
      employeeId: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'Employee',
          key: 'id'
        }
      },
      readAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });
    await trait.addTimestamps('AnnouncementEmployee');
    await trait.addTeamId('AnnouncementEmployee', ['announcementId', 'employeeId']);
    // await queryInterface.addConstraint('AnnouncementEmployee', ['announcementId', 'employeeId'], {
    //   type: 'primary key',
    //   name: 'custom_primary_constraint_name'
    // });

    return true;
  },
  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('AnnouncementEmployee');
  }
};
