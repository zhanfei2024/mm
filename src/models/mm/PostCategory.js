'use strict';

const _ = require('lodash');


module.exports = function (sequelize, DataTypes) {
  const Model = sequelize.define('PostCategory', {
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
    Model.belongsToMany(models.Post, {
      foreignKey: 'postCategoryId',
      through: {model: models.PostCategoryMap, as: 'postCategoryMap'},
      as: 'posts'
    });
  };


  Model.initSeed = function () {
    const data = [
      {id: 1, name: '新闻', description: '新闻'},
      {id: 2, parentId: 1, name: '新闻资讯', description: '新闻资讯'},
      {id: 3, parentId: 1, name: '慈善公益', description: '慈善公益'},
      {id: 4, parentId: 1, name: '党团工作', description: '党团工作'},
      {id: 5, parentId: 1, name: '经贸资讯', description: '经贸资讯'},
      {id: 6, parentId: 1, name: '国际新闻', description: '国际新闻'},
    ];
    return Model.bulkCreate(data);
  };

  // Instance Method
  Model.prototype.toJSON = function () {
    let res = this.dataValues;

    // 隐藏字段
    delete res.createdAt;
    delete res.updatedAt;
    delete res.parentId;
    delete res.depth;
    delete res.order;

    return res;
  };
  return Model;
};

