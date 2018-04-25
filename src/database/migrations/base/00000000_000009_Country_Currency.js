const trait = require('../helpers/trait');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Country
     */
    await queryInterface.createTable('Country', {
      id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      parentId: {
        type: Sequelize.BIGINT,
        allowNull: true,
        // references: {
        //   model: 'Country',
        //   key: 'id'
        // }
      },
      depth: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      code: {
        type: Sequelize.STRING(5),
        allowNull: false,
        unique: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });
    await trait.addTimestamps('Country');

    /**
     * Currency
     */
    await queryInterface.createTable('Currency', {
      id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      code: {
        type: Sequelize.STRING(5),
        allowNull: false,
        unique: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      symbol: {
        type: Sequelize.STRING,
        allowNull: true,
      },
    });
    await trait.addTimestamps('Currency');

    return true;
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Country');
    await queryInterface.dropTable('Currency');

    return true;
  }
};
