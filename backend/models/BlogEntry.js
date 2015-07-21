'use strict';

var mongoose = require('mongoose');

var BlogEntrySchema = mongoose.Schema({
		headerText: String,
		dateText: String,
		contentText: String,
		tagText: String,
		permaLink: String
});

mongoose.model('BlogEntry', BlogEntrySchema);


