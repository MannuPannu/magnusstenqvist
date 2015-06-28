'use strict';

var path = require('path');

var rootPath = path.normalize(__dirname + '/../../..');

module.exports = {
    root: rootPath,
    port: process.env.OPENSHIFT_NODEJS_PORT || 1337,
    mongo: {
        options: {
            db: {
                safe: true
            }
        }
    }
};
