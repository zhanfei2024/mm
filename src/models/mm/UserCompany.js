const _ = require('lodash');

module.exports = function (sequelize, DataTypes) {
  const Model = sequelize.define('UserCompany', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    userId: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    companyName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    industryId: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    companyEmail: {
      type: DataTypes.STRING,
      allowNull: false
    },
    mobile: {
      type: DataTypes.STRING,
      allowNull: true
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    scopeOfOperation: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    isDefault: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    schema: 'mm',
    charset: 'utf8',
    timestamps: true,
    freezeTableName: true,
    paranoid: true,
    getterMethods: {},
    setterMethods: {},
    defaultScope: {},
    scopes: {
      includeIndustries: function () {
        return {
          include: [
            {
              model: sequelize.models.Industry, as: 'industry',
              attributes: ['id', 'name'],
              required: false
            }
          ]
        }
      },
    },
  });

  // Class Method
  Model.getAttributes = function () {
    return Object.keys(Model.rawAttributes);
  };
  Model.getReadAttributesByRole = function (roleName) {
    let attributes = this.getAttributes();
    switch (roleName) {
      case 'user':
        return attributes;
      case 'enterprise':
        return attributes;
      case 'public':
        return attributes;
      case 'admin':
        return attributes;
    }
  };
  Model.getEditAttributesByRole = function (roleName) {
    let attributes = this.getAttributes();
    switch (roleName) {
      case 'user':
        return [];
      case 'enterprise':
        return _.without(attributes, 'enterpriseId');
      case 'public':
        return [];
      case 'admin':
        return attributes;
    }
  };
  Model.associate = function (models) {

    Model.belongsTo(models.User, {
      targetKey: 'id',
      foreignKey: 'userId',
      onDelete: 'cascade',
      as: 'user'
    });

    Model.belongsTo(models.Industry, {
      targetKey: 'id',
      foreignKey: 'industryId',
      as: 'industry'
    });
  };

  // Instance Method
  Model.prototype.toJSON = function () {
    const res = this.dataValues;

    // 隐藏字段
    delete res.createdAt;
    delete res.updatedAt;
    delete res.deletedAt;
    return res;
  };

  return Model;
};
