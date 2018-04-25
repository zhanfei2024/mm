module.exports = function (sequelize, DataTypes) {
  const Model = sequelize.define('Plan', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    displayName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      defaultValue: 0,
    },
    meta: {
      type: DataTypes.JSONB,
      allowNull: true,
      defaultValue: '{}',
    },
  }, {
    schema: 'public',
    charset: 'utf8',
    timestamps: true,
    indexes: [
      {fields: ['name']},
    ],
    freezeTableName: true,
    getterMethods: {},
    setterMethods: {},
  });

  Model.getAttributes = function () {
    return Object.keys(Model.rawAttributes);
  };

  Model.associate = function (models) {
  };

  Model.initSeed = function () {
    const data = [
      {
        name: 'free',
        displayName: 'FREE',
        description: 'FREE',
        active: true,
        meta: {},
      },
      {
        name: 'professional',
        displayName: 'PROFESSIONAL',
        description: '',
        meta: {},
      },
      {
        name: 'premium',
        displayName: 'PREMIUM',
        description: '',
        active: true,
        meta: {},
      },
    ];
    return Model.bulkCreate(data, {returning: true});
  };

  Model.prototype.toJSON = function () {
    const res = this.dataValues;

    // hide field

    return res;
  };
  return Model;
};
