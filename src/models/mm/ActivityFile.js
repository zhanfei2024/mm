'use strict';

const commonConfig = require('../../config/common');
const jobs = require('../../jobs');
const Storage = require('../../modules/storage');

module.exports = function (sequelize, DataTypes) {
  const Model = sequelize.define('ActivityFile', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    activityId: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    type: {
      type: DataTypes.ENUM('cover', 'file'),
      allowNull: true,
      defaultValue: 'cover'
    },
    size: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: 0
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    key: {
      type: DataTypes.STRING,
      allowNull: false
    },
    extension: {
      type: DataTypes.STRING,
      allowNull: false
    },
    mime: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
    schema: 'mm',
    charset: 'utf8',
    timestamps: true,
    freezeTableName: true,
    hooks: {
      afterDestroy: async function(instance, options) {
        await Storage.disk('local').delete(`/uploads/activity/${instance.id}/file/${instance.key}/${instance.name}.${instance.extension}`);
      }
    },
    getterMethods: {},
    setterMethods: {},
  });

  // Class Method
  Model.getAttributes = function () {
    return Object.keys(Model.rawAttributes);
  };
  Model.associate = function (models) {
    Model.belongsTo(models.Activity, {
      targetKey: 'id',
      foreignKey: 'activityId',
      onDelete: 'cascade',
      as: 'activities'
    });
  };
  // Instance Method
  Model.prototype.toJSON = function () {
    const res = this.dataValues;
    const url = `${commonConfig.sourceUrl}/activity/${res.activityId}/file/${res.key}/${res.name}.${res.extension}`;

    this.setDataValue('url', url);
    // hide field
    delete res.key;
    delete res.size;
    delete res.mime;
    delete res.extension;
    delete res.createdAt;
    delete res.updatedAt;
    return res;
  };
  return Model;
};

