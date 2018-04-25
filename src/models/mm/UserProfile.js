'use strict';

const _ = require('lodash');
const commonConfig = require('../../config/common');
const jobs = require('../../jobs');

module.exports = function (sequelize, DataTypes) {
  const Model = sequelize.define('UserProfile', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    userId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      unique: true
    },
    countryId: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    IDNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    gender: {
      type: DataTypes.ENUM('M', 'F'),
      allowNull: false,
      defaultValue: 'M',
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    IDType:{
      type: DataTypes.ENUM('id','pass','passport','driver'),
      allowNull:true
    },
    age:{
      type: DataTypes.STRING,
      allowNull:true
    },
    email:{
      type:DataTypes.STRING,
      allowNull:false
    },
    remark: {
      type: DataTypes.TEXT,
      allowNull: true
    },
  }, {
    schema: 'mm',
    charset: 'utf8',
    timestamps: true,
    freezeTableName: true,
    hooks: {
      beforeUpdate: async function (instance, options) {

      }
    },
    getterMethods: {},
    setterMethods: {},
    defaultScope: {},
    scopes: {
      includeCountry: function() {
        return {
          include: [
            {
              model: sequelize.models.Country, as: 'country',
              attributes: ['id', 'name', 'code'],
              required: false
            }
          ]
        }
      }
    },
  });

  Model.getAttributes = function () {
    return Object.keys(Model.rawAttributes);
  };

  Model.associate = function (models) {
    Model.belongsTo(models.Country, {
      targetKey: 'id',
      foreignKey: 'countryId',
      onDelete: 'cascade',
      as: 'country'
    });

    Model.belongsTo(models.User, {
      targetKey: 'id',
      foreignKey: 'userId',
      onDelete: 'cascade',
      as: 'user'
    });
  };

  Model.prototype.toJSON = function () {
    const res = this.dataValues;
    if (!!res.avatar) {
      const avatar = `${commonConfig.sourceUrl}/userProfile/${res.id}/image/${res.avatar}`;
      this.setDataValue('avatar', avatar);
    }

    //hidden field
    delete res.createdAt;
    delete res.updatedAt;

    return res;
  };
  return Model;
};
