module.exports = function (sequelize, DataTypes) {
  const Model = sequelize.define('Tag', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    suggest: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    count: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  }, {
    schema: 'mm',
    charset: 'utf8',
    timestamps: false,
    freezeTableName: true,
    hooks: {},
    getterMethods: {},
    setterMethods: {},
  });

  Model.getAttributes = function () {
    return Object.keys(Model.rawAttributes);
  };

  Model.associate = function (models) {
    Model.hasMany(models.Taggable, {
      targetKey: 'id',
      foreignKey: 'tagId',
      onDelete: 'cascade',
      as: 'taggables',
    });
  };

  Model.prototype.toJSON = function () {
    const res = this.dataValues;

    return res;
  };
  return Model;
};
