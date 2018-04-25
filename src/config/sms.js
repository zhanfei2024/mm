const Config = {
  qq: {
    appId: process.env.SMS_QQ_APPID || 'SMS_QQ_APPID',
    url: 'https://yun.tim.qq.com/v5/tlssmssvr/sendsms',
    key: process.env.SMS_QQ_KEY || 'SMS_QQ_KEY',
  },
  yunpian: {
    url: 'https://sms.yunpian.com/v2/sms/single_send.json',
    key: process.env.SMS_YP_KEY || 'SMS_YP_KEY',
  },
};

module.exports = Config;
