define(['angular', 'navbarController', 'blogController', 'aboutController', 'angularUiRouter', 'textAngular', 'underscore', 'notification', 'validation', 'validationRule'], 
		function(angular, navbarController, blogController, aboutController, angularUiRouter, textAngular, underscore, notification, validation, validationRule) {

var underscore = angular.module('underscore', []);
underscore.factory('_', function() {
	  return window._; //Underscore must already be loaded on the page
});

var app = angular.module('manneApp', ['ui.router', 'hljs', 'ngSanitize', 'textAngular', 'underscore', 'ui-notification',
	'validation', 'validation.rule']);

		app.config(['$stateProvider','$urlRouterProvider', 'NotificationProvider', '$validationProvider', function($stateProvider, $urlRouterProvider, NotificationProvider, $validationProvider) {

			NotificationProvider.setOptions({
				positionX: 'left',
				positionY: 'bottom'
			});

			$validationProvider.setErrorHTML(function(msg) {
				return "<span class='errorMessage'>" + msg + "</span>";
			});

			$validationProvider.showSuccessMessage = false;

			$urlRouterProvider.otherwise("/main/blog/itemlist");

			//Set up the states
			$stateProvider
				.state('main', {
					url: '/main',
					templateUrl: "app/views/main.html"
				})
				.state('main.blog', {
					url: "/blog",
					templateUrl: "app/views/partials/blog.html",
					controller: ['$scope', '$http', '$state', '_', 'Notification', '$validation', blogController]
				})
				.state('main.blog.createpost', {
					url: "/createpost",
					templateUrl: "app/views/partials/blog/createpost.html",
				})
				.state('main.blog.itemlist', {
					url: "/itemlist",
					templateUrl: "app/views/partials/blog/itemlist.html",
				})
				.state('main.games', {
					url: "/games",
					templateUrl: "app/views/partials/games.html"
				})
				.state('main.about', {
					url: "/about",
					templateUrl: "app/views/partials/about.html",
					controller: ['$scope', '$http', '$state', '_', aboutController]
				})
				.state('main.login', {
						url: "/login",
					templateUrl: "app/views/partials/login.html"
				})
				.state('main.register', {
						url: "/register",
					templateUrl: "app/views/partials/register.html"
				});
		}]);

	   app.config(['hljsServiceProvider', function(hljsServiceProvider) {
			hljsServiceProvider.setOptions({
				tabReplace: '   '
			});
		}]);

		app.controller('navbarController', ['$scope', '$location', '$http', navbarController]);

		return app;
});
