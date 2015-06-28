define("blogController", [],function () {
		
		var blogController = function ($scope, $http) {
			$scope.message = "Welcome to my new web site!";
			$scope.blogEntries = [];

			$http.get('/api/blogentries', {cache: true}).success(function (blogEntries) {
				$scope.blogEntries = blogEntries;
			});
		}
	
		return blogController;
	}
);

