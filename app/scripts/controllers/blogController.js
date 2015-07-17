define("blogController", [],function () {
		
		var blogController = function ($scope, $http, $state, _, Notification, $validationProvider) {
			$scope.blogEntries = $scope.blogEntries || [];

			$scope.tags = [];
			$scope.newTagText = "";
			$scope.editingPost = false;

			$scope.mangeTest = "foo";

			$http.get('/loggedin').success(function(user) {
				$scope.user  = user;		
			});

			$scope.populateItemList = function() {
				$http.get('/api/blogentries', {cache: true}).success(function (blogEntries) {
					$scope.blogEntries = blogEntries;
					$scope.populateTags();
				});
			};

			$scope.populateTags = function() {

				$scope.tags = [];
				//Populate tags
				_.each($scope.blogEntries, function(blogEntry) {

					if(blogEntry.tagText && blogEntry.tagText !== ""){
						//Check so it does not exist already in tag list
						if(!_.contains($scope.tags, blogEntry.tagText)){
							 $scope.tags.push(blogEntry.tagText);
						}
					}
				});

				if($scope.tags.length > 0) {
					$scope.tagText = $scope.tags[0];		
				}
			};

			$scope.populateItemList();

			$scope.openCreatePostView = function() {
				
				//Placeholder for entry currently edited
				$scope.blogEntryEdited = {
					headerText: "",
					contentText: "",
					dateText: moment().format("YYYY-MM-DD HH:mm"),
					tagText: ""
				};

				$scope.editingPost = false;

				$scope.populateTags();
				$scope.newTagText = "";
				$scope.tagText = "";

				$state.transitionTo("main.blog.createpost");
			};

			$scope.cancelCreatePost = function() {
				$state.transitionTo("main.blog.itemlist");		
			};

			$scope.createPost = function(form) {

				var isFormValid = false;

				$validationProvider.validate(form)
					.success(function() {

						$scope.blogEntryEdited.tagText = $scope.newTagText !== '' ? $scope.newTagText : $scope.tagText;

						 $http.post('/api/createblogentry', $scope.blogEntryEdited).success(function() {

							//Check if blogentry is new, then add it to list
							if(!$scope.blogEntryEdited._id) {
									
								 $scope.blogEntries.push({
									 headerText: $scope.blogEntryEdited.headerText,
									 contentText: $scope.blogEntryEdited.contentText,
									 dateText: $scope.blogEntryEdited.dateText,
									 tagText: $scope.tagText !== '' ? $scope.tagText : $scope.newTagText 
								 });

								 //Sort the posts
								$scope.blogEntries = _.sortBy($scope.blogEntries, function(e) {
									return -(new Date(e.dateText));		
								});
							}

							Notification.success({
								message: 
									$scope.editingPost ? 'Blog post updated' : 'Blog post created', delay: 2000
							});

							 $state.go("main.blog.itemlist");
						 });
					})
					.error(function(msg) {

						Notification.error({
							message: 
							'Form not filled in correctly', delay: 2000
						});
					});
			};

			$scope.editPost = function(blogEntry) {
				$scope.blogEntryEdited = blogEntry;
				$scope.tagText = blogEntry.tagText;

				$scope.editingPost = true;
				$state.go("main.blog.createpost");
			};

			$scope.deletePost = function(blogEntry) {
				if(confirm("Are you sure you want to delete this post? It cannot be undone")){
					$http.post('/api/deleteblogentry', blogEntry).success(function() {

						$scope.blogEntries = _.reject($scope.blogEntries, function(e) {
							return e._id === blogEntry._id;
						});

						Notification.error({
							message: 
							'Post deleted', delay: 2000
						});

						$state.go("main.blog.itemlist");
					});
				}
			};

			$scope.filterByTag = function(tag) {

				if(tag) {
					$http({
						method: 'GET',
						url: '/api/blogentriesbytag',
						params: {
							tag: tag
						}
					}).success(function (blogEntries) {
						$scope.blogEntries = blogEntries;
					});
				}
				else {
					$scope.populateItemList();	
				}
			};

			$scope.convertText = function(date) {
				return moment(date).format("dddd Do MMMM YYYY HH:mm");		
			};
		};
	
		return blogController;
});

