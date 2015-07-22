define(['angular', 'navbarController', 'blogController', 'aboutController', 'angularUiRouter', 'textAngular', 'underscore', 'notification', 'validation', 'validationRule', 'blogItemController'], 
		function(angular, navbarController, blogController, aboutController, angularUiRouter, textAngular, underscore, notification, validation, validationRule, blogItemController) {

var underscore = angular.module('underscore', []);
underscore.factory('_', function() {
	  return window._; //Underscore must already be loaded on the page
});


var app = angular.module('manneApp', ['ui.router', 'hljs', 'ngSanitize', 'textAngular', 'underscore', 'ui-notification',
	'validation', 'validation.rule', 'ngDisqus']);

		app.config(['$stateProvider','$urlRouterProvider', 'NotificationProvider', '$validationProvider', '$urlMatcherFactoryProvider', '$locationProvider', '$disqusProvider', function($stateProvider, $urlRouterProvider, NotificationProvider, $validationProvider, $urlMatcherFactoryProvider, $locationProvider, $disqusProvider) {

			 $locationProvider.html5Mode(false).hashPrefix("!");

			 //Set up disqus
			 $disqusProvider.setShortname('magnusstenqvist');

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
					url: "/blog?:filterByTag",
					templateUrl: "app/views/partials/blog.html",
					controller: ['$scope', '$http', '$state', '_', 'Notification', '$validation', '$stateParams', blogController],
					resolve: {
						LoadItems: function($http, $stateParams){
							if(typeof ($stateParams.filterByTag) === 'undefined' || $stateParams.filterByTag === '') {
								return $http.get('/api/blogentries', {cache: true}).success(function (blogEntries) {
									$stateParams.blogEntries = blogEntries;
								});
							} else {
											
								return $http({
										   method: 'GET',
										   url: '/api/blogentriesbytag',
										   params: {
												tag: $stateParams.filterByTag
										   }
										}).success(function (blogEntries) {
											$stateParams.blogEntries = blogEntries;
										});
								
							}
						},
						LoadTags: function($http, $stateParams){

							//Todo: Switch below code for a api/gettags which returns all tags from db using some query
							return $http.get('/api/blogentries', {cache: true}).success(function (blogEntries) {
								var tags = [];
								//Populate tags
								_.each(blogEntries, function(blogEntry) {

									if(blogEntry.tagText && blogEntry.tagText !== ""){
										//Check so it does not exist already in tag list
										if(!_.contains(tags, blogEntry.tagText)){
											 tags.push(blogEntry.tagText);
										}
									}
								});

								$stateParams.tags = tags;	
							});
						}
					},
					params: {
						filterByTag:"" 
					}
				})
				.state('main.blog.createpost', {
					url: "/createpost",
					templateUrl: "app/views/partials/blog/createpost.html",
				})
				.state('main.blog.itemlist', {
					url: "/itemlist",
					templateUrl: "app/views/partials/blog/itemlist.html",
					params: {
						foobar: "boo"
					}
				})
				.state('main.blog.itemdetail', {
					url: "/itemdetail/{dateUrl:item}/{headerUrl:item}", 
					templateUrl: "app/views/partials/blog/itemdetail.html",
					resolve: {
						GetItem: function($http, $stateParams) {

						function toPermaLink(url){
							return url.toLowerCase().replace(/ö/g, 'o').replace(/ä|å/g, 'a').replace(/\s/g, '-').replace(/[^a-zA-Z0-9-:/]/g, '');
						};
						var dateUrl = $stateParams.dateUrl;
						var headerUrl = $stateParams.headerUrl; 

						var permaLink = toPermaLink(decodeURI(dateUrl)) + '/' + toPermaLink(decodeURI(headerUrl));
						return $http({
							method: 'GET',
							url: '/api/getblogentrybylink',
							params:{
								url: permaLink 	}
						}).success(function(data){
							$stateParams.blogEntry = data;		
							$stateParams.error = false;
						}).error(function() {
							$stateParams.error = true;
						});

						}
								
					},
					controller: ['$scope', '$stateParams', '$http', blogItemController]
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

				scope.showAll = true;
				scope.tree = {
						
				};

				scope.moment = window.moment;

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


				scope.toggleShowAll = function() {
					scope.showAll = !scope.showAll;

					for(var i = 0; i < scope.tree.length; i++){
						var e = scope.tree[i];		
						e.show = scope.showAll;
						for(var j = 0; j < e.months.length; j++){
							var month = e.months[j];
							 month.show = scope.showAll;
						}
					}
				};
			};

			return {
				restrict: 'E',
				templateUrl: 'app/templates/postarchive.html',
				transclude: true,
				link: linkFunction,
				scope: {
					postlist: '=postlist'
				}
			};
		});

		app.controller('navbarController', ['$scope', '$location', '$http', navbarController]);

		return app;
});
