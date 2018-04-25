'use strict';

const _ = require('lodash');

module.exports = function (sequelize, DataTypes) {
  const Model = sequelize.define('Post', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    enterpriseId: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    cocId: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: true
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    view: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    isFeatured: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    isApproved: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    isPublic: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  }, {
      schema: 'mm',
      charset: 'utf8',
      timestamps: true,
      freezeTableName: true,
      getterMethods: {},
      setterMethods: {},
      defaultScope: {},
      scopes: {
        attribute: function (data) {
          return {
            attributes: {
              include: data
            }
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
            case 'popular':
              sort = [['view', 'DESC']];
              attribute = 'view';
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
        includePostTags: function () {
          return {
            include: [
              {
                model: sequelize.models.Tag, as: 'tags',
                attributes: ['name'],
                through: {
                  model: sequelize.models.Taggable, as: 'taggable',
                  where: {
                    type: 'PostTag',
                  }
                },
                required: false,
              }
            ]
          };
        },
        includePostTagsWithSearch: function (keyword) {
          let orCondition = [];
          _.each(keyword, function (val) {
            orCondition.push(val.id)
          });
          return {
            include: [
              {
                model: sequelize.models.Tag, as: 'tagsSearch',
                attributes: ['id', 'name'],
                through: {
                  model: sequelize.models.Taggable, as: 'taggable',
                  where: {
                    type: 'PostTag',
                    tagId: {
                      $in: orCondition
                    }
                  }
                },
                where: {
                  id: {
                    $in: orCondition
                  }
                },
              }
            ]
          };
        },
        includeCategories: function () {
          return {
            include: [
              {
                model: sequelize.models.PostCategory, as: 'categories',
                attributes: ['id', 'name'],
                through: { model: sequelize.models.PostCategoryMap, as: 'postCategoryMap', attributes: [] },
                required: false,
              }
            ]
          };
        },
        includeCategoriesWithSearch: function (categoryIds, filter) {
          if (!_.isArray(categoryIds)) categoryIds = [categoryIds];
          return {
            include: [
              {
                model: sequelize.models.PostCategory, as: 'categoriesSearch',
                attributes: ['id', 'name'],
                through: {
                  model: sequelize.models.PostCategoryMap, as: 'postCategoryMap',
                  where: {
                    'postCategoryId': categoryIds
                  }
                },
                required: true
              }
            ]
          };
        },
        includeCover: function () {
          return {
            include: [
              {
                model: sequelize.models.PostImage, as: 'cover',
                attributes: ['id', 'key', 'extension', 'postId'],
                required: false,
                where: {
                  isCover: true,
                },
              }
            ]
          };
        },
        includeUser: function () {
          return {
            include: [
              {
                attributes: ['id', 'lastName', 'firstName', 'email', 'selfDescription'],
                model: sequelize.models.User, as: 'user',
                include: [
                  {
                    model: sequelize.models.Company, as: 'companies',
                    through: {
                      model: sequelize.models.UserCompany, as: 'UserCompanies',
                      where: {
                        status: 'pass',
                      }
                    },
                    required: false,
                  },
                  {
                    model: sequelize.models.UserPicture, as: 'icon',
                    required: false,
                    where: {
                      isIcon: true,
                    },
                  }
                ],
              }
            ]
          };
        },
        includeCoc: function () {
          return {
            include: [
              {
                model: sequelize.models.Coc, as: 'coc',
                attributes: ['id', 'industryId', 'name', 'scale', 'logo', 'coverImage'],
                include: [{
                  model: sequelize.models.Industry, as: 'industry',
                  attributes: ['id', 'name']
                }],
                required: true
              }
            ]
          }
        },
        includeCocWithSearch: function (str) {
          return {
            include: [
              {
                model: sequelize.models.Coc, as: 'coc',
                where: {
                  name: {
                    $iLike: `%${str}%`
                  }
                },
                required: true
              }
            ]
          }
        }
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
        return _.without(attributes, 'isApproved', 'view', 'userId', 'companyId', 'isFeatured');
      case 'enterprise':
        return _.without(attributes, 'isApproved', 'view', 'userId', 'companyId', 'isFeatured');
      case 'public':
        return ['view'];
      case 'admin':
        return attributes;
    }
  };
  Model.associate = function (models) {
    Model.belongsToMany(models.PostCategory, {
      foreignKey: 'postId',
      otherKey: 'postCategoryId',
      through: { model: models.PostCategoryMap, as: 'postCategoryMap' },
      as: 'categoriesSearch'
    });

    Model.belongsToMany(models.PostCategory, {
      foreignKey: 'postId',
      otherKey: 'postCategoryId',
      through: { model: models.PostCategoryMap, as: 'postCategoryMap' },
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

    Model.belongsToMany(models.Tag, {
      constraints: false,
      foreignKey: 'taggableId',
      otherKey: 'tagId',
      through: { model: models.Taggable, as: 'taggable' },
      as: 'tagsSearch'
    });

    Model.belongsToMany(models.Tag, {
      constraints: false,
      foreignKey: 'taggableId',
      otherKey: 'tagId',
      through: { model: models.Taggable, as: 'taggable' },
      as: 'tags'
    });

    Model.hasOne(models.PostImage, {
      targetKey: 'id',
      foreignKey: 'postId',
      onDelete: 'cascade',
      as: 'cover',
    });
  };
  // Instance Method
  Model.prototype.toJSON = function () {
    let res = this.dataValues;

    // hide field
    if (typeof res.categoriesSearch !== 'undefined') delete res.categoriesSearch;
    if (typeof res.tagsSearch !== 'undefined') delete res.tagsSearch;
    delete res.enterpriseId;
    delete res.cocId;
    delete res.updatedAt;

    return res;
  };
  return Model;
};

