'use strict';
const _ = require('lodash');
const commonConfig = require('../../config/common');
const jobs = require('../../jobs');
const Storage = require('../../modules/storage');

module.exports = function (sequelize, DataTypes) {
  const Model = sequelize.define('SlideShow', {
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
    type: {
      type: DataTypes.ENUM('platform', 'coc'),
      allowNull: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: true
    },
    url: {
      type: DataTypes.STRING,
      allowNull: true
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    path: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    size: {
      type: DataTypes.BIGINT,
      allowNull: true,
      defaultValue: 0,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    key: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    extension: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    mime: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    order: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    }
  }, {
    schema: 'mm',
    charset: 'utf8',
    timestamps: true,
    freezeTableName: true,
    hooks: {
      beforeDestroy: async (instance) => {
        await Storage.disk('local').delete(instance.path);
      }
    },
    getterMethods: {},
    setterMethods: {},
    scopes: {
      // 默认附带商会信息,如果传入字符串,搜索商会名称
      includeCoc: function (search) {
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
              required: required
            }
          ]
        }
      },
      searchTitle: function (search) {
        return {
          where: {
            title: {
              $iLike: `%${search}%`
            }
          }
        }
      }
    }
  });
  // Class Method
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
  };

  // Instance Method
  Model.prototype.toJSON = function () {
    const res = this.dataValues;

    if (!!res.path) {
      const avatar = `${commonConfig.sourceUrl}${_.replace(res.path, '/uploads', '')}`;
      this.setDataValue('slideShowUrl', avatar);
    }
    // hidden field

    return res;
  };
  return Model;
};


