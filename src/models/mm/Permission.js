const _ = require('lodash');

module.exports = function (sequelize, DataTypes) {
  const Model = sequelize.define('Permission', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    displayName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    indexes: [
      {
        fields: ['name'],
        unique: true,
      },
    ],
    schema: 'mm',
    charset: 'utf8',
    timestamps: false,
    freezeTableName: true,
    getterMethods: {},
    setterMethods: {},
  });

  Model.getAttributes = function () {
    return Object.keys(Model.rawAttributes);
  };

  Model.associate = function (models) {
    Model.belongsToMany(models.Role, {
      foreignKey: 'permissionId',
      through: models.PermissionRole,
      as: 'roles',
    });
  };

  Model.initSeed = function () {
    const permissions = [];
    const modules = ['employees', 'employee_salaries', 'expenses', 'leaves', 'attendances', 'announcements', 'groups', 'payrolls', 'overtimes', 'setting', 'roles', 'approvals'];
    _.each(modules, (value) => {
      permissions.push({ name: `${value}.index` });
      permissions.push({ name: `${value}.store` });
      permissions.push({ name: `${value}.update` });
      permissions.push({ name: `${value}.destroy` });
    });

    return sequelize.models.Permission.bulkCreate(permissions, { returning: true });
  };

  Model.prototype.toJSON = function () {
    const res = this.dataValues;

    // hide field

    return res;
  };
  return Model;
};
