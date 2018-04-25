'use strict';

module.exports = function (sequelize, DataTypes) {
  const Model = sequelize.define('Activity', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    enterpriseId: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    cocId: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false
    },
    startTimedAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    endTimedAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    signUpEndTimedAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    expenses: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      defaultValue: 0
    },
    personnelNumber: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    organizers: {
      type: DataTypes.STRING,
      allowNull: true
    },
    trafficMode: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    refundInfo: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    specialInfo: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    flow: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM('sign-up', 'close', 'in-process', 'ended', 'full'),
      allowNull: false,
      defaultValue: 'sign-up'
    },
    view: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    isPublic: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    isApproved: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    isFeatured: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    isFree: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    applyNumberOfPeople: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    hostCoc: {
      type: DataTypes.STRING,
      allowNull: false
    },
    hostContacts: {
      type: DataTypes.STRING,
      allowNull: false
    },
    hostPhone: {
      type: DataTypes.STRING,
      allowNull: false
    },
    hostEmail: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
    schema: 'mm',
    charset: 'utf8',
    timestamps: true,
    freezeTableName: true,
    getterMethods: {},
    setterMethods: {},
    scopes: {
      includeCategories: function (arr) {
        let include = {};
        if (arr) {
          include = [
            {
              model: sequelize.models.ActivityCategories, as: 'categories',
              through: {
                model: sequelize.models.ActivityCategoriesMap, as: 'activityCategoryMap',
                where: {
                  'categoriesId': arr
                }
              },
              required: true
            }
          ];
        } else {
          include = [
            {
              model: sequelize.models.ActivityCategories, as: 'categories',
              attributes: ['name'],
              through: {model: sequelize.models.ActivityCategoriesMap, as: 'activityCategoriesMap'},
              required: false,
            }
          ];
        }
        return {
          include: include
        };
      },
      includeCoc: function () {
        return {
          include: [
            {
              model: sequelize.models.Coc,
              as: 'coc',
              attributes: ['id', 'name'],
              required: true
            }
          ]
        }
      },
      includeCocWithSearch: function (search) {
        return {
          include: [
            {
              model: sequelize.models.Coc, as: 'coc',
              where: {
                name: {
                  $iLike: `%${search}%`
                }
              }
            }
          ]
        }
      },
      includeAttachments: function () {
        return {
          include: [
            {
              model: sequelize.models.ActivityFile, as: 'attachments',
              attributes: ['id', 'type', 'activityId', 'key', 'name', 'extension'],
              required: false,
            }
          ]
        };
      },
      includeCandidates: function () {
        return {
          include: [
            {
              model: sequelize.models.ActivityCandidate, as: 'candidates',
              include: [{
                model: sequelize.models.User, as: 'user',
                include: [{
                  model: sequelize.models.UserProfile, as: 'userProfile'
                }]
              }],
              required: false
            }
          ]
        };
      },
      sorting: function (type) {
        let sort;
        let attribute;
        switch (type) {
          case 'newest':
            sort = [['updatedAt', 'DESC']];
            attribute = 'updatedAt';
            break;
          case 'featured':
            sort = [['isFeatured', 'DESC'], ['updatedAt', 'DESC']];
            attribute = 'isFeatured';
            break;
          default:
            sort = [['updatedAt', 'DESC']];
            attribute = 'updatedAt';
            break;
        }
        return {
          attributes: {
            include: attribute
          },
          order: sort
        };
      },
    },
  });
  // Class Method
  Model.getAttributes = function () {
    return Object.keys(Model.rawAttributes);
  };
  Model.associate = function (models) {
    Model.belongsToMany(models.ActivityCategories, {
      foreignKey: 'activityId',
      otherKey: 'categoriesId',
      through: {model: models.ActivityCategoriesMap, as: 'activityCategoriesMap'},
      as: 'categories'
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

    Model.hasMany(models.ActivityFile, {
      targetKey: 'id',
      foreignKey: 'activityId',
      onDelete: 'cascade',
      as: 'attachments'
    });

    Model.hasMany(models.ActivityCandidate, {
      targetKey: 'id',
      foreignKey: 'activityId',
      onDelete: 'cascade',
      as: 'candidates'
    });
  };

  // Instance Method
  Model.prototype.toJSON = function () {
    const res = this.dataValues;

    // hidden field
    delete res.enterpriseId;
    delete res.cocId;
    delete res.trafficMode;
    delete res.refundInfo;
    delete res.updatedAt;

    return res;
  };
  return Model;
};


