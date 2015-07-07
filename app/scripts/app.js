define(['angular', 'navbarController', 'blogController', 'angularUiRouter', 'textAngular', 'underscore'], 
		function(angular, navbarController, blogController, angularUiRouter, textAngular, underscore) {

var underscore = angular.module('underscore', []);
underscore.factory('_', function() {
	  return window._; //Underscore must already be loaded on the page
});

var app = angular.module('manneApp', ['ui.router', 'hljs', 'ngSanitize', 'textAngular', 'underscore']);

		app.config(['$stateProvider','$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

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
					controller: ['$scope', '$http', '$state', '_', blogController]
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
					templateUrl: "app/views/partials/about.html"
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
