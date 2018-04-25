const trait = require('../helpers/trait');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * EducationLevel
     */
    await queryInterface.createTable('EducationLevel', {
      id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      order: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      }
    });
    await trait.addTimestamps('EducationLevel');
    await trait.addTeamId('EducationLevel');

    return true;
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('EducationLevel');

    return true;
  }
};
