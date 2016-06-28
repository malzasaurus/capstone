app.controller('AppCtrl', function($scope, allBugs, allApps){
	$scope.bugList = allBugs;
	$scope.allApps = allApps;
});

app.controller('AllAppsCtrl', function($scope, allApps){
	$scope.allApps = allApps;
});