var moment = require ("moment");

module.exports.createPermaLink = function(blogEntry) {

	//Create perma link for blog entry
	return moment(blogEntry.dateText).format("YYYY-MM-DD").replace(/\s/g, '-') + '/' 
			+ blogEntry.headerText.toLowerCase().replace(/ö/g, 'o').replace(/ä|å/g, 'a').replace(/\s/g, '-').replace(/[^a-zA-Z0-9-]/g, '');

}
