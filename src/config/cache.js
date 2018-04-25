
let Config = {};

/**
 |--------------------------------------------------------------------------
 | Default Cache Driver
 |--------------------------------------------------------------------------
 |
 | Supported: "sync", "redis"
 |
 */
Config.default = process.env.CACHE_DRIVER || 'redis';

/**
 |--------------------------------------------------------------------------
 | Cache Connections
 |--------------------------------------------------------------------------
 |
 */
Config.connections = {
  redis: {
    prefix: process.env.CACHE_REDIS_PREFIX || 'cache',
    host: process.env.CACHE_REDIS_HOST || '127.0.0.1',
    port: process.env.CACHE_REDIS_PORT || 6379,
  },
  mongo: {
    prefix: process.env.CACHE_MONGO_PREFIX || 'cache',
    host: process.env.CACHE_MONGO_HOST || '127.0.0.1',
    port: process.env.CACHE_MONGO_PORT || 27017,
  }
};

module.exports = Config;
