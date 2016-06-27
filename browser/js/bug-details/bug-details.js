app.config(function($stateProvider) {
    $stateProvider.state('bug-details', {
        url: '/bugs/:id',
        controller: 'DetailsCtrl',
        templateUrl: '/js/bug-details/bug-details.html',
        resolve: {
            bugDetails: function(DetailsFactory, $stateParams) {
                return DetailsFactory.getDetails($stateParams.id);
            }
        }
    })
})

app.factory('DetailsFactory', function($http) {
    var DetailsFactory = {}

    DetailsFactory.getDetails = function(id) {
        return $http.get('/api/bugs/' + id)
            .then(function(response) {
                return response.data
            })
    }

    return DetailsFactory
})

app.controller('DetailsCtrl', function($scope, bugDetails) {

    $scope.bugDetails = bugDetails;

})
