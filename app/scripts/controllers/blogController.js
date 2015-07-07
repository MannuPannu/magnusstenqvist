define("blogController", [],function () {
		
		var blogController = function ($scope, $http, $state) {

			$scope.message = "Welcome to my new web site!";
			$scope.blogEntries = [];

			$scope.postHtml = "";

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

				$http.post('/api/createblogentry', {headerText: $scope.postHeader,
					contentText: $scope.postHtml, dateText: "2025-02-03"}).success(function() {
					$state.transitionTo("main.blog.itemlist");
					$scope.populateItemList();
				});
			};

			$scope.deletePost = function() {
				if(confirm("Are you sure you want to delete this post? It cannot be undone")){
					console.log("Deleted!");		
				}
			};
		}
	
		return blogController;
	}
);

