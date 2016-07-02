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
             allApps: function(AppFactory){
                return AppFactory.fetchAllApps();
            },
            // updateBugInfo: function(DetailsFactory, $stateParams) {
            //     var appId = $stateParams.appId;
            //     var bugId = $stateParams.bugId;
            //     return DetailsFactory.updateBug(appId, bugId, updates);
            // },
            allUsers: function(AppFactory, $stateParams) {
                var appId = $stateParams.appId;
                return AppFactory.fetchAllUsers(appId);
            },
            allBugs: function(AppFactory, $stateParams) {
                var appID = $stateParams.appId;
                return AppFactory.fetchAllBugs(appID);
            },
            appData: function(AppFactory, $stateParams){
                var appID = $stateParams.appId;
                return AppFactory.fetchCurrentApp(appID);
            }
        }
    })
})

app.factory('DetailsFactory', function($http, $stateParams) {
    return {
        getDetails: function(appId, bugId) {
            return $http.get('/api/applications/' + appId + '/bugs/' + bugId)
                .then(function(response) {
                    return response.data
                })
        },
        updateBug: function(appId, bugId, updates) {
            var appId = $stateParams.appId;
            var bugId = $stateParams.bugId;
            return $http.put('/api/applications/' + appId + '/bugs/' + bugId, updates)
                .then(function(response) {
                    return response.data
                })
        }
    }
})

app.controller('DetailsCtrl', function($scope, bugDetails, allUsers, DetailsFactory, allBugs, allApps, appData) {
    $scope.allApps = allApps;
    $scope.bugList = allBugs;
    $scope.appData = appData;
    $scope.bugDetails = bugDetails;
    $scope.selectedPriority = $scope.bugDetails.priority;
    console.log(allUsers)
    var usersArr = []
    allUsers.forEach(function(el){
        usersArr.push(el.email)
    })

    $scope.selectedAssignment = $scope.bugDetails.assignment;
    $scope.selectedStatus = $scope.bugDetails.status;
    $scope.selectedDifficulty = $scope.bugDetails.difficulty;

    
    $scope.priorities = ["blocker", "critical", "major", "minor", "trivial"]
    $scope.statuses = ["new", "in-progress", "resolved"]
    $scope.assignments = usersArr;
    $scope.difficulties = [1, 2, 3, 4, 5]

    $scope.update = function(selectedPriority, selectedAssignment, selectedStatus, selectedDifficulty, devComments) {
        var updates = {
            priority: selectedPriority,
            assignment: selectedAssignment,
            status: selectedStatus,
            difficulty: selectedDifficulty,
            devComments: devComments
        }
        DetailsFactory.updateBug(null, null, updates)
            .then(function(updatedBug) {
                window.location.reload();
            })
    }

})
