app.factory('AppFactory', function($http){
	return {
		fetchAllBugs: function(appID){	
			return $http.get('api/applications/'+ appID+ '/bugs')
			.then(function(bugs){
				return bugs.data;
			});
		},
		fetchAllApps: function(){
			return $http.get('api/applications')
			.then(function(apps){
				console.log('this is what my apps look like: ', apps.data)
				return apps.data;
			});
		},
		createApp : function(app){
    		return $http.post('/api/applications', app);
		}	
	};
});