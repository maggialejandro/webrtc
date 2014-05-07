'use strict';

module.exports = {
  env: 'production',
  port: process.env.OPENSHIFT_NODEJS_PORT ||
    process.env.PORT ||
    8080,
  ip: process.env.OPENSHIFT_NODEJS_IP ||
    process.env.IP ||
    '0.0.0.0'
};
