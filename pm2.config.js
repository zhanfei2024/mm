

const watch = ['src/config', 'src/helpers', 'src/jobs', 'src/methods', 'src/routes', 'src/middlewares', 'src/models', 'src/notifications', 'src/views'];

module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps: [
    {
      "watch": watch,
      ignore_watch: ['src/langs/production/*'],
      name: 'api',
      script: 'bin/www.js',
      "instances": "max",
      "exec_mode": "cluster",
      "max_memory_restart" : "200M"
    },
    {
      "watch": watch,
      ignore_watch: ['src/langs/production/*'],
      name: 'queue',
      script: 'bin/queue.js',
      "max_memory_restart" : "200M"
    },
    // {
    //   name: 'worker',
    //   script: 'bin/worker.js',
    // },
  ],
};
