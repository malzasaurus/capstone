app.config(function ($stateProvider) {
    $stateProvider.state('applications', {
        url: '/applications/:appID',
        templateUrl: 'js/applications/applications.html',
        controller: 'AppCtrl', 
        resolve: {
        	allBugs: function(AppFactory, $stateParams){
        		var appID = $stateParams.appID;
				return AppFactory.fetchAllBugs(appID);
        	}
        }
    });
});

