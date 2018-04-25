'use strict';

module.exports = function (sequelize, DataTypes) {
  const Model = sequelize.define('Message', {
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
    userId: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contacts: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    leavingMessage: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    messageReply: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    leavingMessagedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  }, {
      schema: 'mm',
      charset: 'utf8',
      timestamps: true,
      freezeTableName: true,
      hooks: {},
      getterMethods: {},
      setterMethods: {},
      defaultScope: {},
      scopes: {
        includeCocs: function (search) {
          let include;
          if (search == null) {
            include = [{ model: sequelize.models.Coc, attributes: ['id', 'name'], as: 'coc', required: false, }];
          } else {
            include = [{
              model: sequelize.models.Coc, as: 'coc',
              attributes: ['id', 'name'],
              where: {
                name: {
                  $iLike: `%${search}%`
                }
              },
              required: true
            }];
          }
          return {
            include: include
          };
        },
        includeUser: function () {
          return {
            include: [
              {
                model: sequelize.models.User, as: 'user',
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

    Model.belongsTo(models.User, {
      targetKey: 'id',
      foreignKey: 'userId',
      onDelete: 'cascade',
      as: 'user'
    });
  };

  Model.prototype.toJSON = function () {
    const res = this.dataValues;

    // 隐藏字段
    delete res.createdAt;
    delete res.updatedAt;
    return res;
  };
  return Model;
};
