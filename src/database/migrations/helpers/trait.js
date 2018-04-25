const _ = require('lodash');
const models = require('../../../models');

const queryInterface = models.sequelize.queryInterface;
const Sequelize = models.Sequelize;

function addTimestamps(tableName) {
  return Promise.all([
    queryInterface.addColumn(tableName, 'createdAt',
      {
        type: Sequelize.DATE,
        allowNull: false,
      }
    ),
    queryInterface.addColumn(tableName, 'updatedAt',
      {
        type: Sequelize.DATE,
        allowNull: false,
      }
    ),
  ]);
}

async function addTeamId(tableName, indexNames) {
  await queryInterface.addColumn(tableName, 'teamId',
    {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: 'Team',
        key: 'id'
      }
    }
  );

  return queryInterface.addIndex(tableName, _.isUndefined(indexNames) ? ['teamId', 'id'] : _.concat(['teamId'], indexNames));
}

module.exports = {
  addTimestamps,
  addTeamId,
};
