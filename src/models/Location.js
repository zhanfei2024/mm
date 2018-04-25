const _ = require('lodash');

module.exports = function (sequelize, DataTypes) {
  const Model = sequelize.define('Location', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    parentId: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    depth: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    order: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    schema: 'public',
    charset: 'utf8',
    timestamps: false,
    freezeTableName: true,
    getterMethods: {},
    setterMethods: {},
    defaultScope: {},
    scopes: {
      includeLocation: function () {
        return {
          include: [{
            model: sequelize.models.Location, as: 'locations',
          }]
        }
      }
    }
  });

  // Class Method
  Model.getEditableKeys = function () {
    return ['parentId', 'depth', 'name'];
  };
  Model.associate = function (models) {
    Model.hasMany(models.Location, {
      foreignKey: 'parentId',
      as: 'locations',
    });
  };

  // Instance Method
  Model.prototype.toJSON = function () {
    let res = this.dataValues;

    // 隐藏字段
    delete res.parentId;
    delete res.depth;
    delete res.order;

    return res;
  };
  return Model;
};
