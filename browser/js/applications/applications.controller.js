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



            function filterBugs(obj) {
                if (obj.status !== "resolved") {
                    return true
                } else {
                    return false;
                }
            }
            var filteredBugList = bugsData.filter(filterBugs)

            function getPriorityBreakdown(filteredBugList) {
                var priorityObj = {};
                for (var i = 0; i < filteredBugList.length; i++) {
                    if (!priorityObj[filteredBugList[i].priority]) {
                        priorityObj[filteredBugList[i].priority] = 1;
                    } else {
                        priorityObj[filteredBugList[i].priority]++;
                    }
                }

                var arr = [];
                for (var key in priorityObj) {
                    if (priorityObj.hasOwnProperty(key)) {
                        var tempArray = [key, priorityObj[key]];
                        arr.push(tempArray);
                    }
                }
                return arr;
            }

            function getPathBreakdown(filteredBugList) {
                var pathObj = {};
                for (var i = 0; i < filteredBugList.length; i++) {
                    if (!pathObj[filteredBugList[i].pathName]) {
                        pathObj[filteredBugList[i].pathName] = 1;
                    } else {
                        pathObj[filteredBugList[i].pathName]++;
                    }
                }

                var arr = [];
                for (var key in pathObj) {
                    if (pathObj.hasOwnProperty(key)) {
                        var tempArray = [key, pathObj[key]];
                        arr.push(tempArray);
                    }
                }
                return arr;
            }
          
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
                    text: 'Assignment Breakdown'
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
            $('#priority-pie-chart').highcharts({
                title: {
                    text: 'Priority Breakdown'
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
                    data: getPriorityBreakdown(filteredBugList)
                }]
            });


            $('#path-pie-chart').highcharts({
                title: {
                    text: 'Path Breakdown'
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
                    data: getPathBreakdown(filteredBugList)
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
