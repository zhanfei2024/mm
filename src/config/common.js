let Config = module.exports = {};

// Config.baseUrl = 'https://hr.worktask.io';
Config.baseUrl = `${process.env.BASEURL || 'http://localhost:4200'}`;
Config.sourceUrl = process.env.SOURCEURL || 'http://localhost:3000';
Config.apiPath = '/api/v1';


// encrypt/decrypt
Config.algorithm = 'aes-256-ctr';
Config.token = 'ZR2sXH9U8Y4J2zql6f2%h8w802BXp(';

// system
Config.systemName = 'YOOV MM';
Config.systemEmail = 'no-reply@connecteye.com';
Config.systemTeamName = 'YOOV TEAM';
Config.siteSupportEmail = 'support@yoov.com';
Config.siteTitle = 'YOOV MM';

// picture
Config.default_picture = 'https://placehold.it/128x128/eeeeee/000000?text=not+found';


