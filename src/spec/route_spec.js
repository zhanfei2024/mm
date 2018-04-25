process.env.NODE_ENV = 'test';
require('../../bootstrap/GlobalInit');

const Mocha = require('mocha');
const coMocha = require('co-mocha');
coMocha(Mocha);

const fs = require('fs');
const path = require('path');
const _ = require('lodash');

// Instantiate a Mocha instance.
const mocha = new Mocha({
  bail: true,
  timeout: 100000,
});
const routeSpecDir = `${__dirname}/route_spec`;
const runAllSpec = 1;
const specList = ['user_route_spec.js'];
const coreSpecList = ['core_route_spec.js'];
mocha.addFile(path.join(routeSpecDir, 'core_route_spec.js'));

// Add each .js file to the mocha instance
fs.readdirSync(routeSpecDir).filter(file => file.substr(-3) === '.js').forEach((file) => {
  if (_.indexOf(coreSpecList, file) === -1 && (runAllSpec || _.indexOf(specList, file) !== -1)) {
    mocha.addFile(path.join(routeSpecDir, file));
  }
});

mocha.run((failures) => {
  process.on('start', () => {
  });
  process.on('exit', () => {
    process.exit(failures);
  });
  process.exit(failures);
});
