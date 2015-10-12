var mongoose = require('mongoose'),
	_ = require('underscore'),
	BlogEntry = mongoose.model('BlogEntry'),
	utils = require('../utils/utils');

exports.GetBlogEntries = function(req, res) {

	return BlogEntry.find().exec(
			function (err, items) {

				if (!err) {
				 	//Sort them	by date
					items = _.sortBy(items, function(e) {
						return -(new Date(e.dateText));
					});

					//Only send a preview of the content
				    _.each(items, function(e) {
						console.log(e.contentText);
						if(e.contentText) {
							e.contentText = e.contentText.substring(0, 700);
						}
					});
					
					return res.json(items);

				} else {
					return res.send(err);
				}
			});
};

exports.GetBlogEntryByLink = function(req, res) {
	return BlogEntry.find({permaLink: req.query.url}).exec(
			function(err, items) {
				if(items.length > 0){
					return res.json(items[0]);

				}
				else {
					return res.send(400);	
				}
			});
};

exports.GetBlogEntriesByTag = function(req, res, tag) {

	return BlogEntry.find({tagText: tag}).exec(
			function (err, items) {

				if (!err) {
				 	//Sort them	by date
					items = _.sortBy(items, function(e) {
						return -(new Date(e.dateText));
					});
					return res.json(items);

				} else {
					return res.send(err);
				}
			});
};

exports.GetBlogEntriesById = function(req, res, id) {

	return BlogEntry.find({'_id': { $in: [id]}}).exec(
			function (err, items) {

				if (!err) {
				 	//Sort them	by date
					items = _.sortBy(items, function(e) {
						return -(new Date(e.dateText));
					});

					return res.json(items);

				} else {
					return res.send(err);
				}
			});
};
exports.CreateOrUpdateBlogEntry = function(req, res) {

	var entry = req.body;

	BlogEntry.findById(entry._id, function(err, blogEntry) {

		if(err) return res.send(400);
			
		if(blogEntry) { //Existing entry in db
			blogEntry.headerText = entry.headerText;
			blogEntry.contentText = entry.contentText;
			blogEntry.dateText = entry.dateText;
			blogEntry.tagText = entry.tagText

			blogEntry.permaLink = utils.createPermaLink(blogEntry);

			blogEntry.save(function(err) {
				if(err){
					return res.send(400); 		
				}	
				return res.send(200);
			})		
		}				
		else {
			entry.permaLink = utils.createPermaLink(entry);

			var blogEntry = new BlogEntry(entry);
			blogEntry.save(function(err) {

				if(err) return res.send(400);

				return res.json(blogEntry);
			});
		}
	});
};


exports.DeleteBlogEntry = function(req, res) {

	var id = req.body._id;

	BlogEntry.findById(id, function(err, blogEntry) {
		if(blogEntry) {
			blogEntry.remove(function(err) {
				if(err) return err;
			});
		}		
	});
};
