'use strict';

const _ = require('lodash');
const commonConfig = require('../../config/common');
const jobs = require('../../jobs');
const Storage = require('../../modules/storage');

module.exports = function (sequelize, DataTypes) {
  const Model = sequelize.define('JointWork', {
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
    title: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    jointWorkCocId: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    linkUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    logo: {
      type: DataTypes.STRING,
      allowNull: true,
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
    hooks: {
      async afterDestroy(instance) {
        await Storage.disk('local').delete(`/uploads/joint-work/${instance.id}/image/${instance.logo}`);
      }
    },
    getterMethods: {},
    setterMethods: {},
    defaultScope: {},
    scopes: {
      includeJointWorkCoc: function () {
        return {
          include: [
            {
              model: sequelize.models.Coc, as: 'jointWorkCoc',
              required: false,
            }
          ]
        };
      },
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

    Model.belongsTo(models.Coc, {
      targetKey: 'id',
      foreignKey: 'jointWorkCocId',
      onDelete: 'cascade',
      as: 'jointWorkCoc'
    });

  };

  Model.prototype.toJSON = function () {
    const res = this.dataValues;

    if (!!res.logo) {
      const url = `${commonConfig.sourceUrl}/joint-work/${res.id}/image/${res.logo}`;
      this.setDataValue('url', url);
    }

    // hidden field
    //delete res.id;
    delete res.cocId;
    delete res.enterpriseId;
    delete res.jointWorkCocId;
    delete res.logo;
    delete res.order;
    delete res.createdAt;
    delete res.updatedAt;

    return res;
  };
  return Model;
};
