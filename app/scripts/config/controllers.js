define(['app', 'navbarController'], function(app, navbarController) {
	
	app.controller('navbarController', ['$scope', '$location', '$http', navbarController]);
	
	return app;
});