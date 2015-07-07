define(['angular', 'navbarController', 'blogController', 'angularUiRouter', 'textAngular'], 
		function(angular, navbarController, blogController, angularUiRouter, textAngular) {

var app = angular.module('manneApp', ['ui.router', 'hljs', 'ngSanitize', 'textAngular']);

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
					controller: ['$scope', '$http', '$state', blogController]
				})
				.state('main.blog.createpost', {
					url: "/createpost",
					templateUrl: "app/views/partials/blog/createpost.html",
					controller: ['$scope', '$http', '$state', blogController]
				})
				.state('main.blog.itemlist', {
					url: "/itemlist",
					templateUrl: "app/views/partials/blog/itemlist.html",
					controller: ['$scope', '$http', '$state', blogController]
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
