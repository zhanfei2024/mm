module.exports = function (sequelize, DataTypes) {
  const Model = sequelize.define('Notification', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: sequelize.UUIDV4,
      primaryKey: true,
    },
    teamId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    notifiableType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    notifiableId: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    // approveLeave, getAnnouncement, approveExpense
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    data: {
      type: DataTypes.JSONB,
      allowNull: false,
      defaultValue: '{}',
    },
    readAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
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

  };

  Model.prototype.toJSON = function () {
    const res = this.dataValues;

    // hide field
    delete res.teamId;
    delete res.createdAt;
    delete res.updatedAt;
    return res;
  };
  return Model;
};
