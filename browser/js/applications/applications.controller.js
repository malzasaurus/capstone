app.controller('AppCtrl', function($scope, allBugs){
	// $scope.appid = 1;  
	$scope.bugList = allBugs;

	//this should populate dynamically using an http request

});

app.controller('AllAppsCtrl', function($scope, allApps){
	$scope.allApps = allApps;
});