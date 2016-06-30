app.factory('AboutFactory', function($http) {
    return {
        // 'http://localhost:1337/api/applications/' + $scope.appId + '/bugs';
        requestData: function(appID) {
            // change the 1 to appID when we're ready to grab it dynamically
            return $http.get('api/applications/' + 1 + '/bugs')
                .then(function(bugs) {
                    console.log("bugs.data looks like: ", bugs.data);
                    return bugs.data;
                });
        }
    };
});
