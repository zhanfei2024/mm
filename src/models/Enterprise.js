// library
const bcrypt = require('bcryptjs');
const commonConfig = require('../config/common');
const jobs = require('../jobs');
const _ = require('lodash');
module.exports = function (sequelize, DataTypes) {
  const Model = sequelize.define('Enterprise', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    planId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    verifiedEmail: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    emailToken: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    languageId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: 1,
    },
    emailTokenUpdatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    timezone: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '+00:00',
    },
    credit: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      defaultValue: 0,
    },
    IDFront: {
      type: DataTypes.STRING,
      allowNull: true
    },
    IDBack: {
      type: DataTypes.STRING,
      allowNull: true
    },
    remark: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  }, {
    schema: 'public',
    charset: 'utf8',
    timestamps: true,
    freezeTableName: true,
    paranoid: true,
    indexes: [
      {fields: ['email']},
      {fields: ['emailToken']},
    ],
    getterMethods: {
      fullName() {
        return `${this.firstName} ${this.lastName}`;
      },
    },
    hooks: {
      beforeCreate(instance) {
        instance.password = bcrypt.hashSync(instance.password, 10);
      },
      beforeUpdate() {

      },
      beforeUpdate: async function (enterprise, options) {
        if (options.fields.includes('password')) enterprise.password = bcrypt.hashSync(enterprise.password, 10);
        // 如果上传有新的logo，将从s3服务器删除旧logo。
        if (!_.isEqual(enterprise.IDFront, enterprise.IDFront)) {
          jobs.create('s3::deleteByPath', {
            targetPath: `enterprise/${enterprise.id}/IDFont/image/${enterprise.IDFront}`
          });
        }
        if (!_.isEqual(enterprise.organizationChart, enterprise.organizationChart)) {
          jobs.create('s3::deleteByPath', {
            targetPath: `enterprise/${enterprise.id}/IDBack/image/${enterprise.IDBack}`
          });
        }
      },
    },
    setterMethods: {},
    scopes: {
      includeEnterpriseSession() {
        return {
          include: {
            model: sequelize.models.EnterpriseSession, as: 'enterpriseSessions'
          }
        }
      }
    },

  });

  Model.getAttributes = function () {
    return Object.keys(Model.rawAttributes);
  };

  Model.associate = function (models) {
    Model.belongsTo(models.Language, {
      targetKey: 'id',
      foreignKey: 'languageId',
      onDelete: 'restrict',
      as: 'language',
    });

    Model.hasMany(models.AuthenticationProvider, {
      targetKey: 'id',
      foreignKey: 'enterpriseId',
      onDelete: 'cascade',
      as: 'providers',
    });

    Model.hasMany(models.EnterpriseSession, {
      targetKey: 'id',
      foreignKey: 'enterpriseId',
      onDelete: 'cascade',
      as: 'enterpriseSessions'
    });

    Model.belongsTo(models.Plan, {
      targetKey: 'id',
      foreignKey: 'planId',
      onDelete: 'cascade',
      as: 'plan',
    });
  };

  Model.prototype.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
  };

  Model.prototype.toJSON = function () {
    const res = this.dataValues;

    if (res.IDFront != null) {
      this.setDataValue('IDFrontUrl', `${commonConfig.sourceUrl}/enterprise/${res.id}/IDFront/image/${res.IDFront}`);
    }
    if (res.IDBack != null) {
      this.setDataValue('IDBackUrl', `${commonConfig.sourceUrl}/enterprise/${res.id}/IDBack/image/${res.IDBack}`);
    }

    // hide field
    delete res.password;
    delete res.planId;
    delete res.createdAt;
    delete res.updatedAt;
    delete res.deletedAt;

    return res;
  };
  return Model;
};
