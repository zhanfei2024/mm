// core
const debug = require('debug')('APP:HR');
const co = require('co');
const Promise = require('bluebird');


// model
const models = require(`${__base}models`);
const commonHelper = require('../common_helper');

// library
const moment = require('moment');
const _ = require('lodash');

// test library
const request = require('superagent');

const EmployeeModel = require('./employeeModel');
const OwnerModel = require('./OwnerModel');
const faker = require('faker');

class UserModel {

  constructor(userAuthToken = '') {
    this.teams = [];
    this.user = '';

    this.userAuthToken = userAuthToken;
  }

  async createUser(data) {
    const self = this;

    await this.register(data);
    const loginResult = (await this.login(data)).result;
    this.userAuthToken = `${loginResult.tokenType} ${loginResult.accessToken}`;
    return new Promise((resolve, reject) => {
      request
        .get(`${commonHelper.getTAPIUrl()}/users/self`)
        .set('Authorization', this.userAuthToken)
        .end((err, res) => {
          self.user = res.body.result;
          resolve(res.body);
        });
    });
  }

  createTeam(data) {
    const self = this;
    return new Promise((resolve, reject) => {
      request
        .post(`${commonHelper.getTAPIUrl()}/teams`)
        .send(data)
        .set('Authorization', this.userAuthToken)
        .end((err, res) => {
          self.teams.push(res.body.result);
          resolve(res.body);
        });
    });
  }

  acceptTeam(data) {
    const self = this;
    return new Promise((resolve, reject) => {
      request
        .post(`${commonHelper.getTAPIUrl()}/accept_teams`)
        .send(data)
        .set('Authorization', this.userAuthToken)
        .end((err, res) => {
          self.teams.push(res.body.result);
          resolve(res.body);
        });
    });
  }

  teamMode(teamIndex) {
    return {
      ownerModel: new OwnerModel(this.teams[teamIndex], this.user, this.userAuthToken),
      employeeModel: new EmployeeModel(this.teams[teamIndex], this.user, this.userAuthToken),
    };
  }

  login(data) {
    const self = this;
    return new Promise((resolve, reject) => {
      request
        .post(`${commonHelper.getTAPIUrl()}/auth/login`)
        .send(data)
        .end((err, res) => {
          resolve(res.body);
        });
    });
  }

  register(data) {
    const self = this;
    return new Promise((resolve, reject) => {
      request
        .post(`${commonHelper.getTAPIUrl()}/auth/register`)
        .send(data)
        .end((err, res) => {
          resolve(res.body);
        });
    });
  }

  changePassword(data) {
    const self = this;
    return new Promise((resolve, reject) => {
      request
        .post(`${commonHelper.getTAPIUrl()}/auth/change_password`)
        .send(data)
        .end((err, res) => {
          resolve(res.body);
        });
    });
  }


}

module.exports = UserModel;
