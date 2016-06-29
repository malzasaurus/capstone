app.controller('AppCtrl', function($scope, allBugs, allApps, appData){
	$scope.bugList = allBugs;
	$scope.allApps = allApps;
	$scope.appData = appData;
});

app.controller('AllAppsCtrl', function($scope, allApps){
	$scope.allApps = allApps;
});

app.controller('UsersCtrl', function($scope, allUsers, appData, AppFactory){
	$scope.allUsers = allUsers;
	$scope.appData = appData;
	$scope.invite = function(userObj){
		AppFactory.inviteUser(appData.id, userObj)
		.then(function(response){
			response.status===201 ? $scope.inviteStatus = true : $scope.inviteStatus = false
		});
	};
	$scope.updateUser = function(userObj){
		console.log('this is the user i am updating: ', userObj);
		AppFactory.updateUser(appData.id, userObj);
	};
	$scope.removeUser = function(userObj){
		var userIndex = $scope.allUsers.indexOf(userObj);
		AppFactory.removeUser(appData.id, userObj.id)
		.then(function(response){
			$scope.allUsers.splice(userIndex,1);
		});
	};
});