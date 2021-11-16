const CONF = require('./wdio.conf');
const _ = require('lodash');

const overrides = {
	specs: ['./tests.wdio/specs/example.e2e.js'],
};

exports.config = _.defaultsDeep(overrides, CONF);
