app.controller('AppCtrl', function($scope, allBugs){
	$scope.appid = 1;  
	$scope.bugList = allBugs;
	$scope.allApps = [{id: 1, name: 'App A'}, {id: 2, name: 'App B'}, {id: 3, name: 'App C'}];
	//this should populate dynamically using an http request

});