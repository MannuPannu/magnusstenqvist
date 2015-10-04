define(['app', 'blogController', 'blogItemController', 'aboutController'], function(app, blogController, blogItemController, aboutController) {
	
	//Set up the states
	app.config(['$stateProvider','$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
		$stateProvider
			.state('main', {
				url: '/main',
				templateUrl: "app/views/main.html"
			})
			.state('main.blog', {
				url: "/blog?:filterByTag",
				templateUrl: "app/views/partials/blog.html",
				controller: ['$scope', '$http', '$state', '_', 'Notification', '$validation', '$stateParams','$cookies', blogController],
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
			
			$urlRouterProvider.otherwise("/main/blog/itemlist");
	}]);
	
	return app;
});