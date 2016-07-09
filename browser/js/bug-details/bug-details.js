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
            allApps: function(AppFactory) {
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
            appData: function(AppFactory, $stateParams) {
                var appID = $stateParams.appId;
                return AppFactory.fetchCurrentApp(appID);
            },
            userData: function(AppFactory, $stateParams) {
                return AppFactory.fetchUserData($stateParams.appId);
            }
        }
    });
});

app.factory('DetailsFactory', function($http, $stateParams) {
    return {
        getDetails: function(appId, bugId) {
            return $http.get('/api/applications/' + appId + '/bugs/' + bugId)
                .then(function(response) {
                    return response.data;
                });
        },
        updateBug: function(appId, bugId, updates) {
            var appId = $stateParams.appId;
            var bugId = $stateParams.bugId;
            return $http.put('/api/applications/' + appId + '/bugs/' + bugId, updates)
                .then(function(response) {
                    return response.data;
                });
        },
        addGitIssue: function(appID, issueBody){
            var appId = $stateParams.appId;
            return $http.post('/api/applications/'  + appId + '/bugs/add_issue',  issueBody)
                .then(function(response) {
                    return response.data;
                });
        }
    };
});

app.controller('DetailsCtrl', function($scope, $log, bugDetails, allUsers, DetailsFactory, allBugs, allApps, appData, userData, $window) {
    $window.scrollTo(0,0)
    $scope.allApps = allApps;
    $scope.bugList = allBugs;
    $scope.appData = appData;
    $scope.bugDetails = bugDetails;
    $scope.userData = userData;
    $scope.currentAdmin = function() {
        return $scope.userData[0].appAccess.accessLevel === 'admin';
    };
    $scope.selectedPriority = $scope.bugDetails.priority;
    console.log(allUsers);
    var usersArr = [];
    allUsers.forEach(function(el) {
        usersArr.push(el.email);
    });

    $scope.selectedAssignment = $scope.bugDetails.assignment;
    $scope.selectedStatus = $scope.bugDetails.status;
    $scope.selectedDifficulty = $scope.bugDetails.difficulty;


    $scope.priorities = ["blocker", "critical", "major", "minor", "trivial"];
    $scope.statuses = ["new", "in-progress", "resolved"];
    $scope.assignments = usersArr;
    $scope.difficulties = [1, 2, 3, 4, 5];

    $scope.update = function(selectedPriority, selectedAssignment, selectedStatus, selectedDifficulty, devComments) {
        var updates = {
            priority: selectedPriority,
            assignment: selectedAssignment,
            status: selectedStatus,
            difficulty: selectedDifficulty,
            devComments: devComments
        };
        DetailsFactory.updateBug(null, null, updates)
            .then(function(updatedBug) {
                window.location.reload();
            });
    };

      $scope.addIssue = function() {
        var issueBody = {
           bugId: $scope.bugDetails.id
        };
        DetailsFactory.addGitIssue(null, issueBody)
            .then(function(createdIssue) {
                window.location.reload();
            });
    };

    // function to toggle classes on individual bug report screenshot
    $scope.class = "reported-bug-screenshot";
    $scope.enlargeImage = function() {
        $log.info("You look fabulous today.");
        if ($scope.class === "reported-bug-screenshot")
            $scope.class = "reported-bug-screenshot-expanded";
        else {
            $scope.class = "reported-bug-screenshot";
        }
    };
});
