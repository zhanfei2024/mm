'use strict';

const _ = require('lodash');


module.exports = function (sequelize, DataTypes) {
  const Model = sequelize.define('ActivityCategories', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    parentId: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    depth: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    order: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    schema: 'mm',
    charset: 'utf8',
    timestamps: true,
    freezeTableName: true,
    getterMethods: {},
    setterMethods: {}
  });
  // Class Method
  Model.getAttributes = function () {
    return Object.keys(Model.rawAttributes);
  };
  Model.associate = function (models) {
    Model.belongsToMany(models.Activity, {
      foreignKey: 'categoriesId',
      through: {model: models.ActivityCategoriesMap, as: 'activityCategoriesMap'},
      as: 'activities'
    });
  };


  Model.initSeed = function () {
    const data = [
      {id: 1, name: '活动', description: '活动', order: 1},
      {id: 2, parentId: 1, name: '室内活动', description: '室内活动', order: 2},
      {id: 3, parentId: 1, name: '户外活动', description: '户外活动', order: 3},
      {id: 4, parentId: 1, name: '野外活动', description: '野外活动', order: 4},
      {id: 5, parentId: 1, name: '商业性活动', description: '商业性活动', order: 5},
      {id: 6, parentId: 1, name: '公益性活动', description: '公益性活动', order: 6},
      {id: 7, parentId: 1, name: '专页性活动', description: '专页性活动', order: 7},
      {id: 8, parentId: 1, name: '社会工作活动', description: '社会工作活动', order: 8},
      {id: 9, parentId: 1, name: '综合性活动', description: '综合性活动', order: 9},
      {id: 10, parentId: 1, name: '会议型活动', description: '会议型活动', order: 10},
      {id: 11, parentId: 1, name: '庆典活动', description: '庆典活动', order: 11},
      {id: 12, parentId: 1, name: '展示型活动', description: '展示型活动', order: 12},
    ];
    return Model.bulkCreate(data);
  };


  // Instance Method
  Model.prototype.toJSON = function () {
    const res = this.dataValues;

    //隐藏字段
    delete res.createAt;
    delete res.updatedAt;

    return res;
  };
  return Model;
};

