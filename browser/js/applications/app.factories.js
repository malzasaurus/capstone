app.factory('AppFactory', function($http) {
    return {
        fetchAllBugs: function(appID) {
            return $http.get('api/applications/' + appID + '/bugs')
                .then(function(bugs) {
                    return bugs.data;
                });
        },
        fetchAllApps: function() {
            return $http.get('api/applications')
                .then(function(apps) {
                    console.log('this is what my apps look like: ', apps.data);
                    return apps.data;
                });
        },
        fetchAllUsers: function(appID) {
            return $http.get('api/applications/' + appID + '/users')
                .then(function(users) {
                    return users.data;
                });
        },
        fetchCurrentApp: function(appID) {
            return $http.get('api/applications/' + appID)
                .then(function(appData) {
                    console.log('the current app data is: ', appData);
                    return appData.data;
                });
        },
        fetchUserData: function(appID){
             return $http.get('/api/applications/' + appID + '/user')
             .then(function(user){
                return user.data;
             });
        },
        inviteUser: function(appID, userObj) {
            return $http.post('/api/applications/' + appID + '/users', userObj);
        },
        updateUser: function(appID, userObj) {
            return $http.put('/api/applications/' + appID + '/users', userObj);
        },
        removeUser: function(appID, userID) {
            return $http.delete('/api/applications/' + appID + '/users/' + userID);
        },
        createApp: function(app) {
            return $http.post('/api/applications', app);
        }
    };
});
