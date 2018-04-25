// core
const debug = require('debug')('APP:TASK_S3');
const logger = require('../../modules/logger');

// model

// library
const Storage = require('../../modules/storage');

const prefix = 's3';

module.exports = function (queue) {
  /**
   * @description upload a files
   * @method upload
   * @param  {String} sourcePath
   * @param  {String} targetPath
   * @param  {Object} headers
   * @return {Promise}
   * @public
   */
  queue.process(`${prefix}::upload`, 1, (job, done) => {
    Storage.disk('s3').put(job.data.sourcePath, job.data.targetPath).then(() => {
      done();
    });
  });

  /**
   * @description delele a files
   * @method upload
   * @param  {String} targetPath
   * @param  {Object} headers
   * @return {Promise}
   * @public
   */
  queue.process(`${prefix}::deleteByPath`, 1, (job, done) => {
    Storage.disk('s3').deleteDirectory(job.data.targetPath).then(() => {
      done();
    });
  });
};
