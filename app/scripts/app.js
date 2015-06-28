define(['angular', 'navbarController', 'blogController', 'angularUiRouter'], 
		function(angular, navbarController, blogController, angularUiRouter) {

var app = angular.module('manneApp', ['ui.router', 'hljs', 'ngSanitize']);

		app.config(['$stateProvider','$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

			$urlRouterProvider.otherwise("/main/blog");

			//Set up the states
			$stateProvider
				.state('main', {
					url: '/main',
					templateUrl: "app/views/main.html"
				})
				.state('main.blog', {
					url: "/blog",
					templateUrl: "app/views/partials/blog.html",
					controller: ['$scope', '$http', blogController]
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
