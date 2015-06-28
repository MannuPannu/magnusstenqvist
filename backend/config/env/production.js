'use strict';

var connection_string = '127.0.0.1:27017/YOUR_APP_NAME';
// if OPENSHIFT env variables are present, use the available connection info:
if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD){

	  connection_string = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
	    process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
	      process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
	        process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
	          process.env.OPENSHIFT_APP_NAME;

}:

module.exports = {
    env: 'production',
    mongo: {
		uri: 'mongodb://' + connection_string ,
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
