const _ = require('lodash');

module.exports = function (sequelize, DataTypes) {
  const Model = sequelize.define('EnterpriseSession', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    enterpriseId: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false
    },
    agent: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    ip: {
      type: DataTypes.STRING,
      allowNull: true
    },
    lastUsedAt: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    schema: 'public',
    charset: 'utf8',
    timestamps: true,
    freezeTableName: true,
    indexes: [
      { fields: ['enterpriseId', 'token'] }
    ],
    getterMethods: {},
    setterMethods: {},
    defaultScope: {},
    scopes: {
      includeCoc: function () {
        return {
          include: [
            {
              model: sequelize.models.Enterprise, as: 'enterprise',
            }
          ]
        };
      },
    },
  });


  Model.getAttributes = function () {
    return Object.keys(Model.rawAttributes);
  };

  Model.associate = function (models) {
    Model.belongsTo(models.Enterprise, {
      targetKey: 'id',
      foreignKey: 'enterpriseId',
      onDelete: 'cascade',
      as: 'enterprise'
    });
  };

  Model.prototype.toJSON = function () {
    let res = this.dataValues;

    // hide field
    delete res.password;

    return res;
  };

  return Model;
};
