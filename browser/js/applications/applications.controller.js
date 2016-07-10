app.controller('AppCtrl', function($scope, $log, allBugs, allApps, appData, AppFactory, userData) {
    $scope.bugList = allBugs;
    $scope.allApps = allApps;
    $scope.appData = appData;
    $scope.userData = userData;
    $scope.colFilter;
    $scope.dynamicPieStatus = false;
    $scope.dynamicColStatus = false;
    
    // $scope.dynamicPieToggle = function(){
    //     $scope.dynamicPieStatus = true;
    // };
    // $scope.dynamicColToggle = function(){
    //     $scope.dynamicColStatus = true;
    // };
    
    $scope.currentAdmin = function(){
        return $scope.userData[0].appAccess.accessLevel === 'admin';
    };
    $scope.currentApp = function(app) {
        return app.id === $scope.appData.id;
    };


////dynamic charts functionality
    // $scope.applyChartFilter = function(){
    //     $scope.colFilter = $scope.colFilter;
    //     filteredDynamicList = $scope.dynamicFilter(allBugs, 'status', $scope.colFilter);
    //     console.log('the filter is: ', $scope.colFilter);
    //     console.log('the filtered list is: ', filteredDynamicList);    
    // };

    // $scope.createColChart = function(){
    //     $scope.dynamicColStatus = true;
    //         var colChartTitle = 'default col chart';
    //         var xTitle;
    //         var colCategories;
    //         var colData = [];
    //         var filteredDynamicList = allBugs;
    //         function dynamicColumn(title, property, data){
    //             colChartTitle = title;
    //             xTitle = 'Count of ' + property;
    //             var propertyObj = {};
    //             for (var i = 0; i < data.length; i++) {
    //                 if (!propertyObj[data[i][property]]) {
    //                     propertyObj[data[i][property]] = 1;
    //                 } else {
    //                     propertyObj[data[i][property]]++;
    //                 }
    //             }
    //             colCategories = Object.keys(propertyObj);
    //             for(var key in propertyObj){
    //                 colData.push(propertyObj[key]);
    //             }
    //         }
    //         //calls dynamic column chart to populate necessary data
    //         dynamicColumn('dynamic column title', 'cookieEnabled', filteredDynamicList);

    //         $('#dynamic-col-chart').highcharts({
    //             chart: {
    //                 type: 'column'
    //             },
    //             title: {
    //                 text: colChartTitle
    //             },
    //             xAxis: {
    //                 categories: colCategories,
    //                 crosshair: true
    //             },
    //             yAxis: {
    //                 min: 0,
    //                 title: {
    //                     text: "Number of Bugs"
    //                 }
    //             },
    //             tooltip: {
    //                 headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
    //                 pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
    //                     '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
    //                 footerFormat: '</table>',
    //                 shared: true,
    //                 useHTML: true
    //             },
    //             plotOptions: {
    //                 column: {
    //                     pointPadding: 0.2,
    //                     borderWidth: 0
    //                 }
    //             },
    //             series: [{
    //                 name: xTitle,
    //                 data: colData

    //             }]

    //         });
    // };

    // $scope.createPieChart = function(){
    //         $scope.dynamicPieStatus = true;
    //         var pieChartTitle = 'default pie chart';
    //         var chartData = [];
    //         var filteredDynamicList = allBugs;
    //         function dynamicPie(title, property, data){
    //             pieChartTitle = title;
    //             var propertyCount = {};
    //             for (var i = 0; i < data.length; i++) {
    //                 if (!propertyCount[data[i][property]]) {
    //                     propertyCount[data[i][property]] = 1;
    //                 } else {
    //                     propertyCount[data[i][property]]++;
    //                 }
    //             }
    //             for (var key in propertyCount) {
    //                 if (propertyCount.hasOwnProperty(key)) {
    //                     var tempArray = [key, propertyCount[key]];
    //                     chartData.push(tempArray);
    //                 }
    //             }
    //             return chartData;
    //         }

    //         dynamicPie('dynamic title', 'browserVer', filteredDynamicList);  //call pie chart function to populate necessary data
    //         $('#dynamic-pie-chart').highcharts({
    //             chart: {
    //                 type: 'pie'
    //             },
    //             title: {
    //                 text: pieChartTitle
    //             },
    //             plotOptions: {
    //                 pie: {
    //                     allowPointSelect: true,
    //                     cursor: 'pointer',
    //                     dataLabels: {
    //                         enabled: true,
    //                         format: '<b>{point.name}</b>: {point.percentage:.1f} %',
    //                         style: {
    //                             color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
    //                         }
    //                     }
    //                 }
    //             },
    //             series: [{
    //                 type: 'pie',
    //                 data: chartData
    //             }] 
    //         });
    // };

    //         $scope.dynamicFilter = function(bugsObj, property, value, not) {
    //             if(!property) { //if no filter just return original dataset
    //                 return bugsObj;
    //             }
    //             var filteredList = [];
    //             if(not){
    //                 for(var i = 0; i<bugsObj.length; i++){
    //                     if (bugsObj[i][property] !== value) {
    //                         filteredList.push(bugsObj[i]);
    //                     } 
    //                 }
    //             } else {
    //                 for(var j = 0; j<bugsObj.length; j++){
    //                     if (bugsObj[j][property] === value) {
    //                         filteredList.push(bugsObj[j]);
    //                     } 
    //                 }
    //             }
    //             return filteredList;
    //         };

    //         var filteredDynamicList = $scope.dynamicFilter(allBugs, 'status', 'resolved');
    //         console.log('the filtered bug list is: ', filteredDynamicList);


//end of dynamic chart data



    AppFactory.fetchAllBugs(appData.id)
        .then(function(bugsData) {
            console.log('this the bugs data: ', bugsData);

            function getReportedBugDate(bugsData, interval) {
                var intervalSlice = 13;
                var intervalStr = ':00';
                if (interval === 'day') {
                    intervalSlice = 10;
                    intervalStr = '';
                }
                var assignmentName = {};
                for (var i = 0; i < bugsData.length; i++) {
                    if (!assignmentName[bugsData[i].createdAt.slice(0, intervalSlice) + intervalStr]) {
                        assignmentName[bugsData[i].createdAt.slice(0, intervalSlice) + intervalStr] = 1;
                    } else {
                        assignmentName[bugsData[i].createdAt.slice(0, intervalSlice) + intervalStr]++;
                    }
                }
                var arr = [];
                for (var key in assignmentName) {
                    if (assignmentName.hasOwnProperty(key)) {
                        var tempArray = [new Date(key) * 1, assignmentName[key]];
                        arr.push(tempArray);
                    }
                }
                function Comparator(a, b) {
                    if (a[0] < b[0]) return -1;
                    if (a[0] > b[0]) return 1;
                    return 0;
                }
                arr = arr.sort(Comparator);
                console.log('this is the data for the time chart: ', arr);
                return arr;
            }

            var dateCategories = Object.keys(getReportedBugDate(bugsData));

            function formattedCategories(dateCategories) {
                return dateCategories.forEach(function(elem) {
                    return elem.slice(0, 10);
                });
            }

            function filterBugs(obj) {
                if (obj.status !== "resolved") {
                    return true
                } else {
                    return false;
                }
            }

            var filteredBugList = bugsData.filter(filterBugs);

            // var filteredBugList = filterBugs(bugsData);
            console.log('the filtered bug list is: ', filteredBugList);

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

            var assignmentCategories = Object.keys(getPersonWorking(bugsData));

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


            //get array of assignments and filter out 'unassigned'
            function getAssignmentList(filteredBugList) {
                var assignmentList = [];
                for (var i = 0; i < filteredBugList.length; i++) {
                    if ((assignmentList.indexOf(filteredBugList[i].assignment) < 0) && (filteredBugList[i].assignment !== 'unassigned')) {
                        assignmentList.push(filteredBugList[i].assignment);
                    }
                }
                return assignmentList;
            }

            //get difficulty weight per person
            function dataPerPerson(filteredBugList, difficulty) {
                var assignmentList = getAssignmentList(filteredBugList);
                var difficultyArray = [];
                for (var i = 0; i < assignmentList.length; i++) {
                    var diffCount = 0;
                    for (var j = 0; j < filteredBugList.length; j++) {
                        if ((assignmentList[i] === filteredBugList[j].assignment) && (filteredBugList[j].difficulty === difficulty)) {
                            diffCount++
                        }
                    }
                    var diffWeight = diffCount * difficulty
                    difficultyArray.push(diffWeight)
                }
                return difficultyArray
            }

            function bugAgeCategories(listOfBugs, priorityLvl) {
                var ageArray = [0, 0, 0, 0];
                var currentTime = new Date() * 1;
                var oneDay = 1000 * 60 * 60 * 24;
                for (var i = 0; i < listOfBugs.length; i++) { //loop through each bug in listOfBugs
                    if (listOfBugs[i].priority === priorityLvl) { //if the priority property ====  priorityLvl
                        var createdTime = new Date(listOfBugs[i].createdAt) * 1;
                        var age = currentTime - createdTime;
                        //categorize age and push to appropirate index in ageArray
                        if (age <= oneDay * 2) {
                            ageArray[0]++;
                        }
                        if (age > oneDay * 2 && age <= oneDay * 5) {
                            ageArray[1]++;
                        }
                        if (age > oneDay * 5 && age <= oneDay * 10) {
                            ageArray[2]++;
                        }
                        if (age > oneDay * 10) {
                            ageArray[3]++;
                        }
                    }
                }
                return ageArray;
            }

            $('#line-chart').highcharts({
                chart: {
                    type: 'line',
                    height: 400
                },
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
                chart: {
                    type: 'bar'
                },
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
                chart: {
                    type: 'pie'
                    // height: 400,
                    // width: 400
                },
                title: {
                    text: 'Assignment Breakdown'
                },
                plotOptions: {
                    pie: {
                        size: 150,
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            distance: 0,
                            enabled: true,
                            format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                            style: {
                                color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black',
                                fontSize:'6px'
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
                        day: "%A, %b %e, %Y"
                    },
                    labels: {
                        rotation: -45,
                        style: {
                            fontSize: '13px',
                            fontFamily: 'Verdana, sans-serif'
                        }
                    },
                    title: {
                        text: 'Date',
                        style: {
                            fontWeight: 'bold',
                            fontSize: '15px'
                        }
                    },
                    min: new Date() - 1000 * 60 * 60 * 24 * 8
                },
                yAxis: {
                    title: {
                        text: 'Number of Bugs',
                        style: {
                            fontWeight: 'bold',
                            fontSize: '15px'
                        }
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
                chart: {
                    type: 'pie',

                    // height: 400,
                    // width: 400
                },
                title: {
                    text: 'Priority Breakdown'
                },
                plotOptions: {
                    pie: {
                        size: 150,
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            distance: 2,
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
                chart: {
                    type: 'pie'
                },
                title: {
                    text: 'Path Breakdown'
                },
                plotOptions: {
                    pie: {
                        size: 150,
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            distance: 2,
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
                chart: {
                    type: 'pie'
                },
                title: {
                    text: 'Bug Status'
                },
                plotOptions: {
                    pie: {
                        size: 150,
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            distance: 0,
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

            //stacked bar/column for workload
            $('#workload-chart').highcharts({
                chart: {
                    type: 'column',
                    spacingTop: 15,
                    marginTop: 90
                },
                title: {
                    text: 'Assignment & Difficulty',
                },
                xAxis: {
                    title: {
                        text: 'Developer Assigned',
                        style: {
                            fontWeight: 'bold',
                            fontSize: '15px'
                        }
                    },
                    categories: getAssignmentList(filteredBugList),
                    labels: {
                        style: {
                            fontSize: '13px'
                        }
                    }
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'Difficulty Weight',
                        style: {
                            fontWeight: 'bold',
                            fontSize: '15px'
                        }
                    },
                    stackLabels: {
                        enabled: true,
                        style: {
                            fontWeight: 'bold',
                            color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                        }
                    }
                },
                legend: {
                    align: 'right',
                    x: -30,
                    verticalAlign: 'top',
                    y: 25,
                    floating: true,
                    backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
                    borderColor: '#CCC',
                    borderWidth: 1,
                    shadow: false
                },
                tooltip: {
                    pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
                    shared: true
                },
                plotOptions: {
                    column: {
                        //stacking percent at the moment, can be set to normal
                        stacking: 'normal',
                        dataLabels: {
                            enabled: false,
                            color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white',
                            style: {
                                textShadow: '0 0 3px black'
                            }
                        }
                    }
                },
                // colors: ['#27DBC3', '#DB273F', '#99DB27', '#6927DB', '#F2D218'],
                series: [{
                    name: 'Difficulty 1',
                    data: dataPerPerson(filteredBugList, 1)
                }, {
                    name: 'Difficulty 2',
                    data: dataPerPerson(filteredBugList, 2)
                }, {
                    name: 'Difficulty 3',
                    data: dataPerPerson(filteredBugList, 3)
                }, {
                    name: 'Difficulty 4',
                    data: dataPerPerson(filteredBugList, 4)
                }, {
                    name: 'Difficulty 5',
                    data: dataPerPerson(filteredBugList, 5)
                }]
            });

            $('#col-chart-age').highcharts({
                chart: {
                    type: 'column',
                    spacingTop: 15,
                    marginTop: 90
                },
                title: {
                    text: 'Age of Bugs',
                },
                xAxis: {
                    title: {
                        text: 'Age of Bug',
                        style: {
                            fontWeight: 'bold',
                            fontSize: '15px'
                        }
                    },
                    categories: ['< 2 Days', '2-5 Days', '6-10 Days', '> 10 Days'],
                    labels: {
                        style: {
                            fontSize: '13px'
                        }
                    }
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'Number of Bugs',
                        style: {
                            fontWeight: 'bold',
                            fontSize: '15px'
                        }
                    },
                    stackLabels: {
                        enabled: true,
                        style: {
                            fontWeight: 'bold',
                            color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                        }
                    }
                },
                legend: {
                    align: 'right',
                    x: -30,
                    verticalAlign: 'top',
                    y: 25,
                    floating: true,
                    backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
                    borderColor: '#CCC',
                    borderWidth: 1,
                    shadow: false
                },
                tooltip: {
                    pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
                    shared: true
                },
                plotOptions: {
                    column: {
                        stacking: 'normal',
                        dataLabels: {
                            distance:0,
                            enabled: false,
                            color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white',
                            style: {
                                textShadow: '0 0 3px black'
                            }
                        }
                    }
                },
                series: [{
                    name: 'Blocker',
                    data: bugAgeCategories(filteredBugList, 'blocker')
                }, {
                    name: 'Critical',
                    data: bugAgeCategories(filteredBugList, 'critical')
                }, {
                    name: 'Major',
                    data: bugAgeCategories(filteredBugList, 'major')
                }, {
                    name: 'Minor',
                    data: bugAgeCategories(filteredBugList, 'minor')
                }, {
                    name: 'Trivial',
                    data: bugAgeCategories(filteredBugList, 'trivial')
                }]
            });


            // $('#dynamic-col-chart').highcharts({
            //     chart: {
            //         type: 'column'
            //     },
            //     title: {
            //         text: colChartTitle
            //     },
            //     xAxis: {
            //         categories: colCategories,
            //         crosshair: true
            //     },
            //     yAxis: {
            //         min: 0,
            //         title: {
            //             text: "Number of Bugs"
            //         }
            //     },
            //     tooltip: {
            //         headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            //         pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            //             '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
            //         footerFormat: '</table>',
            //         shared: true,
            //         useHTML: true
            //     },
            //     plotOptions: {
            //         column: {
            //             pointPadding: 0.2,
            //             borderWidth: 0
            //         }
            //     },
            //     series: [{
            //         name: xTitle,
            //         data: colData

            //     }]

            // });

            // $('#dynamic-pie-chart').highcharts({
            //     chart: {
            //         type: 'pie'
            //     },
            //     title: {
            //         text: pieChartTitle
            //     },
            //     plotOptions: {
            //         pie: {
            //             size: 150,
            //             allowPointSelect: true,
            //             cursor: 'pointer',
            //             dataLabels: {
            //                 enabled: true,
            //                 format: '<b>{point.name}</b>: {point.percentage:.1f} %',
            //                 style: {
            //                     color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
            //                 }
            //             }
            //         }
            //     },
            //     series: [{
            //         type: 'pie',
            //         data: chartData
            //     }] 
            // });
        })
        .catch(function(err) {
            console.error(err);
        });
});

app.controller('AllAppsCtrl', function($scope, allApps, AppFactory) {
    $scope.allApps = allApps;
    $scope.appId;
    console.log($scope.appId)
        // $scope.currentApp = function(appId) {
        //     console.log(appId)
        //     return app.id

    //     // AppFactory.fetchAllBugs(app.id)
    //      // console.log(AppFactory.fetchAllBugs(app.id))
    // //     //  .then(function(foundBugs){
    // //     // console.log("bugs", foundBugs)
    // //     // return foundBugs.length
    // // })
    // };

});

app.controller('UsersCtrl', function($scope, allUsers, appData, AppFactory, allApps) {
    $scope.allUsers = allUsers;
    $scope.appData = appData;
    $scope.allApps = allApps;
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