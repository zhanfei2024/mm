module.exports = function (sequelize, DataTypes) {
  const Model = sequelize.define('Language', {
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
    languageCode: {
      type: DataTypes.STRING(5),
      allowNull: false,
      unique: true,
    },
    default: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  }, {
    schema: 'public',
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

  };
  Model.initSeed = function () {
    const languages = [
      { name: 'English', languageCode: 'en-us', default: true },
      { name: '繁體中文', languageCode: 'zh-hk', default: false },
      { name: '簡體中文', languageCode: 'zh-cn', default: false },
    ];
    return Model.bulkCreate(languages);
  };

  Model.prototype.toJSON = function () {
    const res = this.dataValues;

    // hide field

    return res;
  };

  return Model;
};
