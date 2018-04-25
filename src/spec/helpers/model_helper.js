const _ = require('lodash');
const debug = require('debug')('APP:MODELHELPER');
const models = require('../../models');
const faker = require('faker');
const moment = require('moment');

const modelHelper = {
  faker: {},
};

modelHelper.faker.team = function (param = {}) {
  return _.extend({
    name: faker.internet.userName(),
    code: _.lowerCase(faker.name.firstName()),
    firstName: faker.internet.userName(),
    lastName: faker.internet.userName()
  }, param);
};

modelHelper.faker.applyTeam = function (param = {}) {
  return _.extend({
    lastName: faker.name.lastName(),
    firstName: faker.name.firstName(),
    email: faker.internet.email(),
  }, param);
};

modelHelper.faker.register = function (param = {}) {
  return _.extend({
    lastName: faker.name.lastName(),
    firstName: faker.name.firstName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  }, param);
};


modelHelper.faker.user = function (param = {}) {
  return _.extend({
    lastName: faker.name.lastName(),
    firstName: faker.name.firstName(),
    gender: faker.random.arrayElement(['M', 'F']),
    active: true,
    email: faker.internet.email(),
  }, param);
};

modelHelper.faker.role = function (param = {}) {
  return _.extend({
    name: faker.internet.userName(),
    description: faker.lorem.text(),
    permissionIds: [],
  }, param);
};

modelHelper.faker.team_invitation = function (param = {}) {
  return _.extend({
    employeeId: null,
    email: faker.internet.email(),
  }, param);
};

modelHelper.faker.employee = function (param = {}) {
  return _.extend({
    firstName: faker.name.findName(),
    lastName: faker.name.findName(),
    jobTitle: faker.name.findName(),
    personalEmail: faker.internet.email(),
    workEmail: faker.internet.email(),
    birth: moment(faker.date.past()).format('YYYY-MM-DD'),
    homePhone: faker.phone.phoneNumber(),
    officePhone: faker.phone.phoneNumber(),
    mobilePhone: faker.phone.phoneNumber(),
    nationalityId: `${faker.random.number({ min: 4, max: 20 })}`,
    gender: faker.random.arrayElement(['M', 'F']),
    marital: faker.random.arrayElement(['single', 'married', 'divorced', 'widowed', 'civil_partnership', 'other']),
    identityNumber: faker.name.findName(),
    passport: faker.name.findName(),
    passportExpiredDate: moment(faker.date.recent()).format('YYYY-MM-DD'),
    driving: faker.name.findName(),
    drivingExpiredDate: moment(faker.date.recent()).format('YYYY-MM-DD'),
    workingVisaExpiredDate: moment(faker.date.past()).format('YYYY-MM-DD'),
    workingVisaStartedDate: moment(faker.date.past()).format('YYYY-MM-DD'),
  }, param);
};

modelHelper.faker.employeeForImport = function (param = {}) {
  const result = _.extend(modelHelper.faker.employee(), {
    invitationEmail: faker.internet.email(),

    salaryPayRate: faker.random.number({ min: 4, max: 20 }),
    salaryUnit: faker.random.arrayElement(['hourly', 'monthly', 'yearly']),
    salaryEffectiveDate: moment(faker.date.past()).format('YYYY-MM-DD'),
    salaryCorrection: 30,
    salaryRemark: 'all',
    // paymentMethod: data.paymentMethod,
    paymentAccountName: faker.name.findName(),
    paymentAccountNumber: faker.name.findName(),
    paymentAccountRemark: faker.name.findName(),
  });

  return _.extend(result, param);
};


modelHelper.faker.employeeSalary = function (param) {
  param = param || {};

  return _.extend({
    employeeId: param.employeeId,
    payRate: faker.random.number({ min: 4, max: 20 }),
    unit: faker.random.arrayElement(['hourly', 'monthly', 'yearly']),
    effectiveDate: moment(faker.date.past()).format('YYYY-MM-DD'),
    remark: 'all',
  }, param);
};

modelHelper.faker.employeeOtherSalary = function (param) {
  param = param || {};

  return _.extend({
    employeeId: param.employeeId,
    payTypeId: param.payTypeId,
    payRate: faker.random.number({ min: 4, max: 20 }),
    unit: faker.random.arrayElement(['hourly', 'monthly', 'yearly']),
    effectiveDate: moment(faker.date.past()).format('YYYY-MM-DD'),
    remark: 'all',
  }, param);
};

modelHelper.faker.employeeWorkingPattern = function (workingPatternId) {
  return {
    workingPatternId,
    effectiveDate: moment(faker.date.future(2, moment().add(1, 'day').format())).format('YYYY-MM-DD'),
  };
};

modelHelper.faker.paymentMethodField = function () {
  return {
    name: faker.name.findName(),
    code: faker.name.findName(),
    security: true,
  };
};

modelHelper.faker.paymentMethod = function () {
  return {
    name: faker.name.findName(),
  };
};

modelHelper.faker.ipRestriction = function () {
  const fromIp = faker.internet.ip();
  let toIp = fromIp.split('.');
  toIp[toIp.length - 1] = '254';
  toIp = toIp.join('.');

  return {
    type: faker.random.arrayElement(['attendance']),
    fromIp,
    // 'toIp': toIp
  };
};

modelHelper.faker.workingClass = function (param = {}) {
  return _.extend({
    name: faker.name.findName(),
    hasCheckOut: false,
    break: '',
    // break: {
    //   "start": "09:00:00",
    //   "end": "10:10:00"
    // },
    sections: [{
      start: {
        across: false,
        time: '09:00:00',
      },
      end: {
        across: false,
        time: '18:00:00',
      },
    }],
    seriousLateMinutes: 0,
    permitLateMinutes: 0,
    absentLateMinutes: 0,
    remark: faker.name.findName(),
  }, param);
};


modelHelper.faker.workingGroup = function (param = {}) {
  return _.extend({
    type: 'none',
    remark: faker.name.findName(),
    name: faker.name.findName(),
    workingClassIds: [],
    employeeIds: [],
  }, param);
};

modelHelper.faker.employeeLeaveType = function (param = {}) {
  return _.extend({
    adjustment: faker.random.number({ min: -20, max: 20 }),
    reason: faker.name.findName(),
  }, param);
};

modelHelper.faker.workingPattern = function () {
  return {
    name: faker.name.findName(),
    default: false,
    active: true,

    hasMonday: true,
    mondayFrom: '09:00:00',
    mondayTo: '18:00:00',
    mondayMinus: '01:00:00',

    hasTuesday: true,
    tuesdayFrom: '09:00:00',
    tuesdayTo: '18:00:00',
    tuesdayMinus: '01:00:00',

    hasWednesday: true,
    wednesdayFrom: '09:00:00',
    wednesdayTo: '18:00:00',
    wednesdayMinus: '01:00:00',

    hasThursday: true,
    thursdayFrom: '09:00:00',
    thursdayTo: '18:00:00',
    thursdayMinus: '01:00:00',

    hasFriday: true,
    fridayFrom: '09:00:00',
    fridayTo: '18:00:00',
    fridayMinus: '01:00:00',

    hasSaturday: true,
    saturdayFrom: '09:00:00',
    saturdayTo: '18:00:00',
    saturdayMinus: '01:00:00',

    hasSunday: true,
    sundayFrom: '09:00:00',
    sundayTo: '18:00:00',
    sundayMinus: '01:00:00',
  };
};

modelHelper.faker.group = function (param) {
  param = param || {};

  return _.extend({
    order: faker.random.number({ min: 4, max: 20 }),
    name: faker.name.findName(),
  }, param);
};

modelHelper.faker.overtime = function (param = {}) {
  return _.extend({
    remark: faker.name.findName(),
    startedDate: moment().add(faker.random.number({ min: 1, max: 2 }), 'hours').format(),
    endedDate: moment().add(faker.random.number({ min: 3, max: 6 }), 'hours').format(),
  }, param);
};

modelHelper.faker.holiday = function (param = {}) {
  return _.extend({
    startedDate: moment(faker.date.future(2, moment().add(1, 'day').format())).format('YYYY-MM-DD'),
    endedDate: moment(faker.date.future(2, moment().add(1, 'day').format())).format('YYYY-MM-DD'),
    name: faker.name.findName(),
  }, param);
};

modelHelper.faker.announcement = function (param) {
  param = param || {};

  return _.extend({
    title: faker.name.findName(),
    content: faker.name.findName(),
  }, param);
};

modelHelper.faker.leaveType = function (param = {}) {
  return _.extend({
    name: faker.name.findName(),
    // gender: null,
    // marital: null,
    // locationId: null,
    unit: 'day',
    allEmployee: true,
    accrualType: 'begin',
    accrualPeriod: 'yearly',
    maxLeave: 10,
    forfeite: 0,
    maxRollOver: 10,
    allowHalfDay: 0,
    allowBeyondLimit: 0,
    excludeWeekend: 0,
    excludeHoliday: 0,
    submitBeforeDay: 0,
    maxConsecutiveDay: 0,
    requireAttachment: 0,
    //startedDate: null,
    //endedDate: null
  }, param);
};

modelHelper.faker.payType = function (param) {
  param = param || {};

  return _.extend({
    name: faker.name.findName(),
    code: faker.name.findName(),
    remark: faker.name.findName(),
  }, param);
};


modelHelper.faker.payTypeWithRule = function (param) {
  param = param || {};
  const rules = [
    '{{#is BASIC_SALARY 10000}}{{multiply BASIC_SALARY 1.2}}{{/is}}',
    '{{#gte BASIC_SALARY 1000}}{{multiply BASIC_SALARY 1.5}}{{/gte}}',
    '{{#gt BASIC_SALARY 1000}}{{multiply BASIC_SALARY 1.2}}{{/gt}}',
    '{{#lte BASIC_SALARY 1000}}{{multiply BASIC_SALARY 1.2}}{{/lte}}',
    '{{#lt BASIC_SALARY 1000}}{{multiply BASIC_SALARY 1.2}}{{/lt}}',
    '{{#gte BASIC_SALARY 1000}}{{subtract BASIC_SALARY 999}}{{/gte}}',
    '{{#gte BASIC_SALARY 1000}}2222{{/gte}}',
    '{{#gte BASIC_SALARY 1000}}{{divide BASIC_SALARY 2}}{{/gte}}',
    '{{#gte BASIC_SALARY 1000}}{{add BASIC_SALARY 5555}}{{/gte}}',
    '{{#gte BASIC_SALARY 1000}}{{add BASIC_SALARY -5555}}{{/gte}}',
    '{{#gte BASIC_SALARY 1000}}{{add BASIC_SALARY -5555.55}}{{/gte}}',
  ];

  return _.extend({
    name: faker.name.findName(),
    allEmployee: true,
    rules: [
      {
        changeField: 'basicSalary',
        script: faker.random.arrayElement(rules),
      },
      {
        changeField: 'basicSalary',
        script: faker.random.arrayElement(rules),
      },
      {
        changeField: 'basicSalary',
        script: faker.random.arrayElement(rules),
      },
    ],
  }, param);
};

module.exports = modelHelper;
