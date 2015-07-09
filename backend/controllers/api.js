var mongoose = require('mongoose'),
	_ = require('underscore'),
	BlogEntry = mongoose.model('BlogEntry');

exports.GetBlogEntries = function(req, res) {

	return BlogEntry.find().exec(
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

			blogEntry.save(function(err) {
				if(err) return res.send(400); 		

				return res.send(200);
			})		
		}				
		else {
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
