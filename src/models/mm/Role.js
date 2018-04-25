// library

const _ = require('lodash');

module.exports = function (sequelize, DataTypes) {
  const Model = sequelize.define('Role', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    teamId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  }, {
    schema: 'mm',
    charset: 'utf8',
    timestamps: true,
    freezeTableName: true,
    getterMethods: {},
    setterMethods: {},
    scopes: {
      includePermissions() {
        return {
          include: [
            {
              model: sequelize.models.Permission,
              as: 'permissions',
              required: false
            },
          ],
        };
      },
    },
  });

  Model.getAttributes = function () {
    return Object.keys(Model.rawAttributes);
  };

  Model.associate = function (models) {
    Model.belongsToMany(models.Permission, {
      foreignKey: 'roleId',
      through: models.PermissionRole,
      as: 'permissions',
    });
  };

  Model.prototype.toJSON = function () {
    const res = this.dataValues;

    // hide field
    delete res.teamId;

    return res;
  };
  return Model;
};
