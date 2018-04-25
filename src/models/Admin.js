// library
const bcrypt = require('bcryptjs');

module.exports = function (sequelize, DataTypes) {
  const Model = sequelize.define('Admin', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    verifiedEmail: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    emailToken: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    emailTokenUpdatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    gender: {
      type: DataTypes.ENUM('M', 'F'),
      allowNull: false,
      defaultValue: 'M',
    },
    birth: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    timezone: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '+00:00',
    },
    credit: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      defaultValue: 0,
    },
    remark: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  }, {
    schema: 'public',
    charset: 'utf8',
    timestamps: true,
    freezeTableName: true,
    indexes: [
      { fields: ['email'] },
      { fields: ['emailToken'] },
    ],
    getterMethods: {
      fullName() {
        return `${this.firstName} ${this.lastName}`;
      },
    },
    hooks: {
      beforeCreate(instance, options) {
        instance.password = bcrypt.hashSync(instance.password, 10);
      },
      beforeUpdate(instance, options) {
        if (options.fields.includes('password')) instance.password = bcrypt.hashSync(instance.password, 10);
      },
    },
    setterMethods: {},
    scopes: {
      includeAdminSession() {
        return {
          include: {
            model: sequelize.models.AdminSession, as: 'adminSessions'
          }
        }
      }
    },
  });

  Model.getAttributes = function () {
    return Object.keys(Model.rawAttributes);
  };

  Model.associate = function (models) {
    Model.belongsTo(models.Country, {
      targetKey: 'id',
      foreignKey: 'countryId',
      onDelete: 'restrict',
      as: 'country',
    });

    Model.hasMany(models.AdminSession, {
      targetKey: 'id',
      foreignKey: 'adminId',
      onDelete: 'cascade',
      as: 'adminSessions'
    });
  };

  Model.prototype.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
  };

  Model.initSeed = function () {
    const admins = [
      {email: 'admin@yoov.com', firstName: 'admin', lastName: 'admin', password: '$2a$10$uEJbs9JIHY1/ml0Xal/cpOTKvevc4x68VCnLMni/4.TMSdW.4b8Me', active: true}
    ];
    return Model.bulkCreate(admins, {returning: true});
  };

  Model.prototype.toJSON = function () {
    const res = this.dataValues;

    // hide field
    delete res.emailToken;
    delete res.emailTokenUpdatedAt;
    delete res.password;

    return res;
  };
  return Model;
};
