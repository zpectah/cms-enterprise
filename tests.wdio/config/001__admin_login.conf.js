const CONF = require('./wdio.conf');
const _ = require('lodash');

const overrides = {
	specs: ['./tests.wdio/specs/001__admin_login.e2e.js'],
};

exports.config = _.defaultsDeep(overrides, CONF);
