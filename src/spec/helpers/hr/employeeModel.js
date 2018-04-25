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

class EmployeeModel {

  constructor(team, user, userAuthToken) {
    this.team = team;
    this.user = user;
    this.userAuthToken = userAuthToken;
  }

  init() {

  }

  self(data = {}) {
    return new Promise((resolve) => {
      request
        .get(`${commonHelper.getUserAPIUrl()}/employees/self`)
        .query(data)
        .query({ teamId: this.team.id })
        .set('Authorization', this.userAuthToken)
        .end((err, res) => {
          resolve(res.body);
        });
    });
  }

  getEmployee(data = {}) {
    return new Promise((resolve) => {
      request
        .get(`${commonHelper.getUserAPIUrl()}/employees`)
        .query(data)
        .query({ teamId: this.team.id })
        .set('Authorization', this.userAuthToken)
        .end((err, res) => {
          resolve(res.body);
        });
    });
  }

  findEmployee(employee, data = {}) {
    return new Promise((resolve) => {
      request
        .get(`${commonHelper.getUserAPIUrl()}/employees/${employee.id}`)
        .query(data)
        .query({ teamId: this.team.id })
        .set('Authorization', this.userAuthToken)
        .end((err, res) => {
          resolve(res.body);
        });
    });
  }

  updateEmployee(data) {
    return new Promise((resolve) => {
      request
        .put(`${commonHelper.getUserAPIUrl()}/employees/self`)
        .send(data)
        .send({ teamId: this.team.id })
        .set('Authorization', this.userAuthToken)
        .end((err, res) => {
          resolve(res.body);
        });
    });
  }

  getLeaveInfo(data = {}) {
    return new Promise((resolve) => {
      request
        .post(`${commonHelper.getUserAPIUrl()}/employees/self/leave_info`)
        .send(data)
        .send({ teamId: this.team.id })
        .set('Authorization', this.userAuthToken)
        .end((err, res) => {
          resolve(res.body);
        });
    });
  }

  getPendingApproveLeaves(data = {}) {
    return new Promise((resolve) => {
      request
        .get(`${commonHelper.getUserAPIUrl()}/employees/self/pending_to_approve_leaves`)
        .query(data)
        .query({ teamId: this.team.id })
        .set('Authorization', this.userAuthToken)
        .end((err, res) => {
          resolve(res.body);
        });
    });
  }

  findLeave(leave, data = {}) {
    return new Promise((resolve) => {
      request
        .get(`${commonHelper.getUserAPIUrl()}/employees/self/leaves/${leave.id}`)
        .query(data)
        .query({ teamId: this.team.id })
        .set('Authorization', this.userAuthToken)
        .end((err, res) => {
          resolve(res.body);
        });
    });
  }

  createLeave(data) {
    return new Promise((resolve) => {
      request
        .post(`${commonHelper.getUserAPIUrl()}/employees/self/leaves`)
        .send(data)
        .send({ teamId: this.team.id })
        .set('Authorization', this.userAuthToken)
        .end((err, res) => {
          resolve(res.body);
        });
    });
  }

  createLeaveWithAttachments(data, attachments) {
    return new Promise((resolve) => {
      let req = request.post(`${commonHelper.getUserAPIUrl()}/employees/self/leaves/upload`);

      _.each(attachments, (attachment) => {
        req = req.attach('file', attachment);
      });

      _.each(data, (value, key) => {
        req.field(key, value);
      });

      req.field('teamId', this.team.id);

      req.set('Authorization', this.userAuthToken)
        .end((err, res) => {
          resolve(res.body);
        });
    });
  }

  approveLeave(leave) {
    return new Promise((resolve, reject) => {
      request
        .post(`${commonHelper.getUserAPIUrl()}/employees/${leave.employeeId}/leaves/${leave.id}/approve`)
        .send({ teamId: this.team.id })
        .set('Authorization', this.userAuthToken)
        .end((err, res) => {
          resolve(res.body);
        });
    });
  }

  getEmployeeSalaries(data = {}) {
    return new Promise((resolve) => {
      request
        .get(`${commonHelper.getUserAPIUrl()}/employees/self/salaries`)
        .query(data)
        .query({ teamId: this.team.id })
        .set('Authorization', this.userAuthToken)
        .end((err, res) => {
          resolve(res.body);
        });
    });
  }

  findEmployeeSalary(salary, data = {}) {
    return new Promise((resolve) => {
      request
        .get(`${commonHelper.getUserAPIUrl()}/employees/self/salaries/${salary.id}`)
        .query(data)
        .query({ teamId: this.team.id })
        .set('Authorization', this.userAuthToken)
        .end((err, res) => {
          resolve(res.body);
        });
    });
  }


  getHoliday(data = {}) {
    return new Promise((resolve) => {
      request
        .get(`${commonHelper.getUserAPIUrl()}/holidays`)
        .query(data)
        .query({ teamId: this.team.id })
        .set('Authorization', this.userAuthToken)
        .end((err, res) => {
          resolve(res.body);
        });
    });
  }

  findHoliday(holiday, data = {}) {
    return new Promise((resolve) => {
      request
        .get(`${commonHelper.getUserAPIUrl()}/holidays/${holiday.id}`)
        .query(data)
        .query({ teamId: this.team.id })
        .set('Authorization', this.userAuthToken)
        .end((err, res) => {
          resolve(res.body);
        });
    });
  }

  checkIn(data = {}) {
    return new Promise((resolve) => {
      request
        .post(`${commonHelper.getUserAPIUrl()}/attendances/check_in`)
        .send(data)
        .send({ teamId: this.team.id })
        .set('Authorization', this.userAuthToken)
        .end((err, res) => {
          resolve(res.body);
        });
    });
  }

  getAttendances(data = {}) {
    return new Promise((resolve) => {
      request
        .get(`${commonHelper.getUserAPIUrl()}/attendances`)
        .query(data)
        .query({ teamId: this.team.id })
        .set('Authorization', this.userAuthToken)
        .end((err, res) => {
          resolve(res.body);
        });
    });
  }

  getAttendanceMonthlyReport(data = {}) {
    return new Promise((resolve) => {
      request
        .post(`${commonHelper.getUserAPIUrl()}/attendance_reports/monthly`)
        .send(data)
        .send({ teamId: this.team.id })
        .set('Authorization', this.userAuthToken)
        .end((err, res) => {
          resolve(res.body);
        });
    });
  }


  getAnnouncement(data = {}) {
    return new Promise((resolve) => {
      request
        .get(`${commonHelper.getUserAPIUrl()}/announcements`)
        .query(data)
        .query({ teamId: this.team.id })
        .set('Authorization', this.userAuthToken)
        .end((err, res) => {
          resolve(res.body);
        });
    });
  }

  findAnnouncement(announcement, data = {}) {
    return new Promise((resolve) => {
      request
        .get(`${commonHelper.getUserAPIUrl()}/announcements/${announcement.id}`)
        .query(data)
        .query({ teamId: this.team.id })
        .set('Authorization', this.userAuthToken)
        .end((err, res) => {
          resolve(res.body);
        });
    });
  }

  setReadAnnouncement(announcement, data = {}) {
    return new Promise((resolve) => {
      request
        .post(`${commonHelper.getUserAPIUrl()}/announcements/${announcement.id}/read`)
        .send(data)
        .send({ teamId: this.team.id })
        .set('Authorization', this.userAuthToken)
        .end((err, res) => {
          resolve(res.body);
        });
    });
  }


  checkTeamCodeIsUsed(data = {}) {
    return new Promise((resolve) => {
      request
        .post(`${commonHelper.getTAPIUrl()}/exist_teams`)
        .send(data)
        .send({ teamId: this.team.id })
        .set('Authorization', this.userAuthToken)
        .end((err, res) => {
          resolve(res.body);
        });
    });
  }

  getOvertime(data = {}) {
    return new Promise((resolve) => {
      request
        .get(`${commonHelper.getUserAPIUrl()}/employees/self/overtimes`)
        .query(data)
        .query({ teamId: this.team.id })
        .set('Authorization', this.userAuthToken)
        .end((err, res) => {
          resolve(res.body);
        });
    });
  }

  findOvertime(overtime, data = {}) {
    return new Promise((resolve) => {
      request
        .get(`${commonHelper.getUserAPIUrl()}/employees/self/overtimes/${overtime.id}`)
        .query(data)
        .query({ teamId: this.team.id })
        .set('Authorization', this.userAuthToken)
        .end((err, res) => {
          resolve(res.body);
        });
    });
  }

  createOvertime(data) {
    return new Promise((resolve) => {
      request
        .post(`${commonHelper.getUserAPIUrl()}/employees/self/overtimes`)
        .send(data)
        .send({ teamId: this.team.id })
        .set('Authorization', this.userAuthToken)
        .end((err, res) => {
          resolve(res.body);
        });
    });
  }


  approveOvertime(overtime, data = {}) {
    return new Promise((resolve, reject) => {
      request
        .post(`${commonHelper.getUserAPIUrl()}/employees/${overtime.employeeId}/overtimes/${overtime.id}/approve`)
        .send(data)
        .send({ teamId: this.team.id })
        .set('Authorization', this.userAuthToken)
        .end((err, res) => {
          resolve(res.body);
        });
    });
  }

  cancelOvertime(overtime) {
    return new Promise((resolve, reject) => {
      request
        .post(`${commonHelper.getUserAPIUrl()}/employees/self/overtimes/${overtime.id}/cancel`)
        .send({ teamId: this.team.id })
        .set('Authorization', this.userAuthToken)
        .end((err, res) => {
          resolve(res.body);
        });
    });
  }

  rejectOvertime(overtime) {
    return new Promise((resolve, reject) => {
      request
        .post(`${commonHelper.getUserAPIUrl()}/employees/${overtime.employeeId}/overtimes/${overtime.id}/reject`)
        .send({ teamId: this.team.id })
        .set('Authorization', this.userAuthToken)
        .end((err, res) => {
          resolve(res.body);
        });
    });
  }

  getResignation(data) {
    return new Promise((resolve) => {
      request
        .get(`${commonHelper.getUserAPIUrl()}/resignation`)
        .query(data)
        .query({ teamId: this.team.id })
        .set('Authorization', this.userAuthToken)
        .end((err, res) => {
          resolve(res.body);
        });
    });
  }

  findResignation(resignation, data = {}) {
    return new Promise((resolve) => {
      request
        .get(`${commonHelper.getUserAPIUrl()}/resignations/${resignation.id}`)
        .query(data)
        .query({ teamId: this.team.id })
        .set('Authorization', this.userAuthToken)
        .end((err, res) => {
          resolve(res.body);
        });
    });
  }

  createResignation(data) {
    return new Promise((resolve) => {
      request
        .post(`${commonHelper.getUserAPIUrl()}/resignation`)
        .send(data)
        .send({ teamId: this.team.id })
        .set('Authorization', this.userAuthToken)
        .end((err, res) => {
          resolve(res.body);
        });
    });
  }

  cancelResignation(resignation, data = {}) {
    return new Promise((resolve, reject) => {
      request
        .post(`${commonHelper.getUserAPIUrl()}/resignations/${resignation.id}/cancel`)
        .send(data)
        .send({ teamId: this.team.id })
        .set('Authorization', this.userAuthToken)
        .end((err, res) => {
          resolve(res.body);
        });
    });
  }

  approveResignation(resignation, data = {}) {
    return new Promise((resolve, reject) => {
      request
        .post(`${commonHelper.getUserAPIUrl()}/resignations/${resignation.id}/approve`)
        .send(data)
        .send({ teamId: this.team.id })
        .set('Authorization', this.userAuthToken)
        .end((err, res) => {
          resolve(res.body);
        });
    });
  }

  rejectResignation(resignation) {
    return new Promise((resolve, reject) => {
      request
        .post(`${commonHelper.getUserAPIUrl()}/resignations/${resignation.id}/reject`)
        .send({ teamId: this.team.id })
        .set('Authorization', this.userAuthToken)
        .end((err, res) => {
          resolve(res.body);
        });
    });
  }


}

module.exports = EmployeeModel;
