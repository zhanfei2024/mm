const trait = require('../helpers/trait');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Employee
     */
    await queryInterface.createTable('Employee', {
      id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: Sequelize.BIGINT,
        allowNull: true,
        references: {
          model: 'User',
          key: 'id'
        }
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      invitationEmail: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      lastSendInvitationEmail: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      isOwner: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      avatar: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      workEmail: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      managerId: {
        type: Sequelize.BIGINT,
        allowNull: true,
      },
      depth: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      username: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      gender: {
        type: Sequelize.ENUM('M', 'F'),
        allowNull: false,
        defaultValue: 'M',
      },
      birth: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      nationalityId: {
        type: Sequelize.BIGINT,
        allowNull: true,
      },
      marital: {
        type: Sequelize.ENUM('single', 'married', 'divorced', 'widowed', 'civil_partnership', 'other'),
        allowNull: true,
      },
      joinedDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      identityNumber: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      passport: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      passportExpiredDate: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      workingVisaStartedDate: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      workingVisaExpiredDate: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      driving: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      drivingExpiredDate: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      personalEmail: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      officePhone: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      mobilePhone: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      homePhone: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      paymentMethodId: {
        type: Sequelize.BIGINT,
        allowNull: true,
      },
      paymentAccountName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      paymentAccountNumber: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      paymentAccountRemark: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      jobTitle: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      jobEndedDate: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      probationDate: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      remark: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      lastLogin: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      rememberToken: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      setting: {
        type: Sequelize.JSONB,
        allowNull: false,
        defaultValue: '{}',
      },
    });
    await trait.addTimestamps('Employee');
    await trait.addTeamId('Employee');

    /**
     * Employee Address
     */
    await queryInterface.createTable('EmployeeAddress', {
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
      countryId: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
      countryName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      provinceName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      address1: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      address2: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      postcode: {
        type: Sequelize.STRING,
        allowNull: true,
      },
    });
    await trait.addTimestamps('EmployeeAddress');
    await trait.addTeamId('EmployeeAddress');

    return true;
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Employee');
    await queryInterface.dropTable('EmployeeAddress');

    return true;
  }
};
