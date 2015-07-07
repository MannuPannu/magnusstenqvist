define("blogController", [],function () {
		
		var blogController = function ($scope, $http, $state) {

			$scope.message = "Welcome to my new web site!";
			$scope.blogEntries = [];
			$scope.showList = true;

			$http.get('/loggedin').success(function(user) {
				$scope.user  = user;		
			});

			$http.get('/api/blogentries', {cache: true}).success(function (blogEntries) {
				$scope.blogEntries = blogEntries;
			});

			$scope.createPost = function() {
				$state.transitionTo("main.blog.createpost");
				$showList = false;
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

