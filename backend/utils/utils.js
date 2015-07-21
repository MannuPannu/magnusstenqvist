module.exports.createPermaLink = function(blogEntry) {

	//Create perma link for blog entry
	return blogEntry.dateText.replace(/\s/g, '-') + '/' 
			+ blogEntry.headerText.toLowerCase().replace(/ö/g, 'o').replace(/ä|å/g, 'a').replace(/\s/g, '-').replace(/[^a-zA-Z0-9-]/g, '');

}
