const filesystemConfig = require('../../config/filesystem');
const FilesystemManager = require('./lib/FilesystemManager');

const storage = new FilesystemManager(filesystemConfig);

module.exports = storage;
