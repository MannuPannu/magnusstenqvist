define(['angular', 'angularUiRouter', 'textAngular', 'underscore', 'notification', 'validation', 'validationRule'], 
		function(angular, angularUiRouter, textAngular, underscore, notification, validation, validationRule) {

	var underscore = angular.module('underscore', []);
	
	underscore.factory('_', function() {
		return window._; //Underscore must already be loaded on the page
	});

	var app = angular.module('manneApp', ['ui.router', 'hljs', 'ngSanitize', 'textAngular', 'underscore', 'ui-notification',
		'validation', 'validation.rule', 'ngDisqus', 'ngCookies']);

	app.config(['$urlMatcherFactoryProvider',
		function($urlMatcherFactoryProvider) {
	
			var itemType = {
				encode: function(headerText) {
					return headerText.toLowerCase().replace(/ö/g, 'o').replace(/ä|å/g, 'a').replace(/\s/g, '-').replace(/[^a-zA-Z0-9-:/]/g, '');
						},
				decode: function(value, key) {
					return headerText.toLowerCase().replace(/ö/g, 'o').replace(/ä|å/g, 'a').replace(/\s/g, '-').replace(/[^a-zA-Z0-9-:/]/g, '');
						},
				is: function(headerText) {
					return headerText.toLowerCase().replace(/ö/g, 'o').replace(/ä|å/g, 'a').replace(/\s/g, '-').replace(/[^a-zA-Z0-9-:/]/g, '');
					},
				pattern: /[^#]+/
			};
	
			$urlMatcherFactoryProvider.type('item', itemType);			
	}]);
	
	return app;
});
