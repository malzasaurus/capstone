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
            // updateBugInfo: function(DetailsFactory, $stateParams) {
            //     var appId = $stateParams.appId;
            //     var bugId = $stateParams.bugId;
            //     return DetailsFactory.updateBug(appId, bugId, updates);
            // },
            allUsers : function(AppFactory, $stateParams) {
                var appId = $stateParams.appId;
                return AppFactory.fetchAllUsers(appId);
            }
        }
    })
})

app.factory('DetailsFactory', function($http, $stateParams) {
    return {
        getDetails: function(appId, bugId) {
            return $http.get('/api/applications/'+ appId + '/bugs/' + bugId)
            .then(function(response) {
                return response.data
            })
        },       
        updateBug: function(appId, bugId, updates) {
            var appId = $stateParams.appId;
            var bugId = $stateParams.bugId;
            return $http.put('/api/applications/'+ appId + '/bugs/' + bugId, updates)
            .then(function(response) {
                return response.data
            })
        }
    }
})

app.controller('DetailsCtrl', function($scope, bugDetails, allUsers, DetailsFactory) {

    $scope.bugDetails = bugDetails;
    $scope.priorities = [{name: "blocker"}, {name: "critical"}, {name: "major"}, {name: "minor"}, {name: "trivial"}]
    $scope.statuses = [{name: "new"}, {name: "in-progress"}, {name: "resolved"}]
    $scope.assignments = allUsers;
    $scope.difficulties = [{name: 1}, {name: 2}, {name: 3}, {name: 4}, {name: 5}]
    $scope.update = function(selectedPriority, selectedAssignment, selectedStatus, selectedDifficulty){ 
        var updates = {
            priority: selectedPriority,
            assignment: selectedAssignment,
            status: selectedStatus,
            difficulty: selectedDifficulty
        }
        DetailsFactory.updateBug(null, null, updates)
        .then(function(updatedBug){
            window.location.reload();
        })
    }

})
