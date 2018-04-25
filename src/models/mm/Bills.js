'use strict';

module.exports = function (sequelize, DataTypes) {
  const Model = sequelize.define('Bills', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    userId: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    currency: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      defaultValue: 0
    },
    type: {
      type: DataTypes.ENUM('invitation', 'liberties'),
      allowNull: true
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    billedAt: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    schema: 'mm',
    charset: 'utf8',
    timestamps: true,
    freezeTableName: true,
    getterMethods: {},
    setterMethods: {},
    scopes: {
      includeUser: function () {
        return {
          include: [
            {
              model: sequelize.models.User, as: 'user',
            }
          ]
        };
      },
    },
  });
  // Class Method
  Model.getAttributes = function () {
    return Object.keys(Model.rawAttributes);
  };
  Model.associate = function (models) {
    Model.belongsTo(models.User, {
      targetKey: 'id',
      foreignKey: 'userId',
      onDelete: 'cascade',
      as: 'user'
    });
  };

  // Instance Method
  Model.prototype.toJSON = function () {
    const res = this.dataValues;

    delete res.createdAt;
    delete res.updatedAt;
    return res;
  };
  return Model;
};


