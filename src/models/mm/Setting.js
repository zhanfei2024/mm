'use strict';
const _ = require('lodash');
const commonConfig = require('../../config/common');
const jobs = require('../../jobs');

module.exports = function (sequelize, DataTypes) {
  const Model = sequelize.define('Setting', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    global: {
      type: DataTypes.JSONB,
      allowNull: false,
      defaultValue: '{}'
    }
  }, {
      charset: 'utf8',
      timestamps: false,
      freezeTableName: true,
      hooks: {},
      getterMethods: {},
      setterMethods: {},
    });


  Model.getEditableKeys = function () {
    return Object.keys(Model.rawAttributes);
  };

  Model.initSeed = function () {
    const data = [
      {
        global: JSON.stringify({
          name: '',
          title: '',
          description: '初始化中',
          keywords: '',
          key: '',
          extension: '',
          footer: '',
          statisticsCode: ''
        })
      }
    ];
    return Model.bulkCreate(data);
  };


  Model.prototype.toJSON = function () {
    const res = this.dataValues;

    if (_.isNil(res.global) || _.isEmpty(res.global.key) || _.isEmpty(res.global.extension)) {
      res.logoUrl = '/assets/img/logo/logo.png';
    } else {
      res.logoUrl = `${commonConfig.sourceUrl}/setting/${res.id}/image/${res.global.key}.${res.global.extension}`;
    }

    return res;
  };


  return Model;
};
