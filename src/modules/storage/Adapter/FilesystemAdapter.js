class FilesystemAdapter {

  constructor(adapter) {
    this.adapter = adapter;
  }

  /**
   * Determine if a file exists.
   *
   * @param  string  path
   * @return bool
   * @public
   */
  exists(path) {
    return this.adapter.has(path);
  }

  /**
   * Get the contents of a file.
   *
   * @param  {string} path
   * @return {stream|Error}
   *
   * @public
   */
  get(path) {
    try {
      return this.adapter.read(path);
    } catch (err) {
      console.log(err);
      return err;
      // throw new ContractFileNotFoundException(path, e.getCode(), e);
    }
  }

  /**
   * Get the contents of a file.
   *
   * @param  {string} path
   * @return {stream|Error}
   *
   * @public
   */
  getStream(path) {
    try {
      return this.adapter.readStream(path);
    } catch (err) {
      return err;
    }
  }

  /**
   * Write the contents of a file.
   *
   * @param  {string} path
   * @param  {stream} sourcePath
   * @param  {object} config
   * @return {boolean}
   */
  put(path, sourcePath, config = {}) {
    return this.adapter.write(path, sourcePath, config);
  }

  /**
   * Write the contents of a file using a stream
   *
   * @param  {string} path
   * @param  {stream} resource
   * @param  {object}  config
   * @return {boolean}
   * @public
   */
  putStream(path, resource, config = {}) {
    return this.adapter.writeStream(path, resource, config);
  }

  /**
   * Delete a file.
   *
   * @param {string} path
   *
   * @return Promise
   */
  delete(path) {
    return this.adapter.delete(path);
  }

  /**
   * Delete a Dir
   *
   * @param {string} path
   *
   * @return Promise
   */
  deleteDirectory(path) {
    return this.adapter.deleteDir(path);
  }

}

module.exports = FilesystemAdapter;
