app.factory('SignupFactory', function($http) {
    
    return {
        createUser: function(signupInfo) {
            return $http.post('/api/users/', signupInfo)
                .then(function(user) {
                    return user.data
            })
        }
    }
});
