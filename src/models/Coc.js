'use strict';

const _ = require('lodash');
const commonConfig = require('../config/common');
const jobs = require('../jobs');

module.exports = function (sequelize, DataTypes) {
  const Model = sequelize.define('Coc', {
      id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      enterpriseId: {
        type: DataTypes.BIGINT,
        allowNull: false
      },
      countryId: {
        type: DataTypes.BIGINT,
        allowNull: false
      },
      industryId: {
        type: DataTypes.BIGINT,
        allowNull: false
      },
      locationId: {
        type: DataTypes.BIGINT,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      contacts: {
        type: DataTypes.STRING,
        allowNull: false
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false
      },
      logo: {
        type: DataTypes.STRING,
        allowNull: true
      },
      webDomain: {
        type: DataTypes.STRING,
        allowNull: true
      },
      foundingDate: {
        type: DataTypes.DATEONLY,
        allowNull: false
      },
      scale: {
        type: DataTypes.ENUM('30-50', '50-100', '100+'),
        allowNull: false,
        defaultValue: '30-50'
      },
      field: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      isApproved: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      coverImage: {
        type: DataTypes.STRING,
        allowNull: true
      },
      qualifications: {
        type: DataTypes.STRING,
        allowNull: true
      },
      view: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      purpose: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false
      }
    }, {
      schema: 'public',
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
        includeCountries: function () {
          return {
            include: [
              {
                model: sequelize.models.Country, as: 'country',
                attributes: ['id', 'name'],
                required: false
              }
            ]
          }
        },
        includeCocTags: function () {
          return {
            include: [
              {
                model: sequelize.models.Coc, as: 'tags',
                attributes: ['name'],
                througn: {
                  model: sequelize.models.Taggable, as: 'taggable',
                  where: {
                    type: 'CocTag'
                  }
                },
                required: false
              }
            ]
          }
        },
        includeLocation: function () {
          return {
            include: [
              {
                model: sequelize.models.Location, as: 'locations',
                attributes: ['id', 'name']
              }
            ]
          };
        },
        includeEnterprise: function () {
          return {
            include: [
              {
                model: sequelize.models.Enterprise, as: 'enterprise'
              }
            ]
          }
        },
        // 模糊查找
        includeIndustriesWithSearch: function (search) {
          return {
            include: [
              {
                model: sequelize.models.Industry, as: 'industrySearch',
                attributes: ['id', 'name', 'description'],
                where: {
                  $or: {
                    name: {
                      $iLike: `%${search}%`
                    }
                  }
                },
                required: true
              },
            ]
          }
        },
        includeCocTagsWithSearch: function (keyword) {
          let orCondition = [];
          _.each(keyword, function (val) {
            orCondition.push(val.id);
          });
          return {
            include: [
              {
                model: sequelize.models.Tag, as: 'tagsSearch',
                attributes: ['id', 'name'],
                through: {
                  model: sequelize.models.Taggable, as: 'taggable',
                  where: {
                    type: 'CocTag',
                    tagId: {
                      $in: orCondition
                    }
                  }
                },
                where: {
                  id: {
                    $in: orCondition
                  }
                }
              }
            ]
          }
        },
        includeLocationWithSearch: function (search) {
          return {
            include: [
              {
                model: sequelize.models.Location, as: 'locationsSearch',
                where: {
                  $or: {
                    name: {
                      $iLike: `%${search}%`
                    }
                  }
                },
                required: true
              }
            ]
          }
        }
      },
      hooks:
        {
          beforeUpdate: async function (coc, options) {
            const result = await sequelize.models.Coc.findById(coc.id);
            // 如果上传有新的logo，将从s3服务器删除旧logo。
            if (!_.isEqual(result.logo, coc.logo)) {
              jobs.create('s3::deleteByPath', {
                targetPath: `coc/${coc.id}/logo/${result.logo}`
              });
            }
            if (!_.isEqual(result.coverImage, coc.coverImage)) {
              jobs.create('s3::deleteByPath', {
                targetPath: `coc/${coc.id}/coverImage/${result.coverImage}`
              });
            }
          }
        }

    }
    )
  ;

// Class Method
  Model.getAttributes = function () {
    return Object.keys(Model.rawAttributes);
  };

  Model.associate = function (models) {
    Model.belongsTo(models.Industry, {
      targetKey: 'id',
      foreignKey: 'industryId',
      as: 'industry'
    });

    Model.belongsTo(models.Industry, {
      targetKey: 'id',
      foreignKey: 'industryId',
      as: 'industrySearch'
    });


    Model.belongsTo(models.Enterprise, {
      targetKey: 'id',
      foreignKey: 'enterpriseId',
      onDelete: 'cascade',
      as: 'enterprise'
    });

    Model.belongsTo(models.Country, {
      targetKey: 'id',
      foreignKey: 'countryId',
      onDelete: 'cascade',
      as: 'country'
    });

    Model.belongsToMany(models.Tag, {
      constraints: false,
      foreignKey: 'taggableId',
      otherKey: 'tagId',
      through: {model: models.Taggable, as: 'taggable'},
      as: 'tagsSearch'
    });

    Model.belongsToMany(models.Tag, {
      constraints: false,
      foreignKey: 'taggableId',
      otherKey: 'tagId',
      through: {model: models.Taggable, as: 'taggable'},
      as: 'tags'
    });

    Model.belongsTo(models.Location, {
      targetKey: 'id',
      foreignKey: 'locationId',
      onDelete: 'RESTRICT',
      as: 'locations'
    });

    Model.belongsTo(models.Location, {
      targetKey: 'id',
      foreignKey: 'locationId',
      onDelete: 'RESTRICT',
      as: 'locationsSearch'
    });
  };

// Instance Method
  Model.prototype.toJSON = function () {
    const res = this.dataValues;

    if (res.logo != null) {
      this.setDataValue('logoUrl', `${commonConfig.sourceUrl}/coc/${res.id}/logo/${res.logo}`);
    } else {
      if (res.gender == 'M') {
        this.setDataValue('logoUrl', `/assets/img/avatars/default-M.png`);
      } else {
        this.setDataValue('logoUrl', `/assets/img/avatars/default-F.png`);
      }
    }
    if (res.coverImage != null) {
      this.setDataValue('coverImageUrl', `${commonConfig.sourceUrl}/coc/${res.id}/coverImage/${res.coverImage}`);
    }
    if (!_.isNil(res.qualifications)) {
      this.setDataValue('qualificationUrl', `${commonConfig.sourceUrl}/coc/${res.id}/qualification/${res.qualifications}`);
    }

    // hidden field
    delete res.enterpriseId;
    delete res.countryId;
    delete res.industryId;
    delete res.logo;

    return res;
  };

  return Model;
}
;
