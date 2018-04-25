const trait = require('../helpers/trait');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('User', {
      id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
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
      phone: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      timezone: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '+00:00',
      },
      credit: {
        type: Sequelize.DECIMAL,
        allowNull: false,
        defaultValue: 0,
      },
      remark: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
    });

    await trait.addTimestamps('User');
    await queryInterface.addIndex('User', ['email']);

    return true;
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('User');

    return true;
  }
};
