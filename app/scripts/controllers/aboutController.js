define("aboutController", [],function () {
		
	var aboutController = function ($scope, $http, $state, _) {

		$http.get('/loggedin').success(function(user) {
			$scope.user  = user;		
		});

		$scope.aboutText = "I like to program!";
	};

	return aboutController;
});
