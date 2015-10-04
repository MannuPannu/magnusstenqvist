/* Main require js config file, here we define which js files requirejs should look at */

require.config({
	baseUrl: 'app/scripts/',
	 paths: {
		 /*Vendor specific */
 	   	angular: '../../bower_components/angular/angular',
 	   	angularUiRouter: '../../bower_components/angular-ui-router/release/angular-ui-router',
        jquery: '../../bower_components/jquery/dist/jquery.min',
        bootstrapJs: '../../bower_components/bootstrap/dist/js/bootstrap.min',
        highlightjs: '../../bower_components/highlightjs/highlight.pack',
		angularHighlightjs: '../../bower_components/angular-highlightjs/angular-highlightjs.min',
		ngSanitize: '../../bower_components/angular-sanitize/angular-sanitize.min',
		underscore: '../../bower_components/underscore/underscore-min',
		textAngular: '../../bower_components/textAngular/dist/textAngular.min',
		textAngularSanitize: '../../bower_components/textAngular/dist/textAngular-sanitize.min',
		notification: '../../bower_components/angular-ui-notification/dist/angular-ui-notification.min',
		validation: '../../bower_components/angular-validation/dist/angular-validation.min',
		validationRule: '../../bower_components/angular-validation/dist/angular-validation-rule.min',
		angularDisqus: '../../bower_components/angular-disqus/angular-disqus.min',
		
		/* Controllers */
		blogController: 'controllers/blogController',
		navbarController: 'controllers/navbarController',
		aboutController: 'controllers/aboutController',
		blogItemController: 'controllers/blogItemController',
		
		/* Directories */
		postarchive: 'directives/postarchive',
		dynamichtml: 'directives/dynamichtml',
		
		/* Setup */
		routes: 'config/routes',
		misc: 'config/misc',
		controllers: 'config/controllers'
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
            deps: ['angular']
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
		'validation' : {
			deps: ['angular']
		},
		'validationRule' : {
			deps: ['angular']
		},
		'angularDisqus': {
			deps: ['angular']
		},
		'textAngular': {
			deps: ['angular', 'textAngularSanitize'],
			exports: 'textAngular'
		}
	},
	priority: ["angular"]

});

require(['angular','jquery', 'bootstrapJs','ngSanitize', 'underscore', 'notification',
		'validation', 'validationRule', 'angularDisqus', 'angularHighlightjs', 'routes', 'misc', 'controllers', 'app', 'postarchive', 'dynamichtml'], 
		
		function (angular) {
			angular.element(document.getElementsByTagName('html')[0]);
			angular.element().ready(function() {

				// bootstrap the app manually
				angular.bootstrap(document, ['manneApp']);
			});
		}
);
