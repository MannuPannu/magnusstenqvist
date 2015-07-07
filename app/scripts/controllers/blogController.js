define("blogController", [],function () {
		
		var blogController = function ($scope, $http, $state, _) {

			$scope.blogEntries = $scope.blogEntries || [];

			$scope.message = "Welcome to my new web site!";

			$http.get('/loggedin').success(function(user) {
				$scope.user  = user;		
			});

			$scope.populateItemList = function() {
				$http.get('/api/blogentries', {cache: true}).success(function (blogEntries) {
					$scope.blogEntries = blogEntries;
				});
			};

			$scope.populateItemList();

			$scope.openCreatePostView = function() {
				$state.transitionTo("main.blog.createpost");
			};

			$scope.cancelCreatePost = function() {
				$state.transitionTo("main.blog.itemlist");		
			};

			$scope.createPost = function() {

				var blogEntry = {headerText: $scope.postHeader,
					contentText: $scope.postHtml, dateText: "2025-02-03"};

				 $http.post('/api/createblogentry', blogEntry).success(function() {
				 			
				 	 $scope.blogEntries.push(blogEntry);
				 	 $state.go("main.blog.itemlist");

				 });
			};

			$scope.deletePost = function(blogEntry) {
				if(confirm("Are you sure you want to delete this post? It cannot be undone")){
					$http.post('/api/deleteblogentry', blogEntry).success(function() {

						$scope.blogEntries = _.reject($scope.blogEntries, function(e) {
							return e._id === blogEntry._id;
						});

						$state.go("main.blog.itemlist");
					});
				}
			};
		}
	
		return blogController;
	}
);

