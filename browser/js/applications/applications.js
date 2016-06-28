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

