'use strict'

var mongoose = require('mongoose');

var BlogEntry = mongoose.model('BlogEntry');

var User = mongoose.model('User');

User.find({}).remove(function() {
	User.create({
			username: 'manne',
			password: 'poo'
	});
});

//Populate db with some dummy data
BlogEntry.find({}).remove(function() {
	
	BlogEntry.create({
		headerText: 'First go with passportjs fur alles sehr gut',
		dateText: '2015-04-13',
		contentText: 'Starting to add passportjs via this excellent <a href="http://mherman.org/blog/2015/01/31/local-authentication-with-passport-and-express-4/#.VSvnEhOUd9h">tutorial.</a>'		
	});

	BlogEntry.create({
		headerText: 'Added mongodb to my angular app',
		dateText: '2015-04-06',
		contentText: 'Today I added mongodb to my angular app, using mongoose. I implemented routes (api) which I then could call from an angular controller'		
	});

	BlogEntry.create({
		headerText: 'Test data',
		dateText: 'test',
		contentText: 'Some content'		
	});
});

