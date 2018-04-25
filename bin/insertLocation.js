#!/usr/bin/env node

// ***************************************
// CORE INIT BEGIN
// ***************************************
// path setup
global.__base = __dirname + '/../';

// Config Init
let envPath = '.env';
if (process.env.NODE_ENV !== 'production')
  envPath = `.env.${process.env.NODE_ENV || 'development'}`;

require('dotenv').config({
  path: envPath
});

// ***************************************
// CORE INIT END
// ***************************************


const debug = require('debug')('api-js:server');
const _ = require('lodash');

const models = require('../src/models');

module.exports = async function () {
  debug('START import Data!');
  try {
    let allPromise = [];

    let location = [
      {
        name: '香港', depth: 1, order: 1,
        children: [
          {name: '金鐘', depth: 2, order: 2},
          {name: '中環', depth: 2, order: 3},
          {name: '上環', depth: 2, order: 4},
          {name: '西環', depth: 2, order: 5},
          {name: '太平山', depth: 2, order: 6},
          {name: '薄扶林', depth: 2, order: 7},
          {name: '灣仔', depth: 2, order: 8},
          {name: '銅鑼灣', depth: 2, order: 9},
          {name: '跑馬地', depth: 2, order: 10},
          {name: '大坑', depth: 2, order: 11},
          {name: '天后', depth: 2, order: 12},
          {name: '炮台山', depth: 2, order: 13},
          {name: '北角', depth: 2, order: 14},
          {name: '鰂魚涌', depth: 2, order: 15},
          {name: '太古', depth: 2, order: 16},
          {name: '筲箕灣', depth: 2, order: 17},
          {name: '西灣河', depth: 2, order: 18},
          {name: '柴灣', depth: 2, order: 19},
          {name: '杏花村', depth: 2, order: 20},
          {name: '小西灣', depth: 2, order: 21},
          {name: '香港仔', depth: 2, order: 22},
          {name: '鴨脷洲', depth: 2, order: 23},
          {name: '黃竹坑', depth: 2, order: 24},
          {name: '深水灣', depth: 2, order: 25},
          {name: '淺水灣', depth: 2, order: 26},
          {name: '赤柱', depth: 2, order: 27},
          {name: '大潭', depth: 2, order: 28},
          {name: '石澳', depth: 2, order: 29},
        ]
      },
      {
        name: '九龍', depth: 1, order: 30,
        children: [
          {name: '九龍城', depth: 2, order: 31},
          {name: '九龍塘', depth: 2, order: 32},
          {name: '何文田', depth: 2, order: 33},
          {name: '土瓜灣', depth: 2, order: 34},
          {name: '馬頭圍', depth: 2, order: 35},
          {name: '紅磡', depth: 2, order: 36},
          {name: '啟德', depth: 2, order: 37},
          {name: '觀塘', depth: 2, order: 38},
          {name: '牛頭角', depth: 2, order: 39},
          {name: '九龍灣', depth: 2, order: 40},
          {name: '秀茂坪', depth: 2, order: 41},
          {name: '藍田', depth: 2, order: 42},
          {name: '茶果嶺', depth: 2, order: 43},
          {name: '油塘', depth: 2, order: 44},
          {name: '深水埗', depth: 2, order: 45},
          {name: '長沙灣', depth: 2, order: 46},
          {name: '荔枝角', depth: 2, order: 47},
          {name: '石硤尾', depth: 2, order: 48},
          {name: '黃大仙', depth: 2, order: 49},
          {name: '鑽石山', depth: 2, order: 50},
          {name: '慈雲山', depth: 2, order: 51},
          {name: '樂富', depth: 2, order: 52},
          {name: '新蒲崗', depth: 2, order: 53},
          {name: '油麻地', depth: 2, order: 54},
          {name: '尖沙咀', depth: 2, order: 55},
          {name: '旺角', depth: 2, order: 56},
          {name: '太子', depth: 2, order: 57},
          {name: '佐敦', depth: 2, order: 58},
          {name: '大角咀', depth: 2, order: 59},
        ]
      },
      {
        name: '新界', depth: 1, order: 60,
        children: [
          {name: '上水', depth: 2, order: 61},
          {name: '粉嶺', depth: 2, order: 62},
          {name: '聯和墟', depth: 2, order: 63},
          {name: '沙頭角', depth: 2, order: 64},
          {name: '打鼓嶺', depth: 2, order: 65},
          {name: '大埔墟', depth: 2, order: 66},
          {name: '西貢', depth: 2, order: 67},
          {name: '塔門', depth: 2, order: 68},
          {name: '大圍', depth: 2, order: 69},
          {name: '火炭', depth: 2, order: 70},
          {name: '石門', depth: 2, order: 71},
          {name: '馬鞍山', depth: 2, order: 72},
          {name: '將軍澳', depth: 2, order: 73},
          {name: '坑口', depth: 2, order: 74},
          {name: '調景嶺', depth: 2, order: 75},
          {name: '清水灣', depth: 2, order: 76},
          {name: '元朗', depth: 2, order: 77},
          {name: '天水圍', depth: 2, order: 78},
          {name: '落馬洲', depth: 2, order: 79},
          {name: '屯門', depth: 2, order: 80},
          {name: '葵涌', depth: 2, order: 81},
          {name: '青衣', depth: 2, order: 82},
          {name: '荃灣', depth: 2, order: 83},
          {name: '深井', depth: 2, order: 84},
          {name: '沙田', depth: 2, order: 85},
          {name: '太和', depth: 2, order: 86},
        ]
      },
      {
        name: '離島', depth: 1, order: 87,
        children: [
          {name: '大嶼山', depth: 2, order: 88},
          {name: '長洲', depth: 2, order: 89},
          {name: '喜靈洲', depth: 2, order: 90},
          {name: '南丫島', depth: 2, order: 91},
          {name: '坪洲', depth: 2, order: 92},
          {name: '梅窩', depth: 2, order: 93},
          {name: '東涌', depth: 2, order: 94},
          {name: '赤鱲角', depth: 2, order: 95},
          {name: '大澳', depth: 2, order: 96},
        ]
      },
    ];
    allPromise.push(importLocation(location, null));

    await Promise.all(allPromise);
    debug(`Imported location data!`);
    return;
  } catch (err) {
    console.log(err);
    debug(`VALUE ERROR: %j`, err);
  }

  process.exit();
};

function importLocation(data, parentId) {
  let promise = [];
  _.each(data, function (val) {
    if (parentId !== null) val.parentId = parentId;
    try {
      promise.push(
        new Promise(function (resolve, reject) {
          models.Location.create(_.omit(val, 'children')).then(function (result) {
            if (!_.isUndefined(val.children)) {
              if (val.children.length > 0) {
                return importLocation(val.children, result.id).then(function () {
                  resolve();
                });
              }
            } else {
              resolve();
            }

          });
        })
      );
    } catch (err) {
      console.log(err);
      debug(`ERROR from importLocation: %j`, err);
    }
  });
  return Promise.all(promise);
}
