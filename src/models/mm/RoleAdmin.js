module.exports = function (sequelize, DataTypes) {
  const Model = sequelize.define('RoleAdmin', {
  }, {
    schema: 'mm',
    charset: 'utf8',
    timestamps: true,
    freezeTableName: true,
    getterMethods: {},
    setterMethods: {},
    scopes: {
    },
  });

  Model.getAttributes = function () {
    return Object.keys(Model.rawAttributes);
  };

  Model.associate = function (models) {

  };

  Model.prototype.toJSON = function () {
    const res = this.dataValues;

    // hide field
    delete res.teamId;

    return res;
  };
  return Model;
};
