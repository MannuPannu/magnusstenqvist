
define("navbarController", [], function(){
		
		var navbarController = function ($scope, $location, $http) {

			$scope.isActive = function (route) {
				return route === $location.path();
			};

			$http.get('/loggedin').success(function(user) {
				$scope.user = user;		
			});

			$scope.logout = function() {
				$http.get('logout').success(function (isLoggedOut) {
				   if (isLoggedOut) {
					   $scope.user = false;
				   } 
				});			
			};
		};

		return navbarController;

	}
);
