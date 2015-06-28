'use strict';

module.exports = {
    env: 'production',
    mongo: {
        uri: process.env.CUSTOMCONNSTR_MONGOLAB_URI ||
            process.env.MONGOHQ_URL ||
            'mongodb://localhost/ordosprod',
        options: {
            server: {
                auto_reconnect: true,
                socketOptions: {
                    connectTimeoutMS: 3600000,
                    keepAlive: 3600000,
                    socketTimeoutMS: 3600000
                }
            }
        }
    }
};