const knox = require('knox');
const Buffer = require('buffer').Buffer;
const fs = require('fs');
const _ = require('lodash');

class AwsS3Adapter {

  constructor(config) {
    this.client = knox.createClient({
      key: config.key,
      secret: config.secret,
      bucket: config.bucket,
      region: config.region,
      endpoint: config.endpoint,
      port: config.port,
      style: 'path',
    });
  }

  /**
   * Check whether a file exists.
   *
   * @param string path
   *
   * @return {boolean}
   */
  has(path) {
  }

  /**
   * Read a file.
   *
   * @param string path
   *
   * @return array|false
   */
  read(path) {
    return new Promise((resolve, reject) => {
      const buffer = [];
      this.readStream(path).then((stream) => {
        stream.on('data', (chunk) => {
          buffer.push(chunk);
        });
        stream.on('end', () => resolve(Buffer.concat(buffer)));
      }, err => reject(err));
    });
  }

  /**
   * Read a file as a stream.
   *
   * @param string path
   *
   * @return array|false
   */
  readStream(path) {
    return new Promise((resolve, reject) => {
      this.client.getFile(`${path}`, (err, stream) => {
        if (err) return reject(err);

        if (stream.statusCode !== 200) {
          return reject(new Error(`failed to download a file: ${path}`));
        }
        return resolve(stream);
      });
    });
  }

  /**
   * List contents of a directory.
   *
   * @param {string} directory
   * @param {boolean}   recursive
   *
   * @return array
   */
  listContents(directory = '', recursive = false) {
  }

  /**
   * Get all the meta data of a file or directory.
   *
   * @param string path
   *
   * @return array|false
   */
  getMetadata(path) {
  }

  /**
   * Get the size of a file.
   *
   * @param string path
   *
   * @return array|false
   */
  getSize(path) {
  }

  /**
   * Get the mimetype of a file.
   *
   * @param string path
   *
   * @return array|false
   */
  getMimetype(path) {
  }

  /**
   * Get the timestamp of a file.
   *
   * @param string path
   *
   * @return array|false
   */
  getTimestamp(path) {
  }

  /**
   * Get the visibility of a file.
   *
   * @param string path
   *
   * @return array|false
   */
  getVisibility(path) {
  }

  /**
   * Write a new file.
   *
   * @param string path
   * @param string contents
   * @param config   Config object
   *
   * @return array|false false on failure file meta data on success
   */
  write(path, contents, config) {
    return new Promise((resolve, reject) => {
      this.client.putFile(path, contents, config.headers || {}, (err, res) => {
        if (err) return reject(err);
        if (res.statusCode !== 200) return reject(new Error('Something get error.'));
        return resolve(true);
      });
    });
  }

  /**
   * Write a new file using a stream.
   *
   * @param string   path
   * @param resource resource
   * @param config   Config object
   *
   * @return array|false false on failure file meta data on success
   */
  writeStream(path, resource, config) {
    return new Promise((resolve, reject) => {
      try {
        this.client.putStream(resource, path, config.headers || {}, (err, res) => {
          if (err) return reject(err);
          if (res.statusCode !== 200) return reject(new Error('Something get error.'));
          return resolve(true);
        });
      } catch (err) {
        return reject(err);
      }
    });
  }

  /**
   * Update a file.
   *
   * @param string path
   * @param string contents
   * @param config   Config object
   *
   * @return array|false false on failure file meta data on success
   */
  update(path, contents, config) {
  }

  /**
   * Update a file using a stream.
   *
   * @param string   path
   * @param resource resource
   * @param config   Config object
   *
   * @return array|false false on failure file meta data on success
   */
  updateStream(path, resource, config) {
  }

  /**
   * Rename a file.
   *
   * @param string path
   * @param string newpath
   *
   * @return bool
   */
  rename(path, newpath) {
  }

  /**
   * Copy a file.
   *
   * @param string path
   * @param string newpath
   *
   * @return bool
   */
  copy(path, newpath) {
  }

  /**
   * Delete a file.
   *
   * @param string path
   *
   * @return bool
   */
  delete(path) {
    return new Promise((resolve, reject) => {
      if (path === '') return reject('You must specify a path');
      try {
        this.client.deleteFile(path, (err) => {
          if (err) return reject(err);
          return resolve(true);
        });
      } catch (err) {
        return reject(err);
      }
    });
  }

  /**
   * Delete a directory.
   *
   * @param string dirname
   *
   * @return bool
   */
  deleteDir(dirname) {
    return new Promise((resolve, reject) => {
      if (dirname === '') return reject('You must specify a dirname');

      const prefix = `${dirname}`;
      this.client.list({ prefix }, (err, data) => {
        if (err) return reject(err);

        // file need to delete list
        const list = _.map(data.Contents, 'Key');

        this.client.deleteMultiple(list, (deleteError) => {
          if (deleteError) return reject(err);
          return resolve(true);
        });
      });
    });
  }

  /**
   * Create a directory.
   *
   * @param string dirname directory name
   * @param config
   *
   * @return array|false
   */
  createDir(dirname, config) {
  }

  /**
   * Set the visibility for a file.
   *
   * @param string path
   * @param string visibility
   *
   * @return array|false file meta data
   */
  setVisibility(path, visibility) {
  }
}

module.exports = AwsS3Adapter;
