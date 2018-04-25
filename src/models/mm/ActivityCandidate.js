'use strict';
const _ = require('lodash');
const commonConfig = require('../../config/common');
const jobs = require('../../jobs');

module.exports = function (sequelize, DataTypes) {
  const Model = sequelize.define('ActivityCandidate', {
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
    activityId: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    userId: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    contact: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    numberOfPeople: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('pending', 'success', 'fail'),
      allowNull: false,
      defaultValue: 'pending'
    },
    paymentBalance: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      defaultValue: 0
    },
    appliedAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    attachment: {
      type: DataTypes.STRING,
      allowNull: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
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

      },
      getterMethods: {},
      setterMethods: {},
      defaultScope: {},
      scopes: {
        includeCocs: function () {
          return {
            include: [
              {
                model: sequelize.models.Coc, as: 'coc',
                include: [
                  {
                    model: sequelize.models.Industry, as: 'industry',
                    attributes: ['id', 'name']
                  },
                  {
                    model: sequelize.models.Location, as: 'locations',
                    attributes: ['id', 'name']
                  }
                ],
                required: false
              }
            ]
          }
        },
        includeUser: function () {
          return {
            include: [
              {
                model: sequelize.models.User, as: 'user',
                required: false
              }
            ]
          }
        },
        includeActivities: function () {
          return {
            include: [
              {
                model: sequelize.models.Activity, as: 'activities',
                required: false
              }
            ]
          }
        },
        includeActivitiesWithSearch: function (search) {
          return {
            include: [
              {
                model: sequelize.models.Activity, as: 'activities',
                where: {
                  $or: {
                    title: {
                      $iLike: `%${search}%`
                    },
                    address: {
                      $iLike: `%${search}%`
                    }
                  }
                },
                required: true
              }
            ]
          }
        },
        includeActivitiesWithStatus: function (status) {
          return {
            include: [
              {
                model: sequelize.models.Activity, as: 'activities',
                where: {
                  status: status
                },
                required: true
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
    Model.belongsTo(models.User, {
      targetKey: 'id',
      foreignKey: 'userId',
      onDelete: 'cascade',
      as: 'user'
    });

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

    Model.belongsTo(models.Activity, {
      targetKey: 'id',
      foreignKey: 'activityId',
      onDelete: 'cascade',
      as: 'activities'
    });
  };

  Model.prototype.toJSON = function () {
    const res = this.dataValues;
    if (!!res.attachment) {
      const url = `${commonConfig.sourceUrl}/activity/candidate/${res.id}/voucher/${res.attachment}`;
      this.setDataValue('url', url);
    }

    // 隐藏字段
    delete res.cocId;
    delete res.description;
    delete res.attachment;
    delete res.appliedAt;
    delete res.createdAt;
    delete res.updatedAt;

    return res;
  };
  return Model;
};
