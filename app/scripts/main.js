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
		underscore: '../../bower_components/underscore/underscore-min',
		textAngular: '../../bower_components/textAngular/dist/textAngular.min',
		textAngularSanitize: '../../bower_components/textAngular/dist/textAngular-sanitize.min',
		notification: '../../bower_components/angular-ui-notification/dist/angular-ui-notification.min',
		blogController: 'controllers/blogController',
		navbarController: 'controllers/navbarController',
		aboutController: 'controllers/aboutController'
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
		},
		'textAngularSanitize': {
			deps: ['angular'],
			exports: 'textAngularSanitize'
		},
		'notification' : {
			deps: ['angular']
		},
		// textAngularRangy: {
		// 	deps: ['angular']
		// },
		'textAngular': {
			deps: ['angular', /*'textAngularRangy'*/, 'textAngularSanitize'],
			exports: 'textAngular'
		}
	},
	priority: ["angular"]

});

require(['angular','jquery', 'bootstrapJs','ngSanitize', 'angularHighlightjs', 'underscore', 'notification',
	//	'angularMoment',/*'textAngularRangy',*/
		'app'], function (angular) {

			angular.element(document.getElementsByTagName('html')[0]);
			angular.element().ready(function() {

				// bootstrap the app manually
				angular.bootstrap(document, ['manneApp']);
			});
		}
);
