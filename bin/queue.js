#!/usr/bin/env node

require('../bootstrap/GlobalInit');

// core
const debug = require('debug')('APP:BIN_QUEUE');
const logger = require('../src/modules/logger');

// library
const _ = require('lodash');
const fs = require('fs');
const path = require('path');
const kue = require('kue');

const jobs = require('../src/jobs');
const queue = jobs.queue;

/**
 * Regular Process
 */
const taskPath = `${__base}/jobs/task`;
fs
  .readdirSync(taskPath)
  .filter((file) => {
    return (file.indexOf('.') !== 0) && (file.slice(-3) === '.js');
  })
  .forEach((file) => {
    require(path.join(taskPath, file))(queue);
  });

/**
 * Notification Process
 */
const notificationTaskPath = `${__base}/notifications/channels`;
fs
  .readdirSync(notificationTaskPath)
  .filter((file) => {
    return (file.indexOf('.') !== 0) && (file.slice(-3) === '.js');
  })
  .forEach((file) => {
    const task = new (require(path.join(notificationTaskPath, file)));
    task.queueProcess(queue);
  });

debug('Queue started, Listening on: 5555');
kue.app.listen(5555);
