define("blogItemController", [], function() {

	var blogItemController = function($scope, $stateParams) {
		$scope.blogEntry = $stateParams.blogEntry;		

		console.log($scope.blogEntry);
	};

	return blogItemController;
});
