app.factory('AppFactory', function($http){
	return {
		fetchAllBugs: function(appID){	
			return $http.get('api/applications/'+ appID+ '/bugs')
			.then(function(bugs){
				return bugs.data;
			});
		},
		createApp : function(app){
    		return $http.post('/api/applications', app);
		}	
	};
});