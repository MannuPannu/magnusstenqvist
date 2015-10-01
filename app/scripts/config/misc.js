define(['app'], function(app) {
	
	app.config(['NotificationProvider', '$validationProvider', '$locationProvider', '$disqusProvider',
		function(NotificationProvider, $validationProvider, $locationProvider, $disqusProvider) {
	
			$locationProvider.html5Mode(false).hashPrefix("!");
		
			//Set up disqus
			$disqusProvider.setShortname('magnusstenqvist');
			
			NotificationProvider.setOptions({
				positionX: 'left',
				positionY: 'bottom'
			});
	
			$validationProvider.setErrorHTML(function(msg) {
				return "<span class='errorMessage'>" + msg + "</span>";
			});
	
			$validationProvider.showSuccessMessage = false;			
		}]);
		
	app.config(['hljsServiceProvider', function(hljsServiceProvider) {
		hljsServiceProvider.setOptions({
			tabReplace: '   '
		});
	}]);
			
	return app;
});