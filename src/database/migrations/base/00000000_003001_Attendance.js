const trait = require('../helpers/trait');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Attendance
     */
    await queryInterface.createTable('Attendance', {
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
        }
      },
      checkIn: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      workingGroupName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      workingClassTime: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      workingDate: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      status: {
        // 准时，迟到，早退，休班，外勤
        type: Sequelize.ENUM('on-time', 'late', 'leave-early', 'day-off', 'work-outside'),
        allowNull: true,
      },
      isAdditional: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      approverId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Employee',
          key: 'id'
        }
      },
      diffMinutes: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      remark: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      coordinate: {
        type: Sequelize.JSONB,
        allowNull: true,
      },
    });
    await trait.addTimestamps('Attendance');
    await trait.addTeamId('Attendance');

    return true;
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Attendance');

    return true;
  }
};
