var mongoose = require('mongoose'),
	BlogEntry = mongoose.model('BlogEntry');

exports.GetBlogEntries = function(req, res) {

	return BlogEntry.find().exec(
			function (err, items) {

				if (!err) {
					return res.json(items);

				} else {
					return res.send(err);
				}
			});
};

exports.CreateBlogEntry = function(data) {

	var blogEntry = new BlogEntry(data);	

	blogEntry.save(function(err) {
	 	if(err) return err;
	 });
};

