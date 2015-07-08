define("blogController", [],function () {
		
		var blogController = function ($scope, $http, $state, _) {

			$scope.blogEntries = $scope.blogEntries || [];

			//Placeholder for entry currently edited
			$scope.blogEntryEdited = {
				headerText: "",
				contentText: "",
				dateText: ""		
			};

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
				$scope.blogEntryEdited.dateText = "2020-12-01"; //TODO: Create date using date.js
				 $http.post('/api/createblogentry', $scope.blogEntryEdited).success(function() {

					//Check if blogentry is new, then add it to list
					if(!$scope.blogEntryEdited._id) {
							
						 $scope.blogEntries.push({
							 headerText: $scope.blogEntryEdited.headerText,
							 contentText: $scope.blogEntryEdited.contentText,
							 dateText: $scope.blogEntryEdited.dateText
						 });
					}

				 	 $state.go("main.blog.itemlist");
				 });
			};

			$scope.editPost = function(blogEntry) {
				$scope.blogEntryEdited = blogEntry;

				$state.go("main.blog.createpost");
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

