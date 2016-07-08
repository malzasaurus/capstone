app.config(function($stateProvider) {
    $stateProvider.state('github', {
        url: '/applications/:appID/github/',
        controller: 'GithubCtrl',
        templateUrl: '/js/github/github.html',
        resolve: {
            allRepos: function(GithubFactory, $stateParams) {
                return GithubFactory.getAllRepos($stateParams.appID);
            },
             appData: function(AppFactory, $stateParams){
                return AppFactory.fetchCurrentApp($stateParams.appID);
            },
        }
    });
});

app.factory('GithubFactory', function($http) {
    return {
        getAllRepos: function(appID) {
            return $http.get('/api/applications/' + appID + '/github')
                .then(function(response) {
                    return response.data;
                });
        },
        addRepoId: function(appID, repoIdObj){
            return $http.put('/api/applications/'  + appID,  repoIdObj)
                .then(function(response) {
                    return response.data;
                });
        }
    };
});

app.controller('GithubCtrl', function($scope, allRepos, GithubFactory, appData, $state) {
   $scope.allRepos = allRepos;
   $scope.addRepo =  function(repoIdObj) {
        var repoObj = {repoId: repoIdObj.name }
        GithubFactory.addRepoId(appData.id, repoObj)
        .then(function(response){
            $scope.repoStatus = true;
        })
   }
});

