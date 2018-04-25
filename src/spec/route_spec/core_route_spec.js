global.__base = `${__dirname}/../../`;

// core
const debug = require('debug')('APP:TEST');
const co = require('co');
const http = require('http');

// library
const _ = require('lodash');
const models = require(`${__base}models`);

// test lib
const request = require('superagent');
const chai = require('chai');
const chaiSubset = require('chai-subset');
chai.use(chaiSubset);
const expect = chai.expect;

// s3 lib
const S3rver = require('s3rver');
const AWS = require('aws-sdk');
const async = require('async');
const fs = require('fs-extra');
const util = require('util');

// helper
const commonHelper = require('../helpers/common_helper');
const modelHelper = require('../helpers/model_helper');

const app = http.createServer(require(`${__base}app`));
let s3FakeClient;

const EmployeeModel = require('../helpers/hr/employeeModel');
const UserModel = require('../helpers/hr/userModel');
const OwnerModel = require('../helpers/hr/OwnerModel');

global.data = {
  adminAuth: {},
  adminAuthToken: {},

  countries: [],
  languages: [],
  educationLevels: [],
  team1: {
    team: {},
    ownerAuth: {},
    ownerAuthToken: '',
    ownerEmployeeAuth: {},
    userAuth: {},
    userAuthToken: '',
    userEmployeeAuth: {},

    user2Auth: {},
    user2AuthToken: '',
    userEmployee2Auth: {},
  },
};

// ==========================
// init database
// ==========================
before(async () => {
  app.listen(7777);
  try {
    await models.sequelize.query('CREATE SCHEMA IF NOT EXISTS mm;', {});
    await models.sequelize.sync({ force: 1 });
    const result = await Promise.all([
      models.Language.initSeed(),
      models.Country.initSeed(),
      models.Currency.initSeed(),
      models.Plan.initSeed(),
      models.Permission.initSeed(),
    ]);
    global.data.plans = result[6];
  } catch (err) {
    debug('init database failed!', err);
  }

  // ==================================================

  global.data.team1.ownerAuth = new UserModel();
  await global.data.team1.ownerAuth.createUser(modelHelper.faker.register());
  global.data.team1.ownerAuthToken = global.data.team1.ownerAuth.userAuthToken;
  await global.data.team1.ownerAuth.createTeam(modelHelper.faker.team());


  global.data.team1.team = global.data.team1.ownerAuth.teams[0];

  global.data.team1.teamModel = (global.data.team1.ownerAuth.teamMode(0)).ownerModel;
  global.data.team1.ownerUserModel = (global.data.team1.ownerAuth.teamMode(0)).employeeModel;
  global.data.team1.ownerEmployeeAuth = (await global.data.team1.ownerUserModel.self()).result;


  // ==================================================
  // 建立员工一

  // 建立 EMPLOYEE
  global.data.team1.userEmployeeAuth = (await global.data.team1.ownerAuth.teamMode(0).ownerModel.createEmployee(modelHelper.faker.employee())).result;
  let userData = modelHelper.faker.register();

  // 建立 USER
  global.data.team1.userAuth = new UserModel();
  await global.data.team1.userAuth.createUser(userData);
  global.data.team1.userAuthToken = global.data.team1.userAuth.userAuthToken;

  // 邀请加入及接受
  await global.data.team1.ownerAuth.teamMode(0).ownerModel.invitationTeam({
    employeeId: global.data.team1.userEmployeeAuth.id,
    email: userData.email
  });
  await global.data.team1.userAuth.acceptTeam({
    employeeId: global.data.team1.userEmployeeAuth.id,
    teamId: global.data.team1.ownerAuth.teams[0].id
  });
  global.data.team1.userEmployeeAuth = (await global.data.team1.userAuth.teamMode(0).employeeModel.self()).result;
  global.data.team1.userUserModel = (global.data.team1.userAuth.teamMode(0)).employeeModel;


  // ==================================================
  // 建立员工二

  // 建立 EMPLOYEE
  global.data.team1.userEmployee2Auth = (await global.data.team1.ownerAuth.teamMode(0).ownerModel.createEmployee(modelHelper.faker.employee())).result;
  userData = modelHelper.faker.register();

  // 建立 USER
  global.data.team1.user2Auth = new UserModel();
  await global.data.team1.user2Auth.createUser(userData);
  global.data.team1.user2AuthToken = global.data.team1.user2Auth.userAuthToken;


  // 邀请加入及接受
  await global.data.team1.ownerAuth.teamMode(0).ownerModel.invitationTeam({
    employeeId: global.data.team1.userEmployee2Auth.id,
    email: userData.email
  });
  await global.data.team1.user2Auth.acceptTeam({
    employeeId: global.data.team1.userEmployee2Auth.id,
    teamId: global.data.team1.ownerAuth.teams[0].id
  });
  global.data.team1.userEmployee2Auth = (await global.data.team1.user2Auth.teamMode(0).employeeModel.self()).result;
  global.data.team1.userUser2Model = (global.data.team1.user2Auth.teamMode(0)).employeeModel;


});

// ==========================
// create fake s3 server
// ==========================
before((done) => {
  const buckets = ['worktask'];
  s3FakeClient = new S3rver({
    port: 54320,
    hostname: 'localhost',
    silent: false,
    directory: '/tmp/s3rver_test_directory',
  }).run((err, hostname, port, directory) => {
    if (err) {
      return done(err);
    }
    const config = {
      accessKeyId: '123',
      secretAccessKey: 'abc',
      endpoint: util.format('%s:%d', hostname, port),
      sslEnabled: false,
      s3ForcePathStyle: true,
    };
    AWS.config.update(config);
    const s3Client = new AWS.S3();
    s3Client.endpoint = new AWS.Endpoint(config.endpoint);
    /**
     * Remove if exists and recreate the temporary directory
     */
    fs.remove(directory, (err) => {
      if (err) {
        return done(err);
      }
      fs.mkdirs(directory, (err) => {
        if (err) {
          return done(err);
        }
        async.eachSeries(buckets, (bucket, callback) => {
          s3Client.createBucket({ Bucket: bucket }, callback);
        }, done);
      });
    });
  });
});

// ==========================
// create Queue
// ==========================
const path = require('path');
const kue = require('kue');
const jobs = require(`${__base}jobs`);
const queue = jobs.queue;
queue.testMode.enter(true);
before((done) => {
  const basename = path.basename(module.filename);
  const taskPath = `${__base}/jobs/task`;

  fs
    .readdirSync(taskPath)
    .filter(file => (file.indexOf('.') !== 0) && (file !== basename))
    .forEach((file) => {
      if (file.slice(-3) !== '.js') return;
      require(path.join(taskPath, file))(queue);
    });

  debug('info', 'Queue started, Listening on: 8888');
  kue.app.listen(8888);
  done();
});

after(function () {
  this.timeout(15000);

  queue.shutdown(5000, (err) => {
    if (err) debug('Queue shutdown failed: ', err);
  });

  app.listen(7777, () => {
    app.close();
  });
});
