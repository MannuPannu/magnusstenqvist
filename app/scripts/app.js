define(['angular', 'navbarController', 'blogController', 'aboutController', 'angularUiRouter', 'textAngular', 'underscore', 'notification', 'validation', 'validationRule', 'blogItemController'], 
		function(angular, navbarController, blogController, aboutController, angularUiRouter, textAngular, underscore, notification, validation, validationRule, blogItemController) {

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
				.state('main.blog.itemdetail', {
					url: "/itemdetail/:date/:header",
					templateUrl: "app/views/partials/blog/itemdetail.html",
					controller: ['$scope', '$stateParams', blogItemController],
					params: {
						blogEntry: null	
					}
				})
				.state('main.blog.itemdetailwithcomment', {
					url: "/itemdetail/:date/:header/:reply",
					templateUrl: "app/views/partials/blog/itemdetail.html",
					controller: ['$scope', '$stateParams', blogItemController],
					params: {
						blogEntry: null	
					}
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

		//Directives
		app.directive('postArchive',  function() {

			var linkFunction = function(scope, element, attributes) {

				scope.tree = {
						
				};

				scope.$watch('postlist', function(){

					var tree = [];

					_.each(scope.postlist, function(post) {

						var currentYear = moment(post.dateText).year().toString();
						var currentMonth = moment(post.dateText).format("MMMM");

						//if year is defined
						if(_.some(tree, function(e) { return e.year === currentYear })){

							//Get year tree (tree from level 2 and down) 
							var yearTree = _.find(tree, function(e) {
								return e.year === currentYear;
							});

							//Check if month exist as child of year
							if(_.some(yearTree.months, function(e) { return e.month === currentMonth })){

								var monthTree = _.find(yearTree.months, function(e) {
									return e.month === currentMonth;
								});

								monthTree.posts.push(post);
							}
							else{ 
								createMonthTree(yearTree);
							}
						}
						else {
							createYearTree(post);
						}

						function createYearTree(post) {
							tree.push({
								year: currentYear,
								months: [{
									month: currentMonth, posts: [post], show: true
								}],
								show: true 
							});
						}

						function createMonthTree(yearTree) {
							yearTree.months.push( {
								month: currentMonth, 
								posts: [post],
								show: true
							});
						}

					 });

					scope.tree = tree;
				});
			};

			return {
				restrict: 'E',
				templateUrl: 'app/templates/postarchive.html',
				transclude: true,
				link: linkFunction,
				scope: {
					postlist: '=postlist',
					onClickPost: '&onClickPost'
				}
			};
		});

		app.controller('navbarController', ['$scope', '$location', '$http', navbarController]);

		return app;
});
