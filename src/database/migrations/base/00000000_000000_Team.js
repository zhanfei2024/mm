const trait = require('../helpers/trait');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Team', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
        unique: true,
      },
      code: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      planId: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      currencyCode: {
        type: Sequelize.STRING(5),
        allowNull: false,
      },
      setting: {
        type: Sequelize.JSONB,
        allowNull: false,
        defaultValue: '{}',
      },
      logo: {
        type: Sequelize.STRING,
        allowNull: true,
      }
    });
    await trait.addTimestamps('Team');

    return true;
  },
  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('Team');
  }
};
