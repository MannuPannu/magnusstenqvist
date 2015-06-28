require.config({
	baseUrl: 'app/scripts/',
	 paths: {
 	   	angular: '../../bower_components/angular/angular',
 	   	angularUiRouter: '../../bower_components/angular-ui-router/release/angular-ui-router',
        jquery: '../../bower_components/jquery/dist/jquery.min',
        bootstrapJs: '../../bower_components/bootstrap/dist/js/bootstrap.min',
        angularHighlightjs: '../../bower_components/angular-highlightjs/angular-highlightjs.min',
        highlightjs: '../../bower_components/highlightjs/highlight.pack',
		ngSanitize: '../../bower_components/angular-sanitize/angular-sanitize.min',
		blogController: 'controllers/blogController',
		navbarController: 'controllers/navbarController'
	 },
	shim: {
		'angular' : {
			exports: 'angular'
		},
		'angularUiRouter' : {
			deps: ['angular']
		},
        bootstrapJs: {
            deps: ['jquery']
        },
        angularHighlightjs: {
            deps: ['angular', 'highlightjs']
        },
		'ngSanitize': {
			deps: ['angular']
		}
	},
	priority: ["angular"]

});

require(['angular','jquery', 'bootstrapJs','ngSanitize', 'angularHighlightjs',
		'app'], function (angular) {

			angular.element(document.getElementsByTagName('html')[0]);
			angular.element().ready(function() {

				// bootstrap the app manually
				angular.bootstrap(document, ['manneApp']);
			});
		}
);
