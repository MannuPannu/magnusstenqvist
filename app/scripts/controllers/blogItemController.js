define("blogItemController", [], function() {

	var blogItemController = function($scope, $stateParams, GetItem) {
		$scope.entryNotFoundMsg = "Blog post not found!";

		$scope.blogEntry = $stateParams.blogEntry; 

	};

	return blogItemController;
});
