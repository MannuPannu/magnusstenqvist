'use strict';

module.exports = {
    env: 'production',
    mongo: {
		uri: 'mongodb://$OPENSHIFT_MONGODB_DB_HOST:$OPENSHIFT_MONGODB_DB_PORT/',
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
