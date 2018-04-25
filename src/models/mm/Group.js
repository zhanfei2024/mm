module.exports = function (sequelize, DataTypes) {
  const Model = sequelize.define('Group', {
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
    parentId: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    balance: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    timeSpan: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 12
    },
    isForever: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    order: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
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
    scopes: {},
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

    Model.belongsTo(models.Group, {
      targetKey: 'id',
      foreignKey: 'parentId',
      onDelete: 'cascade',
      as: 'parent',
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
