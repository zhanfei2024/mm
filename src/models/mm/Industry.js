'use strict';

const _ = require('lodash');

module.exports = function (sequelize, DataTypes) {
  const Model = sequelize.define('Industry', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    parentId: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    depth: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    order: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    schema: 'mm',
    charset: 'utf8',
    timestamps: true,
    freezeTableName: true,
    getterMethods: {},
    setterMethods: {}
  });

  // Class Method
  Model.getAttributes = function () {
    return Object.keys(_.omit(Model.rawAttributes, ['depth']));
  };
  Model.associate = function (models) {

  };

  Model.initSeed = function () {
    const data = [
      { parentId: null, name: '會計服務', depth: 1, order: 1, description: '會計服務' },
      { parentId: null, name: '廣告服務', depth: 1, order: 2, description: '廣告服務' },
      { parentId: null, name: '建築及規劃', depth: 1, order: 3, description: '建築及規劃' },
      { parentId: null, name: '商會服務及政府機構', depth: 1, order: 4, description: '商會服務及政府機構' },
      { parentId: null, name: '汽車及零部件', depth: 1, order: 5, description: '汽車及零部件' },
      { parentId: null, name: '嬰兒產品', depth: 1, order: 6, description: '嬰兒產品' },
      { parentId: null, name: '銀行服務', depth: 1, order: 7, description: '銀行服務' },
      { parentId: null, name: '書刊及印刷品', depth: 1, order: 8, description: '書刊及印刷品' },
      { parentId: null, name: '建造服務', depth: 1, order: 9, description: '建造服務' },
      { parentId: null, name: '建築材料、五金及機械', depth: 1, order: 10, description: '建築材料、五金及機械' },
      { parentId: null, name: '商業管理及顧問服務', depth: 1, order: 11, description: '商業管理及顧問服務' },
      { parentId: null, name: '化學品及原材料', depth: 1, order: 12, description: '化學品及原材料' },
      { parentId: null, name: '設計服務', depth: 1, order: 13, description: '設計服務' },
      { parentId: null, name: '教育及培訓', depth: 1, order: 14, description: '教育及培訓' },
      { parentId: null, name: '電子產品及電器', depth: 1, order: 15, description: '電子產品及電器' },
      { parentId: null, name: '工程服務', depth: 1, order: 16, description: '工程服務' },
      { parentId: null, name: '環保用品', depth: 1, order: 17, description: '環保用品' },
      { parentId: null, name: '環保服務', depth: 1, order: 18, description: '環保服務' },
      { parentId: null, name: '電影/影音制作', depth: 1, order: 19, description: '電影/影音制作' },
      { parentId: null, name: '金融及投資', depth: 1, order: 20, description: '金融及投資' },
      { parentId: null, name: '食品及飲料', depth: 1, order: 21, description: '食品及飲料' },
      { parentId: null, name: '鞋類', depth: 1, order: 22, description: '鞋類' },
      { parentId: null, name: '家具及布置用品', depth: 1, order: 23, description: '家具及布置用品' },
      { parentId: null, name: '成衣、紡織及配件', depth: 1, order: 24, description: '成衣、紡織及配件' },
      { parentId: null, name: '手袋及旅行用品', depth: 1, order: 25, description: '手袋及旅行用品' },
      { parentId: null, name: '家庭用品', depth: 1, order: 26, description: '家庭用品' },
      { parentId: null, name: '資訊科技服務', depth: 1, order: 27, description: '資訊科技服務' },
      { parentId: null, name: '保險', depth: 1, order: 28, description: '保險' },
      { parentId: null, name: '室內設計服務', depth: 1, order: 29, description: '室內設計服務' },
      { parentId: null, name: '珠寶', depth: 1, order: 30, description: '珠寶' },
      { parentId: null, name: '法律服務', depth: 1, order: 31, description: '法律服務' },
      { parentId: null, name: '物流管理及運輸服務', depth: 1, order: 32, description: '物流管理及運輸服務' },
      { parentId: null, name: '醫療及保健服務', depth: 1, order: 33, description: '醫療及保健服務' },
      { parentId: null, name: '醫療用品及醫藥', depth: 1, order: 34, description: '醫療用品及醫藥' },
      { parentId: null, name: '包裝材料', depth: 1, order: 35, description: '包裝材料' },
      { parentId: null, name: '攝影器材', depth: 1, order: 36, description: '攝影器材' },
      { parentId: null, name: '印刷及出版服務', depth: 1, order: 37, description: '印刷及出版服務' },
      { parentId: null, name: '公共關系', depth: 1, order: 38, description: '公共關系' },
      { parentId: null, name: '品質檢查及測試', depth: 1, order: 39, description: '品質檢查及測試' },
      { parentId: null, name: '房地產服務', depth: 1, order: 40, description: '房地產服務' },
      { parentId: null, name: '文具及辦公室設備', depth: 1, order: 41, description: '文具及辦公室設備' },
      { parentId: null, name: '科技', depth: 1, order: 42, description: '科技' },
      { parentId: null, name: '電訊', depth: 1, order: 43, description: '電訊' },
      { parentId: null, name: '旅遊', depth: 1, order: 44, description: '旅遊' },
      { parentId: null, name: '玩具及遊戲', depth: 1, order: 45, description: '玩具及遊戲' },
      { parentId: null, name: '鐘表', depth: 1, order: 46, description: '鐘表' },
  ];
    return Model.bulkCreate(data);
  };


  // Instance Method
  Model.prototype.toJSON = function () {
    const res = this.dataValues;

    // hidden field
    delete res.depth;
    delete res.createdAt;

    return res;
  };
  return Model;
};

