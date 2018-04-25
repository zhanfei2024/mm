/**
 * 全局初始化, 设定各种环境变量
 *
 */
process.env.TZ = 'UTC';
// path setup
global.__base = __dirname + '/../src/';

// Config Init
let envPath = '';
if (process.env.NODE_ENV === 'production') {
  envPath = `.env`;
} else if (process.env.NODE_ENV === 'test') {
  envPath = `.env.test`;
} else {
  envPath = `.env.development`;
}

require('dotenv').config({
  path: envPath
});
