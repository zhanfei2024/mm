#!/usr/bin/env node

require('../bootstrap/GlobalInit');

// core
const debug = require('debug')('APP:BIN_WORKER');
const logger = require(__base + 'modules/logger');

// library
const _ = require('lodash');
const fs = require('fs');
const path = require('path');

const CronJob = require('cron').CronJob;

const basename = path.basename(module.filename);
const taskPath = `${__base}/cron/task`;

fs
  .readdirSync(taskPath)
  .filter(function (file) {
    return (file.indexOf('.') !== 0) && (file !== basename);
  })
  .forEach(function (file) {
    if (file.slice(-3) !== '.js') return;
    require(path.join(taskPath, file))(CronJob);
  });

debug(`Worker started`);

