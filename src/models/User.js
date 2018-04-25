// library
const bcrypt = require('bcryptjs');

module.exports = function (sequelize, DataTypes) {
  const Model = sequelize.define('User', {
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
      unique: true,
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
    languageId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: 1,
    },
    emailTokenUpdatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    timezone: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '+00:00',
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
      {fields: ['email']},
      {fields: ['emailToken']},
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
      includeUserSession() {
        return {
          include: {
            model: sequelize.models.UserSession, as: 'userSessions'
          }
        }
      },
      includeLanguage() {
        return {
          include: {
            model: sequelize.models.Language, as: 'language'
          }
        }
      },
      includeCountry() {
        return {
          include: {
            model: sequelize.models.Country, as: 'country'
          }
        }
      },
      includeUserProfile() {
        return {
          include: {
            model: sequelize.models.UserProfile, as: 'userProfile'
          }
        }
      },
      includeUserExperience() {
        return {
          include: {
            model: sequelize.models.UserExperience, as: 'userExperience'
          }
        }
      },
      includeUserCompany() {
        return {
          include: {
            model: sequelize.models.UserCompany, as: 'userCompany'
          }
        }
      },
      includeUserEducation() {
        return {
          include: {
            model: sequelize.models.UserEducation, as: 'userEducation'
          }
        }
      },

    },
  });

  Model.getAttributes = function () {
    return Object.keys(Model.rawAttributes);
  };

  Model.associate = function (models) {
    Model.belongsTo(models.Language, {
      targetKey: 'id',
      foreignKey: 'languageId',
      onDelete: 'restrict',
      as: 'language',
    });

    Model.belongsTo(models.Country, {
      targetKey: 'id',
      foreignKey: 'countryId',
      onDelete: 'restrict',
      as: 'country',
    });

    Model.hasMany(models.AuthenticationProvider, {
      targetKey: 'id',
      foreignKey: 'userId',
      onDelete: 'cascade',
      as: 'providers',
    });

    Model.hasMany(models.UserSession, {
      targetKey: 'id',
      foreignKey: 'userId',
      onDelete: 'cascade',
      as: 'userSessions'
    });

    Model.hasOne(models.UserProfile, {
      targetKey: 'id',
      foreignKey: 'userId',
      onDelete: 'cascade',
      as: 'userProfile'
    });

    Model.hasMany(models.UserExperience, {
      targetKey:'id',
      foreignKey:'userId',
      onDelete:'cascade',
      as:'userExperience'
    });

    Model.hasMany(models.UserCompany, {
      targetKey:'id',
      foreignKey:'userId',
      onDelete:'cascade',
      as:'userCompany'
    });

    Model.hasMany(models.UserEducation, {
      targetKey: 'id',
      foreignKey: 'userId',
      onDelete: 'cascade',
      as: 'userEducation'
    });
  };

  Model.prototype.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
  };

  Model.prototype.toJSON = function () {
    const res = this.dataValues;

    // hide field
    delete res.emailTokenUpdatedAt;
    delete res.password;
    delete res.updatedAt;

    return res;
  };
  return Model;
};
