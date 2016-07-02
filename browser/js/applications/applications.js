app.config(function ($stateProvider) {
    $stateProvider.state('indvApp', {
        url: '/applications/:appID',
        templateUrl: 'js/applications/indvApp.html',
        controller: 'AppCtrl',
        resolve: {
        	allBugs: function(AppFactory, $stateParams){
        		var appID = $stateParams.appID;
				return AppFactory.fetchAllBugs(appID);
        	},
            allApps: function(AppFactory){
                return AppFactory.fetchAllApps();
            },
            appData: function(AppFactory, $stateParams){
                return AppFactory.fetchCurrentApp($stateParams.appID);
            },
            userData: function(AppFactory, $stateParams){
                //need accesslevel and id;
                return AppFactory.fetchUserData($stateParams.appID);
            }
        }
    });
    $stateProvider.state('appUsers', {
        url: '/applications/:appID/users',
        templateUrl: 'js/users/users.html',
        controller: 'UsersCtrl',
        resolve: {
            allUsers: function(AppFactory, $stateParams){
                var appID = $stateParams.appID;
                return AppFactory.fetchAllUsers(appID);
            },
            appData: function(AppFactory, $stateParams){
                return AppFactory.fetchCurrentApp($stateParams.appID);
            },
            allApps: function(AppFactory){
                return AppFactory.fetchAllApps();
            }
        }
    });
    $stateProvider.state('allApps', {
        url: '/applications',
        templateUrl: 'js/applications/allApps.html',
        controller: 'AllAppsCtrl',
        resolve: {
            allApps: function(AppFactory){
                return AppFactory.fetchAllApps();
            }
        }
    });
});


//can we eliminate these repetitive methods between states?
