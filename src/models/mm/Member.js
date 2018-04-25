'use strict';

module.exports = function (sequelize, DataTypes) {
  const Model = sequelize.define('Member', {
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
      allowNull: false
    },
    cocId: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    groupId: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    memberRatingId: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    userId: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    expireDate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    schema: 'mm',
    charset: 'utf8',
    timestamps: true,
    freezeTableName: true,
    getterMethods: {},
    setterMethods: {},
    scopes: {
      includeUser: function () {
        return {
          include: [
            {
              model: sequelize.models.User, as: 'user',
              required: false,
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
                      model: sequelize.models.Industry, as: 'industry',
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

      includeGroup: function () {
        return {
          include: [{
            model: sequelize.models.Group, as: 'group',
            required: false
          }]
        }
      },
      includeCoc: function () {
        return {
          include: [
            {
              model: sequelize.models.Coc, as: 'coc',
              required: false
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
    }
  });

  Model.getAttributes = function () {
    return Object.keys(Model.rawAttributes);
  };

  Model.associate = function (models) {
    Model.belongsTo(models.Group, {
      targetKey: 'id',
      foreignKey: 'groupId',
      onDelete: 'cascade',
      as: 'group'
    });

    Model.belongsTo(models.MemberRating, {
      targetKey: 'id',
      foreignKey: 'memberRatingId',
      onDelete: 'cascade',
      as: 'memberRating'
    });

    Model.belongsTo(models.User, {
      targetKey: 'id',
      foreignKey: 'userId',
      onDelete: 'cascade',
      as: 'user'
    });

    Model.belongsTo(models.Coc, {
      targetKey: 'id',
      foreignKey: 'cocId',
      onDelete: 'cascade',
      as: 'coc'
    });

    Model.belongsTo(models.Enterprise, {
      targetKey: 'id',
      foreignKey: 'enterpriseId',
      onDelete: 'cascade',
      as: 'enterprise'
    });
  };

  Model.prototype.toJSON = function () {
    const res = this.dataValues;

    // hide field
    delete res.createdAt;
    delete res.updatedAt;
    return res;
  };
  return Model;
};

