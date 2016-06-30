app.controller('AppCtrl', function($scope, $log, allBugs, allApps, appData, AppFactory) {
    $scope.bugList = allBugs;
    $scope.allApps = allApps;
    $scope.appData = appData;
    $scope.currentApp = function(app) {
        return app.id === $scope.appData.id;
    };

    AppFactory.fetchAllBugs(appData.id)
        .then(function(bugsData) {
            console.log('this the bugs data: ', bugsData);
//area chart functions
//2016-06-29 13:09:14.53-04
            function getReportedBugDate(bugsData, interval) {
                var intervalSlice = 13;
                var intervalStr = ':00';
                if(interval === 'day'){
                    intervalSlice = 10;
                    intervalStr = '';
                }
                var assignmentName = {};
                for (var i = 0; i < bugsData.length; i++) {
                    if (!assignmentName[bugsData[i].createdAt.slice(0,intervalSlice)+intervalStr]) {
                        assignmentName[bugsData[i].createdAt.slice(0,intervalSlice)+intervalStr] = 1;
                    } else {
                        assignmentName[bugsData[i].createdAt.slice(0,intervalSlice)+intervalStr]++;
                    }
                }
                console.log('our date obj is: ', assignmentName);
                var arr = [];
                for (var key in assignmentName) {
                    if (assignmentName.hasOwnProperty(key)) {
                        var tempArray = [new Date(key)*1, assignmentName[key]];
                        arr.push(tempArray);
                    }
                }
                
                 function Comparator(a, b) {
                   if (a[0] < b[0]) return -1;
                   if (a[0] > b[0]) return 1;
                   return 0;
                 }

                 arr = arr.sort(Comparator);
                 return arr;

            }

            $log.warn("getReportedBugDate is: ", getReportedBugDate(bugsData));
            var dateCategories = Object.keys(getReportedBugDate(bugsData));
            console.log('the first date categories are :', dateCategories);
            function formattedCategories(dateCategories){
                return dateCategories.forEach(function(elem){
                    return elem.slice(0,10);
                });
            }
            console.log('the date categories are: ', formattedCategories(dateCategories))

///end of area chart functions



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

            $log.warn("getPersonWorking is: ", getPersonWorking(bugsData));

            var assignmentCategories = Object.keys(getPersonWorking(bugsData));
            $log.warn("assignmentCategories is type: ", Array.isArray(assignmentCategories));

            // var assignmentCount = function(bugsData) {
            //     var countArray = [];
            //     for (var key in getPersonWorking(bugsData)) {
            //         countArray.push(getPersonWorking(bugsData)[key]);
            //     }
            //     return countArray;
            // };

            // $log.warn("assignmentCount is: ", assignmentCount(bugsData));
            // $log.warn("assignmentCount type: ", typeof assignmentCount(bugsData)[1]);

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

            $('#spline-chart-time').highcharts({
                chart: {
                    type: 'spline'
                },
                title: {
                    text: 'Bugs per Day'
                },
                xAxis: {
                    type: 'datetime',
                    dateTimeLabelFormats: { // don't display the dummy year
                        month: '%e. %b',
                        day:"%A, %b %e, %Y"
                    },
                    title: {
                        text: 'Date'
                    },
                    min: new Date() - 1000 * 60 * 60 * 24 * 8
                },
                yAxis: {
                    title: {
                        text: 'Number of Bugs'
                    },
                    min: 0
                },
                tooltip: {
                    pointFormat: '{point.y} reported'
                },
                plotOptions: {
                    spline: {
                        marker: {
                            enabled: true
                        }
                    }
                },
                series: [{
                    name: 'Bug Tracker',
                    data: getReportedBugDate(bugsData, 'day')
                }]
            }); //end of area chart
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
