const Config = {
  /*
   |--------------------------------------------------------------------------
   | Default Filesystem Disk
   |--------------------------------------------------------------------------
   |
   | Here you may specify the default filesystem disk that should be used
   | by the framework. The "local" disk, as well as a variety of cloud
   | based disks are available to your application. Just store away!
   |
   */

  default: 'local',

  /*
   |--------------------------------------------------------------------------
   | Default Cloud Filesystem Disk
   |--------------------------------------------------------------------------
   |
   | Many applications store files both locally and in the cloud. For this
   | reason, you may specify a default "cloud" driver here. This driver
   | will be bound as the Cloud disk implementation in the container.
   |
   */
  cloud: 's3',

  /*
   |--------------------------------------------------------------------------
   | Filesystem Disks
   |--------------------------------------------------------------------------
   |
   | Here you may configure as many filesystem "disks" as you wish, and you
   | may even configure multiple disks of the same driver. Defaults have
   | been setup for each driver as an example of the required options.
   |
   | Supported Drivers: "local", "s3"
   |
   */
  disk: {
    local: {
      driver: 'local',
      root: __dirname,
    },
    s3: {
      driver: 's3',
      key: process.env.AWS_S3_KEY,
      secret: process.env.AWS_S3_SECRET,
      region: process.env.AWS_S3_REGION,
      bucket: process.env.AWS_S3_BUCKET,
      endpoint: process.env.AWS_S3_ENDPOINT,
      port: process.env.AWS_S3_PORT,
    },
  },
};

module.exports = Config;

