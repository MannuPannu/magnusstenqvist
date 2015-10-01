define(['app'], function(app) {
	
	//Directives
	app.directive('postArchive',  function() {
	
		var linkFunction = function(scope, element, attributes) {
	
			scope.showAll = true;
			scope.tree = {
					
			};
	
			scope.moment = window.moment;
	
			scope.$watch('postlist', function(){
	
				var tree = [];
	
				_.each(scope.postlist, function(post) {
	
					var currentYear = moment(post.dateText).year().toString();
					var currentMonth = moment(post.dateText).format("MMMM");
	
					//if year is defined
					if(_.some(tree, function(e) { return e.year === currentYear })){
	
						//Get year tree (tree from level 2 and down) 
						var yearTree = _.find(tree, function(e) {
							return e.year === currentYear;
						});
	
						//Check if month exist as child of year
						if(_.some(yearTree.months, function(e) { return e.month === currentMonth })){
	
							var monthTree = _.find(yearTree.months, function(e) {
								return e.month === currentMonth;
							});
	
							monthTree.posts.push(post);
						}
						else{ 
							createMonthTree(yearTree);
						}
					}
					else {
						createYearTree(post);
					}
	
					function createYearTree(post) {
						tree.push({
							year: currentYear,
							months: [{
								month: currentMonth, posts: [post], show: true
							}],
							show: true 
						});
					}
	
					function createMonthTree(yearTree) {
						yearTree.months.push( {
							month: currentMonth, 
							posts: [post],
							show: true
						});
					}
	
					});
	
				scope.tree = tree;
			});
	
	
			scope.toggleShowAll = function() {
				scope.showAll = !scope.showAll;
	
				for(var i = 0; i < scope.tree.length; i++){
					var e = scope.tree[i];		
					e.show = scope.showAll;
					for(var j = 0; j < e.months.length; j++){
						var month = e.months[j];
							month.show = scope.showAll;
					}
				}
			};
		};
	
		return {
			restrict: 'E',
			templateUrl: 'app/templates/postarchive.html',
			transclude: true,
			link: linkFunction,
			scope: {
				postlist: '=postlist'
			}
		};
	});
	
	return app;
});