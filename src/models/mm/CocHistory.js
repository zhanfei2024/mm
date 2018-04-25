'use strict';

module.exports = function (sequelize, DataTypes) {
  const Model = sequelize.define('CocHistory', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    enterpriseId: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    cocId: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  }, {
    schema: 'mm',
    charset: 'utf8',
    timestamps: true,
    freezeTableName: true,
    getterMethods: {},
    setterMethods: {},
    scopes: {
      includeCocs: function () {
        return {
          include: [
            {
              model: sequelize.models.Coc, as: 'coc',
              required: false,
              attributes: ['id', 'name'],
            }
          ]
        }
      }
    },
  });
  // Class Method
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

    Model.belongsTo(models.Coc, {
      targetKey: 'id',
      foreignKey: 'cocId',
      onDelete: 'cascade',
      as: 'coc'
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


