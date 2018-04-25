// core
const debug = require('debug')('APP:HR');
const Promise = require('bluebird');


// model
const models = require(`${__base}models`);
const commonHelper = require('../common_helper');

// library
const moment = require('moment');
const _ = require('lodash');

// test library
const request = require('superagent');

class OwnerModel {
  constructor(team, owner, ownerAuthToken) {
    this.team = team;
    this.owner = owner;
    this.ownerAuthToken = ownerAuthToken;
  }

  // init(team, owner, ownerAuthToken) {
  //
  // }

  createPayroll(data) {
    return new Promise((resolve) => {
      request
        .post(`${commonHelper.getAdminAPIUrl()}/payrolls`)
        .send(data)
        .send({ teamId: this.team.id })
        .set('Authorization', this.ownerAuthToken)
        .end((err, res) => {
          resolve(res.body);
        });
    });
  }

  updatePayroll(payroll, data) {
    return new Promise((resolve) => {
      request
        .put(`${commonHelper.getAdminAPIUrl()}/payrolls/${payroll.id}`)
        .send(data)
        .send({ teamId: this.team.id })
        .set('Authorization', this.ownerAuthToken)
        .end((err, res) => {
          resolve(res.body);
        });
    });
  }

  batchPayroll(payroll, data) {
    return new Promise((resolve) => {
      request
        .post(`${commonHelper.getAdminAPIUrl()}/payrolls/${payroll.id}/batch`)
        .send(data)
        .send({ teamId: this.team.id })
        .set('Authorization', this.ownerAuthToken)
        .end((err, res) => {
          resolve(res.body);
        });
    });
  }

  setCompletePayroll(payroll) {
    return new Promise((resolve) => {
      request
        .post(`${commonHelper.getAdminAPIUrl()}/payrolls/${payroll.id}/complete`)
        .send({ teamId: this.team.id })
        .set('Authorization', this.ownerAuthToken)
        .end((err, res) => {
          resolve(res.body);
        });
    });
  }

  setCancelPayroll(payroll) {
    return new Promise((resolve) => {
      request
        .post(`${commonHelper.getAdminAPIUrl()}/payrolls/${payroll.id}/cancel`)
        .send({ teamId: this.team.id })
        .set('Authorization', this.ownerAuthToken)
        .end((err, res) => {
          resolve(res.body);
        });
    });
  }

  updatePayslipDetail(payslipDetail, data) {
    return new Promise((resolve) => {
      request
        .put(`${commonHelper.getAdminAPIUrl()}/payslips/${payslipDetail.payslipId}/details/${payslipDetail.id}`)
        .send(data)
        .send({ teamId: this.team.id })
        .set('Authorization', this.ownerAuthToken)
        .end((err, res) => {
          resolve(res.body);
        });
    });
  }

  getLeaveType(data = {}) {
    return new Promise((resolve) => {
      request
        .get(`${commonHelper.getAdminAPIUrl()}/leave_types`)
        .query(data)
        .query({ teamId: this.team.id })
        .set('Authorization', this.ownerAuthToken)
        .end((err, res) => {
          resolve(res.body);
        });
    });
  }

  findLeaveType(leaveType, data = {}) {
    return new Promise((resolve) => {
      request
        .get(`${commonHelper.getAdminAPIUrl()}/leave_types/${leaveType.id}`)
        .query(data)
        .query({ teamId: this.team.id })
        .set('Authorization', this.ownerAuthToken)
        .end((err, res) => {
          resolve(res.body);
        });
    });
  }


  createLeaveType(data) {
    return new Promise((resolve, reject) => {
      request
        .post(`${commonHelper.getAdminAPIUrl()}/leave_types`)
        .send(data)
        .send({ teamId: this.team.id })
        .set('Authorization', this.ownerAuthToken)
        .end((err, res) => {
          resolve(res.body);
        });
    });
  }

  updateLeaveType(leaveType, data = {}) {
    return new Promise((resolve) => {
      request
        .put(`${commonHelper.getAdminAPIUrl()}/leave_types/${leaveType.id}`)
        .send(data)
        .send({ teamId: this.team.id })
        .set('Authorization', this.ownerAuthToken)
        .end((err, res) => {
          resolve(res.body);
        });
    });
  }

  destroyLeaveType(leaveType, data = {}) {
    return new Promise((resolve) => {
      request
        .del(`${commonHelper.getAdminAPIUrl()}/leave_types/${leaveType.id}`)
        .query(data)
        .query({ teamId: this.team.id })
        .set('Authorization', this.ownerAuthToken)
        .end((err, res) => {
          resolve(res.body);
        });
    });
  }

  updateTeamSetting(data) {
    return new Promise((resolve) => {
      request
        .post(`${commonHelper.getAdminAPIUrl()}/setting`)
        .send(data)
        .send({ teamId: this.team.id })
        .set('Authorization', this.ownerAuthToken)
        .end((err, res) => {
          resolve(res.body);
        });
    });
  }

  getEmployee(data = {}) {
    return new Promise((resolve) => {
      request
        .get(`${commonHelper.getAdminAPIUrl()}/employees`)
        .query(data)
        .query({ teamId: this.team.id })
        .set('Authorization', this.ownerAuthToken)
        .end((err, res) => {
          resolve(res.body);
        });
    });
  }

  findEmployee(employee, data = {}) {
    return new Promise((resolve) => {
      request
        .get(`${commonHelper.getAdminAPIUrl()}/employees/${employee.id}`)
        .query(data)
        .query({ teamId: this.team.id })
        .set('Authorization', this.ownerAuthToken)
        .end((err, res) => {
          resolve(res.body);
        });
    });
  }

  importEmployee(data, attachments) {
    return new Promise((resolve) => {
      let req = request.post(`${commonHelper.getAdminAPIUrl()}/employees/import`);

      _.each(attachments, (attachment) => {
        req = req.attach('file', attachment);
      });

      _.each(data, (value, key) => {
        req.field(key, value);
      });

      req.field('teamId', this.team.id);

      req.set('Authorization', this.ownerAuthToken)
        .end((err, res) => {
          resolve(res.body);
        });
    });
  }

  createEmployee(data) {
    return new Promise((resolve) => {
      request
        .post(`${commonHelper.getAdminAPIUrl()}/employees`)
        .send(data)
        .send({ teamId: this.team.id })
        .set('Authorization', this.ownerAuthToken)
        .end((err, res) => {
          resolve(res.body);
        });
    });
  }

  invitationTeam(data) {
    return new Promise((resolve) => {
      request
        .post(`${commonHelper.getAdminAPIUrl()}/invitation_teams`)
        .send(data)
        .send({ teamId: this.team.id })
        .set('Authorization', this.ownerAuthToken)
        .end((err, res) => {
          resolve(res.body);
        });
    });
  }

  updateEmployee(employee, data) {
    return new Promise((resolve) => {
      request
        .put(`${commonHelper.getAdminAPIUrl()}/employees/${employee.id}`)
        .send(data)
        .send({ teamId: this.team.id })
        .set('Authorization', this.ownerAuthToken)
        .end((err, res) => {
          resolve(res.body);
        });
    });
  }

  destroyEmployee(employee, data) {
    return new Promise((resolve) => {
      request
        .del(`${commonHelper.getAdminAPIUrl()}/employees/${employee.id}`)
        .query(data)
        .query({ teamId: this.team.id })
        .set('Authorization', this.ownerAuthToken)
        .end((err, res) => {
          resolve(res.body);
        });
    });
  }

  createEmployeeSalary(employee, data) {
    return new Promise((resolve) => {
      request
        .post(`${commonHelper.getAdminAPIUrl()}/employees/${employee.id}/salaries`)
        .send(data)
        .send({ teamId: this.team.id })
        .set('Authorization', this.ownerAuthToken)
        .end((err, res) => {
          resolve(res.body);
        });
    });
  }

  createEmployeeOtherSalary(employee, data) {
    return new Promise((resolve) => {
      request
        .post(`${commonHelper.getAdminAPIUrl()}/employees/${employee.id}/other_salaries`)
        .send(data)
        .send({ teamId: this.team.id })
        .set('Authorization', this.ownerAuthToken)
        .end((err, res) => {
          resolve(res.body);
        });
    });
  }

  getEmployeeSalaries(employee, data = {}) {
    return new Promise((resolve) => {
      request
        .get(`${commonHelper.getAdminAPIUrl()}/employees/${employee.id}/salaries`)
        .query(data)
        .query({ teamId: this.team.id })
        .set('Authorization', this.ownerAuthToken)
        .end((err, res) => {
          resolve(res.body);
        });
    });
  }

  findEmployeeSalary(salary, data = {}) {
    return new Promise((resolve) => {
      request
        .get(`${commonHelper.getAdminAPIUrl()}/employees/${salary.employeeId}/salaries/${salary.id}`)
        .query(data)
        .query({ teamId: this.team.id })
        .set('Authorization', this.ownerAuthToken)
        .end((err, res) => {
          resolve(res.body);
        });
    });
  }

  updateEmployeeSalary(salary, data = {}) {
    return new Promise((resolve) => {
      request
        .put(`${commonHelper.getAdminAPIUrl()}/employees/${salary.employeeId}/salaries/${salary.id}`)
        .send(data)
        .send({ teamId: this.team.id })
        .set('Authorization', this.ownerAuthToken)
        .end((err, res) => {
          resolve(res.body);
        });
    });
  }

  destroyEmployeeSalary(salary, data = {}) {
    return new Promise((resolve) => {
      request
        .del(`${commonHelper.getAdminAPIUrl()}/employees/${salary.employeeId}/salaries/${salary.id}`)
        .query(data)
        .query({ teamId: this.team.id })
        .set('Authorization', this.ownerAuthToken)
        .end((err, res) => {
          resolve(res.body);
        });
    });
  }

  emptyEmployeeSalary(employee) {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await models.EmployeeSalary.destroy({
          where: {
            employeeId: employee.id,
          },
        });
        resolve(result);
      } catch (err) {
        reject(err);
      }
    }).bind(this);
  }

  emptyEmployeeOtherSalary(employee) {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await models.EmployeeOtherSalary.destroy({
          where: {
            employeeId: employee.id,
          },
        });
        resolve(result);
      } catch (err) {
        reject(err);
      }
    }).bind(this);
  }

  emptyOvertime(employee) {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await models.Overtime.destroy({
          where: {
            employeeId: employee.id,
          },
        });
        resolve(result);
      } catch (err) {
        reject(err);
      }
    }).bind(this);
  }


  getHoliday(data = {}) {
    return new Promise((resolve) => {
      request
        .get(`${commonHelper.getAdminAPIUrl()}/holidays`)
        .query(data)
        .query({ teamId: this.team.id })
        .set('Authorization', this.ownerAuthToken)
        .end((err, res) => {
          resolve(res.body);
        });
    });
  }

  findHoliday(holiday, data = {}) {
    return new Promise((resolve) => {
      request
        .get(`${commonHelper.getAdminAPIUrl()}/holidays/${holiday.id}`)
        .query(data)
        .query({ teamId: this.team.id })
        .set('Authorization', this.ownerAuthToken)
        .end((err, res) => {
          resolve(res.body);
        });
    });
  }

  createHoliday(data) {
    return new Promise((resolve) => {
      request
        .post(`${commonHelper.getAdminAPIUrl()}/holidays`)
        .send(data)
        .send({ teamId: this.team.id })
        .set('Authorization', this.ownerAuthToken)
        .end((err, res) => {
          resolve(res.body);
        });
    });
  }

  updateHoliday(holiday, data) {
    return new Promise((resolve) => {
      request
        .put(`${commonHelper.getAdminAPIUrl()}/holidays/${holiday.id}`)
        .send(data)
        .send({ teamId: this.team.id })
        .set('Authorization', this.ownerAuthToken)
        .end((err, res) => {
          resolve(res.body);
        });
    });
  }

  destroyHoliday(holiday, data = {}) {
    return new Promise((resolve) => {
      request
        .del(`${commonHelper.getAdminAPIUrl()}/holidays/${holiday.id}`)
        .query(data)
        .query({ teamId: this.team.id })
        .set('Authorization', this.ownerAuthToken)
        .end((err, res) => {
          resolve(res.body);
        });
    });
  }

  emptyHoliday() {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await models.Holiday.destroy({
          where: {
            teamId: this.team.id,
          },
        });
        resolve(result);
      } catch (err) {
        reject(err);
      }
    }).bind(this);
  }

  importHoliday(data, attachments) {
    return new Promise((resolve) => {
      let req = request.post(`${commonHelper.getAdminAPIUrl()}/import_holidays`);

      _.each(attachments, (attachment) => {
        req = req.attach('file', attachment);
      });

      _.each(data, (value, key) => {
        req.field(key, value);
      });

      req.field('teamId', this.team.id);

      req.set('Authorization', this.ownerAuthToken)
        .end((err, res) => {
          resolve(res.body);
        });
    });
  }

  getWorkingGroup(data = {}) {
    return new Promise((resolve) => {
      request
        .get(`${commonHelper.getAdminAPIUrl()}/working_groups`)
        .query(data)
        .query({ teamId: this.team.id })
        .set('Authorization', this.ownerAuthToken)
        .end((err, res) => {
          resolve(res.body);
        });
    });
  }

  findWorkingGroup(workingGroup, data = {}) {
    return new Promise((resolve) => {
      request
        .get(`${commonHelper.getAdminAPIUrl()}/working_groups/${workingGroup.id}`)
        .query(data)
        .query({ teamId: this.team.id })
        .set('Authorization', this.ownerAuthToken)
        .end((err, res) => {
          resolve(res.body);
        });
    });
  }

  createWorkingGroup(data) {
    return new Promise((resolve) => {
      request
        .post(`${commonHelper.getAdminAPIUrl()}/working_groups`)
        .send(data)
        .send({ teamId: this.team.id })
        .set('Authorization', this.ownerAuthToken)
        .end((err, res) => {
          resolve(res.body);
        });
    });
  }

  updateWorkingGroup(workingGroup, data) {
    return new Promise((resolve) => {
      request
        .put(`${commonHelper.getAdminAPIUrl()}/working_groups/${workingGroup.id}`)
        .send(data)
        .send({ teamId: this.team.id })
        .set('Authorization', this.ownerAuthToken)
        .end((err, res) => {
          resolve(res.body);
        });
    });
  }

  destroyWorkingGroup(workingGroup, data = {}) {
    return new Promise((resolve) => {
      request
        .del(`${commonHelper.getAdminAPIUrl()}/working_groups/${workingGroup.id}`)
        .query(data)
        .query({ teamId: this.team.id })
        .set('Authorization', this.ownerAuthToken)
        .end((err, res) => {
          resolve(res.body);
        });
    });
  }

  emptyEmployeeInWorkingGroup(employee) {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await models.WorkingGroupEmployee.destroy({
          where: {
            employeeId: employee.id,
          },
        });
        resolve(result);
      } catch (err) {
        reject(err);
      }
    }).bind(this);
  }

  getWorkingClass(data = {}) {
    return new Promise((resolve) => {
      request
        .get(`${commonHelper.getAdminAPIUrl()}/working_classes`)
        .query(data)
        .query({ teamId: this.team.id })
        .set('Authorization', this.ownerAuthToken)
        .end((err, res) => {
          resolve(res.body);
        });
    });
  }

  findWorkingClass(workingClass, data = {}) {
    return new Promise((resolve) => {
      request
        .get(`${commonHelper.getAdminAPIUrl()}/working_classes/${workingClass.id}`)
        .query(data)
        .query({ teamId: this.team.id })
        .set('Authorization', this.ownerAuthToken)
        .end((err, res) => {
          resolve(res.body);
        });
    });
  }

  createWorkingClass(data) {
    return new Promise((resolve) => {
      request
        .post(`${commonHelper.getAdminAPIUrl()}/working_classes`)
        .send(data)
        .send({ teamId: this.team.id })
        .set('Authorization', this.ownerAuthToken)
        .end((err, res) => {
          resolve(res.body);
        });
    });
  }

  updateWorkingClass(workingClass, data) {
    return new Promise((resolve) => {
      request
        .put(`${commonHelper.getAdminAPIUrl()}/working_classes/${workingClass.id}`)
        .send(data)
        .send({ teamId: this.team.id })
        .set('Authorization', this.ownerAuthToken)
        .end((err, res) => {
          resolve(res.body);
        });
    });
  }

  destroyWorkingClass(workingClass, data = {}) {
    return new Promise((resolve) => {
      request
        .del(`${commonHelper.getAdminAPIUrl()}/working_classes/${workingClass.id}`)
        .query(data)
        .query({ teamId: this.team.id })
        .set('Authorization', this.ownerAuthToken)
        .end((err, res) => {
          resolve(res.body);
        });
    });
  }

  emptyAttendance(employee) {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await models.Attendance.destroy({
          where: {
            employeeId: employee.id,
          },
        });
        resolve(result);
      } catch (err) {
        reject(err);
      }
    }).bind(this);
  }

  getEmployeeLeaveType(employee, data = {}) {
    return new Promise((resolve) => {
      request
        .get(`${commonHelper.getAdminAPIUrl()}/employees/${employee.id}/leave_types`)
        .query(data)
        .query({ teamId: this.team.id })
        .set('Authorization', this.ownerAuthToken)
        .end((err, res) => {
          resolve(res.body);
        });
    });
  }

  findEmployeeLeaveType(employee, leaveType, data = {}) {
    return new Promise((resolve) => {
      request
        .get(`${commonHelper.getAdminAPIUrl()}/employees/${employee.id}/leave_types/${leaveType.id}`)
        .query(data)
        .query({ teamId: this.team.id })
        .set('Authorization', this.ownerAuthToken)
        .end((err, res) => {
          resolve(res.body);
        });
    });
  }

  createEmployeeLeaveType(employee, leaveType, data = {}) {
    return new Promise((resolve) => {
      request
        .post(`${commonHelper.getAdminAPIUrl()}/employees/${employee.id}/leave_types/${leaveType.id}`)
        .send(data)
        .send({ teamId: this.team.id })
        .set('Authorization', this.ownerAuthToken)
        .end((err, res) => {
          resolve(res.body);
        });
    });
  }

  resetEmployeeLeaveTypeMaxRollOver(leaveType, data = {}) {
    return new Promise((resolve) => {
      request
        .post(`${commonHelper.getAdminAPIUrl()}/leave_types/${leaveType.id}/reset`)
        .send(data)
        .send({ teamId: this.team.id })
        .set('Authorization', this.ownerAuthToken)
        .end((err, res) => {
          resolve(res.body);
        });
    })
  }

  emptyEmployeeLeaveType(employee, leaveType, data = {}) {
    return new Promise((resolve) => {
      request
        .post(`${commonHelper.getAdminAPIUrl()}/employees/${employee.id}/leave_types/${leaveType.id}`)
        .send(data)
        .send({ teamId: this.team.id })
        .set('Authorization', this.ownerAuthToken)
        .end((err, res) => {
          resolve(res.body);
        });
    });
  }

  getGroup(data = {}) {
    return new Promise((resolve) => {
      request
        .get(`${commonHelper.getAdminAPIUrl()}/groups`)
        .query(data)
        .query({ teamId: this.team.id })
        .set('Authorization', this.ownerAuthToken)
        .end((err, res) => {
          resolve(res.body);
        });
    });
  }

  findGroup(group, data = {}) {
    return new Promise((resolve) => {
      request
        .get(`${commonHelper.getAdminAPIUrl()}/groups/${group.id}`)
        .query(data)
        .query({ teamId: this.team.id })
        .set('Authorization', this.ownerAuthToken)
        .end((err, res) => {
          resolve(res.body);
        });
    });
  }

  createGroup(data) {
    return new Promise((resolve) => {
      request
        .post(`${commonHelper.getAdminAPIUrl()}/groups`)
        .send(data)
        .send({ teamId: this.team.id })
        .set('Authorization', this.ownerAuthToken)
        .end((err, res) => {
          resolve(res.body);
        });
    });
  }

  updateGroup(group, data) {
    return new Promise((resolve) => {
      request
        .put(`${commonHelper.getAdminAPIUrl()}/groups/${group.id}`)
        .send(data)
        .send({ teamId: this.team.id })
        .set('Authorization', this.ownerAuthToken)
        .end((err, res) => {
          resolve(res.body);
        });
    });
  }

  destroyGroup(group, data = {}) {
    return new Promise((resolve) => {
      request
        .del(`${commonHelper.getAdminAPIUrl()}/groups/${group.id}`)
        .query(data)
        .query({ teamId: this.team.id })
        .set('Authorization', this.ownerAuthToken)
        .end((err, res) => {
          resolve(res.body);
        });
    });
  }

  getPermission(data = {}) {
    return new Promise((resolve) => {
      request
        .get(`${commonHelper.getAdminAPIUrl()}/permissions`)
        .query(data)
        .query({ teamId: this.team.id })
        .set('Authorization', this.ownerAuthToken)
        .end((err, res) => {
          resolve(res.body);
        });
    });
  }

  findPermission(permission, data = {}) {
    return new Promise((resolve) => {
      request
        .get(`${commonHelper.getAdminAPIUrl()}/permissions/${permission.id}`)
        .query(data)
        .query({ teamId: this.team.id })
        .set('Authorization', this.ownerAuthToken)
        .end((err, res) => {
          resolve(res.body);
        });
    });
  }

  getRole(data = {}) {
    return new Promise((resolve) => {
      request
        .get(`${commonHelper.getAdminAPIUrl()}/roles`)
        .query(data)
        .query({ teamId: this.team.id })
        .set('Authorization', this.ownerAuthToken)
        .end((err, res) => {
          resolve(res.body);
        });
    });
  }

  findRole(role, data = {}) {
    return new Promise((resolve) => {
      request
        .get(`${commonHelper.getAdminAPIUrl()}/roles/${role.id}`)
        .query(data)
        .query({ teamId: this.team.id })
        .set('Authorization', this.ownerAuthToken)
        .end((err, res) => {
          resolve(res.body);
        });
    });
  }

  createRole(data) {
    return new Promise((resolve) => {
      request
        .post(`${commonHelper.getAdminAPIUrl()}/roles`)
        .send(data)
        .send({ teamId: this.team.id })
        .set('Authorization', this.ownerAuthToken)
        .end((err, res) => {
          console.log(res.body, '2221');
          resolve(res.body);
        });
    });
  }

  updateRole(role, data) {
    return new Promise((resolve) => {
      request
        .put(`${commonHelper.getAdminAPIUrl()}/roles/${role.id}`)
        .send(data)
        .send({ teamId: this.team.id })
        .set('Authorization', this.ownerAuthToken)
        .end((err, res) => {
          resolve(res.body);
        });
    });
  }

  destroyRole(role, data = {}) {
    return new Promise((resolve) => {
      request
        .del(`${commonHelper.getAdminAPIUrl()}/roles/${role.id}`)
        .query(data)
        .query({ teamId: this.team.id })
        .set('Authorization', this.ownerAuthToken)
        .end((err, res) => {
          resolve(res.body);
        });
    });
  }

  getAnnouncement(data = {}) {
    return new Promise((resolve) => {
      request
        .get(`${commonHelper.getAdminAPIUrl()}/announcements`)
        .query(data)
        .query({ teamId: this.team.id })
        .set('Authorization', this.ownerAuthToken)
        .end((err, res) => {
          resolve(res.body);
        });
    });
  }

  findAnnouncement(announcement, data = {}) {
    return new Promise((resolve) => {
      request
        .get(`${commonHelper.getAdminAPIUrl()}/announcements/${announcement.id}`)
        .query(data)
        .query({ teamId: this.team.id })
        .set('Authorization', this.ownerAuthToken)
        .end((err, res) => {
          resolve(res.body);
        });
    });
  }

  createAnnouncement(data) {
    return new Promise((resolve) => {
      request
        .post(`${commonHelper.getAdminAPIUrl()}/announcements`)
        .send(data)
        .send({ teamId: this.team.id })
        .set('Authorization', this.ownerAuthToken)
        .end((err, res) => {
          resolve(res.body);
        });
    });
  }

  destroyAnnouncement(announcement, data = {}) {
    return new Promise((resolve) => {
      request
        .del(`${commonHelper.getAdminAPIUrl()}/announcements/${announcement.id}`)
        .query(data)
        .query({ teamId: this.team.id })
        .set('Authorization', this.ownerAuthToken)
        .end((err, res) => {
          resolve(res.body);
        });
    });
  }


  getPayType(data = {}) {
    return new Promise((resolve) => {
      request
        .get(`${commonHelper.getAdminAPIUrl()}/pay_types`)
        .query(data)
        .query({ teamId: this.team.id })
        .set('Authorization', this.ownerAuthToken)
        .end((err, res) => {
          resolve(res.body);
        });
    });
  }

  findPayType(payType, data = {}) {
    return new Promise((resolve) => {
      request
        .get(`${commonHelper.getAdminAPIUrl()}/pay_types/${payType.id}`)
        .query(data)
        .query({ teamId: this.team.id })
        .set('Authorization', this.ownerAuthToken)
        .end((err, res) => {
          resolve(res.body);
        });
    });
  }

  createPayType(data) {
    return new Promise((resolve) => {
      request
        .post(`${commonHelper.getAdminAPIUrl()}/pay_types`)
        .send(data)
        .send({ teamId: this.team.id })
        .set('Authorization', this.ownerAuthToken)
        .end((err, res) => {
          resolve(res.body);
        });
    });
  }

  updatePayType(payType, data) {
    return new Promise((resolve) => {
      request
        .put(`${commonHelper.getAdminAPIUrl()}/pay_types/${payType.id}`)
        .send(data)
        .send({ teamId: this.team.id })
        .set('Authorization', this.ownerAuthToken)
        .end((err, res) => {
          resolve(res.body);
        });
    });
  }

  destroyPayType(payType, data = {}) {
    return new Promise((resolve) => {
      request
        .del(`${commonHelper.getAdminAPIUrl()}/pay_types/${payType.id}`)
        .query(data)
        .query({ teamId: this.team.id })
        .set('Authorization', this.ownerAuthToken)
        .end((err, res) => {
          resolve(res.body);
        });
    });
  }


  getResignation(data) {
    return new Promise((resolve) => {
      request
        .get(`${commonHelper.getAdminAPIUrl()}/resignations`)
        .query(data)
        .query({ teamId: this.team.id })
        .set('Authorization', this.ownerAuthToken)
        .end((err, res) => {
          resolve(res.body);
        });
    });
  }

  findResignation(resignation, data = {}) {
    return new Promise((resolve) => {
      request
        .get(`${commonHelper.getAdminAPIUrl()}/resignations/${resignation.id}`)
        .query(data)
        .query({ teamId: this.team.id })
        .set('Authorization', this.ownerAuthToken)
        .end((err, res) => {
          resolve(res.body);
        });
    });
  }

  createResignation(data) {
    return new Promise((resolve) => {
      request
        .post(`${commonHelper.getAdminAPIUrl()}/resignations`)
        .send(data)
        .send({ teamId: this.team.id })
        .set('Authorization', this.ownerAuthToken)
        .end((err, res) => {
          resolve(res.body);
        });
    });
  }

  rejectResignation(resignation, data = {}) {
    return new Promise((resolve) => {
      request
        .post(`${commonHelper.getAdminAPIUrl()}/resignations/${resignation.id}/reject`)
        .send(data)
        .send({ teamId: this.team.id })
        .set('Authorization', this.ownerAuthToken)
        .end((err, res) => {
          resolve(res.body);
        });
    });
  }

  emptyResignation(employee) {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await models.Resignation.destroy({
          where: {
            employeeId: employee.id,
          },
        });
        resolve(result);
      } catch (err) {
        reject(err);
      }
    }).bind(this);
  }

  approveResignation(resignation, data = {}) {
    return new Promise((resolve) => {
      request
        .post(`${commonHelper.getAdminAPIUrl()}/resignations/${resignation.id}/approve`)
        .send(data)
        .send({ teamId: this.team.id })
        .set('Authorization', this.ownerAuthToken)
        .end((err, res) => {
          resolve(res.body);
        });
    });
  }

  confirmResignation(resignation, data = {}) {
    return new Promise((resolve) => {
      request
        .post(`${commonHelper.getAdminAPIUrl()}/resignations/${resignation.id}/confirm`)
        .send(data)
        .send({ teamId: this.team.id })
        .set('Authorization', this.ownerAuthToken)
        .end((err, res) => {
          resolve(res.body);
        });
    });
  }

  getGroup(data = {}) {
    return new Promise((resolve) => {
      request
        .get(`${commonHelper.getAdminAPIUrl()}/groups`)
        .query(data)
        .query({ teamId: this.team.id })
        .set('Authorization', this.ownerAuthToken)
        .end((err, res) => {
          resolve(res.body);
        });
    });
  }

  findGroup(group, data = {}) {
    return new Promise((resolve) => {
      request
        .get(`${commonHelper.getAdminAPIUrl()}/groups/${group.id}`)
        .query(data)
        .query({ teamId: this.team.id })
        .set('Authorization', this.ownerAuthToken)
        .end((err, res) => {
          resolve(res.body);
        });
    });
  }

  createGroup(data) {
    return new Promise((resolve) => {
      request
        .post(`${commonHelper.getAdminAPIUrl()}/groups`)
        .send(data)
        .send({ teamId: this.team.id })
        .set('Authorization', this.ownerAuthToken)
        .end((err, res) => {
          resolve(res.body);
        });
    });
  }

  updateGroup(group, data) {
    return new Promise((resolve) => {
      request
        .put(`${commonHelper.getAdminAPIUrl()}/groups/${group.id}`)
        .send(data)
        .send({ teamId: this.team.id })
        .set('Authorization', this.ownerAuthToken)
        .end((err, res) => {
          resolve(res.body);
        });
    });
  }

  destroyGroup(group, data = {}) {
    return new Promise((resolve) => {
      request
        .del(`${commonHelper.getAdminAPIUrl()}/groups/${group.id}`)
        .query(data)
        .query({ teamId: this.team.id })
        .set('Authorization', this.ownerAuthToken)
        .end((err, res) => {
          resolve(res.body);
        });
    });
  }

  getDefaultApprover(data = {}) {
    return new Promise((resolve) => {
      request
        .get(`${commonHelper.getAdminAPIUrl()}/default_approvers`)
        .query(data)
        .query({ teamId: this.team.id })
        .set('Authorization', this.ownerAuthToken)
        .end((err, res) => {
          resolve(res.body);
        });
    });
  }

  updateDefaultApprover(data) {
    return new Promise((resolve) => {
      request
        .post(`${commonHelper.getAdminAPIUrl()}/default_approvers`)
        .send(data)
        .send({ teamId: this.team.id })
        .set('Authorization', this.ownerAuthToken)
        .end((err, res) => {
          resolve(res.body);
        });
    });
  }

}

module.exports = OwnerModel;
