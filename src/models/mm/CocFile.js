'use strict';
const _ = require('lodash');
const commonConfig = require('../../config/common');
const jobs = require('../../jobs');
const Storage = require('../../modules/storage');

module.exports = function (sequelize, DataTypes) {
  const Model = sequelize.define('CocFile', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    cocId: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    type: {
      type: DataTypes.ENUM('picture', 'file'),
      allowNull: false,
      defaultValue: 'picture'
    },
    path: {
      type: DataTypes.STRING,
      allowNull: true,
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
        afterDestroy: async function (instance, options) {
          await Storage.disk('local').delete(`/uploads/coc/${coc.id}/${instance.type === 'file' ? 'file' : 'image'}/${key}.${extension}`);
        }
      },
      getterMethods: {},
      setterMethods: {},
      defaultScope: {},
      scopes: {},
    });

  // Class Method
  Model.getEditableKeys = function () {
    return ['cocId'];
  };
  Model.associate = function (models) {
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
    let url;
    if (_.isEqual(res.type, 'file')) {
      url = `${commonConfig.sourceUrl}/coc/${res.cocId}/file/${res.key}.${res.extension}`;
    } else {
      url = `${commonConfig.sourceUrl}/coc/${res.cocId}/image/${res.key}.${res.extension}`;
    }
    this.setDataValue('url', url);

    // hide field
    delete res.key;
    delete res.cocId;

    delete res.createdAt;
    delete res.updatedAt;
    return res;
  };
  return Model;
};

