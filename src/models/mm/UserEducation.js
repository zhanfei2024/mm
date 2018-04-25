'use strict';


module.exports = function (sequelize, DataTypes) {
  const Model = sequelize.define('UserEducation', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    userId: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    educationLevel: {
      type: DataTypes.ENUM('any', 'master', 'post-graduate', 'degree', 'college', 'school-certificate', 'doctor'),
      allowNull: false,
      defaultValue: 'any'
    },
    schoolName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    subject: {
      type: DataTypes.STRING,
      allowNull: false
    },
    gpa: {
      type: DataTypes.DECIMAL(10, 1),
      allowNull: true,
    },
    graduationYear: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    remark: {
      type: DataTypes.TEXT,
      allowNull: true
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
      includeUser: function () {
        return {
          include: [
            {
              model: sequelize.models.User, as: 'user',
            }
          ]
        };
      },
    },
  });

  // Class Method
  Model.getEditableKeys = function () {
    return Object.keys(Model.rawAttributes);
  };
  Model.associate = function (models) {
    Model.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'cascade',
      as: 'user'
    });
  };

  // Instance Method
  Model.prototype.toJSON = function () {
    return this.dataValues;
  };
  return Model;
};
