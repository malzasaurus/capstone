app.config(function($stateProvider) {
    $stateProvider.state('bug-details', {
        url: '/applications/:appId/bugs/:bugId',
        controller: 'DetailsCtrl',
        templateUrl: '/js/bug-details/bug-details.html',
        resolve: {
            bugDetails: function(DetailsFactory, $stateParams) {
                var appId = $stateParams.appId;
                var bugId = $stateParams.bugId;
                return DetailsFactory.getDetails(appId, bugId);
            },
            // allUsers : function(AppFactory, $stateParams) {
            //     return AppFactory.fetchAllUsers();
            // }
        }
    })
})

app.factory('DetailsFactory', function($http) {
    var DetailsFactory = {}

    DetailsFactory.getDetails = function(appId, bugId) {
        return $http.get('/api/applications/'+ appId + '/bugs/' + bugId)
            .then(function(response) {
                return response.data
            })
    }

    return DetailsFactory
})

app.controller('DetailsCtrl', function($scope, bugDetails) {

    $scope.bugDetails = bugDetails;
    $scope.priorities = [{name: "blocker"}, {name: "critical"}, {name: "major"}, {name: "minor"}, {name: "trivial"}]
    $scope.statuses = [{name: "new"}, {name: "in-progress"}, {name: "resolved"}]
    // $scope.assignments = allUsers;

})
