module.exports = function (sequelize, DataTypes) {
  const Model = sequelize.define('AuthenticationProvider', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    providerId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    provider: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    enterpriseId: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
  }, {
    schema: 'public',
    charset: 'utf8',
    timestamps: false,
    freezeTableName: true,
    indexes: [
      { fields: ['provider', 'providerId'] },
    ],
    getterMethods: {},
    setterMethods: {},
    defaultScope: {},
    scopes: {},
  });

  Model.getAttributes = function () {
    return Object.keys(Model.rawAttributes);
  };

  Model.associate = function (models) {
    Model.belongsTo(models.User, {
      targetKey: 'id',
      foreignKey: 'userId',
      onDelete: 'cascade',
      as: 'user',
    });

    Model.belongsTo(models.Enterprise, {
      targetKey: 'id',
      foreignKey: 'enterpriseId',
      onDelete: 'cascade',
      as: 'enterprise',
    });
  };

  Model.prototype.toJSON = function () {
    const res = this.dataValues;

    // hide field

    return res;
  };
  return Model;
};
