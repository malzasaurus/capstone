app.controller('AppCtrl', function($scope, allBugs){
	$scope.appid = 1;  //make this dynamic
	$scope.bugList = allBugs;

});