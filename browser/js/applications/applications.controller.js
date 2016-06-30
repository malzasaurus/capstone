app.controller('AppCtrl', function($scope, $log, allBugs, allApps, appData, AppFactory) {
    $scope.bugList = allBugs;
    $scope.allApps = allApps;
    $scope.appData = appData;
    $scope.currentApp = function(app) {
        return app.id === $scope.appData.id;
    };

    AppFactory.fetchAllBugs(appData.id)
        .then(function(bugsData) {

            function getPersonWorking(bugsData) {
                var assignmentName = {};
                for (var i = 0; i < bugsData.length; i++) {
                    if (!assignmentName[bugsData[i].assignment]) {
                        assignmentName[bugsData[i].assignment] = 1;
                    } else {
                        assignmentName[bugsData[i].assignment]++;
                    }
                }

                var arr = [];
                for (var key in assignmentName) {
                    if (assignmentName.hasOwnProperty(key)) {
                        var tempArray = [key, assignmentName[key]];
                        arr.push(tempArray);
                    }
                }
                return arr;
            }

            function filterBugs(obj) {
                if (obj.status !== "resolved") {
                    return true
                } else {
                    return false;
                }
            }
            var filteredBugList = bugsData.filter(filterBugs)

            //get buglist array of individual bug arrays with status and count
            function getStatusCounts(filteredBugList) {
                var statusCount = {};
                for (var i = 0; i < filteredBugList.length; i++) {
                    if (!statusCount[filteredBugList[i].status]) {
                        statusCount[filteredBugList[i].status] = 1;
                    } else {
                        statusCount[filteredBugList[i].status]++;   
                    }
                }

                var finalArray = [];
                for (var key in statusCount) {
                    if (statusCount.hasOwnProperty(key)) {
                        var tempArray = [key, statusCount[key]];
                        finalArray.push(tempArray)
                    }
                }
                return finalArray;
            }

            $log.warn("getStatusCounts is: ", getStatusCounts(filteredBugList));

            $log.warn("getPersonWorking is: ", getPersonWorking(bugsData));

            var assignmentCategories = Object.keys(getPersonWorking(bugsData));
            $log.warn("assignmentCategories is type: ", Array.isArray(assignmentCategories));

            var assignmentCount = function(bugsData) {
                var countArray = [];
                for (var key in getPersonWorking(bugsData)) {
                    countArray.push(getPersonWorking(bugsData)[key]);
                }
                return countArray;
            };

            $log.warn("assignmentCount is: ", assignmentCount(bugsData));
            $log.warn("assignmentCount type: ", typeof assignmentCount(bugsData)[1]);

            $('#line-chart').highcharts({
                title: {
                    text: 'Line Chart'
                },
                xAxis: {
                    categories: []
                },
                series: [{
                    data: bugsData.map(function(obj) {
                        return obj.id;
                    })
                }]
            });

            $('#bar-chart').highcharts({
                title: {
                    text: 'Bar Chart'
                },
                xAxis: {
                    categories: ['Nichole', 'Danielle', 'Ashley', 'Mallory']
                },
                series: [{
                    type: 'bar',
                    data: bugsData.map(function(obj) {
                        return obj.id;
                    })
                }]
            });

            $('#pie-chart').highcharts({
                title: {
                    text: 'Pie Chart'
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: true,
                            format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                            style: {
                                color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                            }
                        }
                    }
                },
                yAxis: {
                    labels: {
                        enabled: true
                    },
                    categories: assignmentCategories
                },
                series: [{
                    type: 'pie',
                    data: getPersonWorking(bugsData)
                }]
            });

            //pie-chart for bug status
            $('#pie-bug-stats').highcharts({
                title: {
                    text: 'Bug Status'
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: true,
                            format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                            style: {
                                color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                            }
                        }
                    }
                },
                series: [{
                    type: 'pie',
                    data: getStatusCounts(filteredBugList)
                }]
            });
        })
        .catch(function(err) {
            console.error(err);
        });
});

app.controller('AllAppsCtrl', function($scope, allApps) {
    $scope.allApps = allApps;
});

app.controller('UsersCtrl', function($scope, allUsers, appData, AppFactory) {
    $scope.allUsers = allUsers;
    $scope.appData = appData;
    $scope.invite = function(userObj) {
        AppFactory.inviteUser(appData.id, userObj)
            .then(function(response) {
                response.status === 201 ? $scope.inviteStatus = true : $scope.inviteStatus = false;
            });
    };
    $scope.updateUser = function(userObj) {
        AppFactory.updateUser(appData.id, userObj)
            .then(function(response) {
                response.status === 201 ? $scope.updateStatus = true : $scope.updateStatus = false;
            });
    };
    $scope.removeUser = function(userObj) {
        var userIndex = $scope.allUsers.indexOf(userObj);
        AppFactory.removeUser(appData.id, userObj.id)
            .then(function(response) {
                $scope.allUsers.splice(userIndex, 1);
            });
    };
});
