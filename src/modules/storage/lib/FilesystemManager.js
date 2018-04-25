const _ = require('lodash');
const FilesystemAdapter = require('../Adapter/FilesystemAdapter');
const AwsS3Adapter = require('../Adapter/AwsS3Adapter');
const LocalAdapter = require('../Adapter/LocalAdapter');

class FilesystemManager {
  constructor(config) {
    this.disks = {};
    this.config = config;
  }

  disk(inputName = null) {
    const name = inputName !== null ? inputName : this.getDefaultDriver();
    this.disks[name] = this.get(name);

    return this.disks[name];
  }

  /**
   * Attempt to get the disk from the local cache.
   *
   * @private
   */
  get(name) {
    return !_.isUndefined(this.disks[name]) ? this.disks[name] : this.resolve(name);
  }

  /**
   * Get the filesystem connection configuration.
   *
   * @param  {string}  name
   * @return object
   * @private
   */
  resolve(name) {
    const config = this.getConfig(name);
    const driverMethod = `create${_.upperFirst(name)}Driver`;
    if (!_.isUndefined(this[driverMethod])) {
      return this[driverMethod](config);
    }
    return new Error(`Driver ${name} is not supported.`);
  }

  /**
   * Get the filesystem connection configuration.
   *
   * @param  {string}  name
   * @return object
   */
  getConfig(name) {
    return this.config.disk[name];
  }

  /**
   * Create an instance of the local driver.
   *
   * @param  {Object}  config
   * @public
   */
  createLocalDriver(config) {
    return this.adapt(new LocalAdapter(config));
  }

  /**
   * Create an instance of the Amazon S3 driver.
   *
   * @param  {Object} config
   * @return
   * @public
   */
  createS3Driver(config) {
    return this.adapt(new AwsS3Adapter(config));
  }

  /**
   * Get the default driver name.
   *
   * @return string
   * @public
   */
  getDefaultDriver() {
    return this.config.default;
  }

  /**
   * Adapt the filesystem implementation.
   * @param {Object} filesystem
   * @return FilesystemAdapter
   * @private
   */
  adapt(filesystem) {
    return new FilesystemAdapter(filesystem);
  }

}

module.exports = FilesystemManager;
