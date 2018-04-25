'use strict';
const _ = require('lodash');
const commonConfig = require('../../config/common');
const jobs = require('../../jobs');

module.exports = function (sequelize, DataTypes) {
  const Model = sequelize.define('Candidate', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    number: {
      type: DataTypes.STRING,
      allowNull: true
    },
    enterpriseId: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    cocId: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    groupId: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    memberRatingId: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    userId: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    type: {
      type: DataTypes.ENUM('invitation', 'appliy'),
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('pending', 'success', 'fail'),
      allowNull: false,
      defaultValue: 'pending'
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true
    },
    introducer: {
      type: DataTypes.STRING,
      allowNull: true
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false
    },
    paymentBalance: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    statement1: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    statement2: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    statement3: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    appliedAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    attachment: {
      type: DataTypes.STRING,
      allowNull: true
    },
    invitationAt: {
      type: DataTypes.DATE,
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
      beforeUpdate: async function (instance, options) {
        const candidate = await sequelize.models.Candidate.findById(instance.id);
        // 如果上传的凭证有更新，将从s3服务器删除旧凭证。
        if (!_.isEqual(instance.attachment, candidate.attachment)) {
          jobs.create('s3::deleteByPath', {
            targetPath: `candidate/${instance.id}/voucher/image/${candidate.key}`
          });
        }
      }
    },
    getterMethods: {},
    setterMethods: {},
    defaultScope: {},
    scopes: {
      includeGroups: function () {
        return {
          include: [
            {
              model: sequelize.models.Group, as: 'group',
              required: false,
              attributes: ['id', 'name'],
            }
          ]
        }
      },
      includeCocs: function (search) {
        const filter = {};
        let required = false;
        if (search) {
          filter.name = {$iLike: `%${search}%`};
          required = true;
        }
        return {
          include: [
            {
              model: sequelize.models.Coc, as: 'coc',
              where: filter,
              required: required,
              attributes: ['id', 'name', 'contacts', 'phone', 'scale', 'address', 'industryId', 'logo'],
              include: [
                {
                  model: sequelize.models.Industry, as: 'industry',
                  required: false
                },
                {
                  model: sequelize.models.Location, as: 'locations'
                }
              ]
            }
          ]
        }
      },
      includeUser: function (input) {
        // 默认只有附带信息
        let filter = {$or: {}};
        let required = false;
        // 有账号查询条件
        if (input && input.account) {
          filter.$or.email = {
            $iLike: `%${input.account}%`
          };
          // 如果是数字还要进行id匹配
          if (/^\d+$/.test(input.account)) {
            filter.$or.id = input.account;
          }
          required = true
        }
        // 有用户名查询条件
        if (input && input.name) {
          filter.$or.firstName = {
            $iLike: `%${input.name}%`
          };
          filter.$or.lastName = {
            $iLike: `%${input.name}%`
          };
          required = true
        }
        if (_.isEmpty(filter.$or)) {
          delete filter.$or;
        }
        return {
          include: [
            {
              attributes: ['id', 'email'],
              model: sequelize.models.User, as: 'user',
              where: filter,
              required: required,
              include: [
                {
                  model: sequelize.models.UserProfile, as: 'userProfile',
                  required: false
                },
                {
                  model: sequelize.models.UserEducation, as: 'userEducation',
                  required: false,
                },
                {
                  model: sequelize.models.UserExperience, as: 'userExperience',
                  required: false,
                },
                {
                  model: sequelize.models.UserCompany, as: 'userCompany',
                  required: false,
                  include: [
                    {
                      model: sequelize.models.Industry, as:'industry',
                      attributes: ['id', 'name'],
                      required: false
                    }
                  ]
                },
              ]
            }
          ]
        }
      },
      includeMemberRating: function () {
        return {
          include: [
            {
              model: sequelize.models.MemberRating, as: 'memberRating',
              attributes: ['id', 'title'],
              required: false,
            }
          ]
        }
      },
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

    Model.belongsTo(models.MemberRating, {
      targetKey: 'id',
      foreignKey: 'memberRatingId',
      onDelete: 'cascade',
      as: 'memberRating'
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

    Model.belongsTo(models.Group, {
      targetKey: 'id',
      foreignKey: 'groupId',
      onDelete: 'cascade',
      as: 'group'
    });


  };

  Model.prototype.toJSON = function () {
    const res = this.dataValues;
    const url = `${commonConfig.sourceUrl}/candidate/${res.id}/voucher/${res.attachment}`;

    this.setDataValue('url', url);

    // hidden field
    delete res.userId;
    delete res.groupId;
    delete res.createdAt;
    delete res.updatedAt;

    return res;
  };
  return Model;
};
