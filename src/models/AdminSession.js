const _ = require('lodash');

module.exports = function (sequelize, DataTypes) {
  const Model = sequelize.define('AdminSession', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    adminId: {
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
      { fields: ['adminId', 'token'] }
    ],
    getterMethods: {},
    setterMethods: {},
    defaultScope: {},
    scopes: {
      includeAdmin: function () {
        return {
          include: [
            {
              model: sequelize.models.Admin, as: 'admin',
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
    Model.belongsTo(models.Admin, {
      targetKey: 'id',
      foreignKey: 'adminId',
      onDelete: 'cascade',
      as: 'admin'
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
