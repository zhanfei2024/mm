const express = require('express');

// library
const debug = require('debug')('APP:MAIN');
const _ = require('lodash');
const i18n = require('i18n');
const path = require('path');
const favicon = require('serve-favicon');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mime = require('mime');

const app = express();

/**
 * VIEW init
 */
const handlebarsLayouts = require('handlebars-layouts');
const hbs = require('hbs');

hbs.registerPartials(`${__dirname}/views`);
hbs.registerHelper(handlebarsLayouts(hbs.handlebars));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, '../uploads')));

/**
 * Passport Init (Auth Login System)
 */
const passport = require('passport');
const userAuthRoute = require('./routes/user/auth');
const enterpriseAuthRoute = require('./routes/enterprise/auth');
const adminAuthRoute = require('./routes/admin/auth');
const fileRoute = require('./routes/mm/fromS3GetFile');

app.use(passport.initialize());
passport.use('user-jwt', userAuthRoute.passportJwtStrategy());
passport.use('user-jwt-allow-expired', userAuthRoute.passportJwtStrategy({ignoreExpiration: true}));

passport.use('enterprise-jwt', enterpriseAuthRoute.passportJwtStrategy());
passport.use('enterprise-jwt-allow-expired', enterpriseAuthRoute.passportJwtStrategy({ignoreExpiration: true}));

passport.use('admin-jwt', adminAuthRoute.passportJwtStrategy());
passport.use('admin-jwt-allow-expired', adminAuthRoute.passportJwtStrategy({ignoreExpiration: true}));

passport.use('file-jwt', fileRoute.passportJwtStrategy());

/**
 * Logger Init
 */
const logger = require('./modules/logger');
app.use(require('morgan')('combined', {stream: logger.stream}));

/**
 * i18n Init
 */
const glob = require('glob');
const fs = require('fs');
const i18nLocales = ['en-us', 'zh-hk', 'zh-cn'];
_.each(i18nLocales, locale => {
  let language = require(`${__dirname}/langs/sources/${locale}.js`);
  const files = glob.sync(`${__dirname}/langs/sources/**/${locale}/*.js`, {});
  _.each(files, file => {
    language = _.extend(language, require(file));
  });
  fs.writeFileSync(`${__dirname}/langs/production/${locale}.json`, JSON.stringify(language));
});
i18n.configure({
  queryParameter: 'lang',
  defaultLocale: i18nLocales[0],
  locales: i18nLocales,
  directory: `${__dirname}/langs/production`,
  extension: '.json',
  updateFiles: false,
  objectNotation: true,
  autoReload: true,
});
app.use(i18n.init);


/**
 * MainError init
 */
global.MainError = function (fileName, value) {
  this.fileName = this.name = fileName;
  this.fileNameKey = value || '';
  return this;
};
global.MainError.prototype = new Error();

/**
 * Helmet Module
 */
const helmet = require('helmet');

app.use(helmet());

/**
 * Presenter Middleware
 */
const presenter = require('./modules/presenter')({
  errorDir: `${__dirname}/langs/production/`,
});
app.use(presenter);

/**
 * CORS MIDDLEWARE
 */
const corsOptions = {
  origin: true,
  credentials: true,
};
app.use(require('cors')(corsOptions));

/**
 * Mulipart data body handler
 */
app.multipartForm = require('multer')({
  dest: './.tmp/',
  limits: {
    fieldNameSize: 100,
    fileSize: 1024 * 1024 * 1024,
    fields: 100,
  },
  fileFilter(req, file, cb) {
    const extensions = 'ics,pdf,doc,docx,xls,xlsx,csv,txt,rtf,html,zip,mp3,wma,mpg,flv,avi,jpg,jpeg,png,gif'.split(',');

    if (extensions.indexOf(path.extname(file.originalname).substring(1).toLowerCase()) === -1) {
      return cb(new MainError('file', 'unsupportedFormat'));
    }
    return cb(null, true);
  },
});

app.use(app.multipartForm.fields([{
  name: 'file',
  maxCount: 10,
}]));
app.use(require('multer-autoreap'));

/**
 *  Validation Init
 */
const inputCheck = require('input-check');
const validateHelper = require('./helpers/ValidateHelper');
_.each(validateHelper.extend, (val, key) => {
  inputCheck.extend(key, val, '{{field}} is invalid.');
});
app.use((req, res, next) => {
  res.validatorMessage = req.__('validation');
  res.paginatorHelper = validateHelper.paginatorHelper;

  req.body = validateHelper.transform.trim(req.body);
  req.body = validateHelper.transform.emptyStringToNull(req.body);

  req.query = validateHelper.transform.trim(req.query);
  req.query = validateHelper.transform.emptyStringToNull(req.query);

  next();
});

/**
 *  Global variable
 */
app.use((req, res, next) => {
  res.locals = _.extend({}, res.locals, {
    authProvider: {},
    jwt: {},
    adminAuth: {},
    userAuth: {},
    companyIds: [],
    team: {},
    companyRole: [],
    setting: {},
    employeeAuth: {},
    defaultApprovers: {},

    fileCount: 10, // 最高上传数目
    fileSize: 10485760, // 单一文件最大尺寸
  });
  next();
});

/**
 *  Route
 */
require('./route')(app);

/**
 *  Api doc
 */
if (process.env.NODE_ENV !== 'production') app.use('/apidoc', express.static(__dirname + '/public/apidoc'));

/**
 *  Frontend Route
 */
if (app.get('env') !== 'test' && app.get('env') !== 'development') {
  const prerender = require('prerender');
  const prerenderPort = 9999 + parseInt(process.env.pm_id, 10);
  const server = prerender({
    port: prerenderPort
  });
  server.start();

  app.use(require('prerender-node').set('prerenderServiceUrl', `http://connected.hk:${prerenderPort}`));
  // if (app.get('env') === 'production') app.use(require('prerender-node').set('protocol', 'https'));
  if (app.get('env') === 'production') app.use(require('prerender-node').set('protocol', 'http'));
}

/**
 * 访问前台页面
 */
app.use('/', express.static(`${__dirname}/client/frontend/web`));
app.use(express.static(`${__dirname}/client/frontend/web`, {
  setHeaders(res, path) {
    if (mime.lookup(path) === 'text/html') {
      res.setHeader('Cache-Control', 'public, max-age=0');
    } else {
      res.setHeader('Cache-Control', 'public, max-age=2592000');
    }
  },
}));
app.get('/', (req, res) => {
  res.set('Content-Type', 'text/html').sendFile(`${__dirname}/client/frontend/web/index.html`);
});

/**
 * 访问后台页面
 */
app.use('/admin', express.static(`${__dirname}/client/backend/web`));
app.use(express.static(`${__dirname}/client/backend/web`, {
  setHeaders(res, path) {
    if (mime.lookup(path) === 'text/html') {
      res.setHeader('Cache-Control', 'public, max-age=0');
    } else {
      res.setHeader('Cache-Control', 'public, max-age=2592000');
    }
  },
}));
app.get('/admin', (req, res) => {
  res.set('Content-Type', 'text/html').sendFile(`${__dirname}/client/backend/web/index.html`);
});


// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development' || app.get('env') === 'test') {
  app.use((err, req, res, next) => {
    debug('ERROR: %j', err);
    if (err instanceof MainError) {
      return res.error(err.fileName, err.fileNameKey);
    }
    return res.customError(err.message);
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
  debug('ERROR: %j', err);
  if (err instanceof MainError) {
    return res.error(err.fileName, err.fileNameKey);
  }
  return res.customError(err.message);
});

module.exports = app;
