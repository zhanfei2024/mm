'use strict';
const _ = require('lodash');

module.exports = function (sequelize, DataTypes) {
  const Model = sequelize.define('Bank', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    enterpriseId: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    cocId: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    cardNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bankName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    accountHolder: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    payType: {
      type: DataTypes.ENUM('transfer,check,online'),
      allowNull: false,
      defaultValue: 'online'
    },
    depositBank: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    order: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
  }, {
    schema: 'mm',
    charset: 'utf8',
    timestamps: true,
    freezeTableName: true,
    hooks: {},
    getterMethods: {},
    setterMethods: {},
    defaultScope: {},
    scopes: {
      includeCoc: function (search) {
        let include = null;
        if (_.isNil(search)) {
          include = [{model: sequelize.models.Coc, as: 'coc', attributes: ['id', 'name'], required: false}];
        } else {
          include = [{
            model: sequelize.models.Coc, as: 'coc',
            attributes: ['id', 'name'],
            where: {
              name: {
                $iLike: `%${search}%`
              }
            },
            required: false
          }];
        }
        return {
          include: include
        };
      }
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

    Model.belongsTo(models.Coc, {
      targetKey: 'id',
      foreignKey: 'cocId',
      onDelete: 'cascade',
      as: 'coc'
    });
  };

  Model.prototype.toJSON = function () {
    const res = this.dataValues;

    // 隐藏字段
    delete res.updatedAt;
    return res;
  };
  return Model;
};
