app.config(function($stateProvider) {
    $stateProvider.state('github', {
        url: '/github/',
        controller: 'GithubCtrl',
        templateUrl: '/js/github/github.html',
        resolve: {
            allRepos: function(GithubFactory) {
                return GithubFactory.getAllRepos();
            }
        }
    });
});

app.factory('GithubFactory', function($http) {
    return {
        getAllRepos: function() {
            return $http.get('/api/github')
                .then(function(response) {
                    return response.data;
                });
        }
    };
});

app.controller('GithubCtrl', function($scope, allRepos) {
   $scope.allRepos = allRepos;
});
