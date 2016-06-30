// app.config(function ($stateProvider) {

//     // Register our *about* state.
//     $stateProvider.state('about', {
//         url: '/about',
//         controller: 'AboutController',
//         templateUrl: 'js/about/about.html'
//     });

// });

// app.controller('AboutController', function ($scope, FullstackPics) {

//     // Images of beautiful Fullstack people.
//     $scope.images = _.shuffle(FullstackPics);

// });

app.config(function($stateProvider) {

    // Register our *about* state.
    $stateProvider.state('about', {
        url: '/about',
        controller: 'AboutController',
        templateUrl: 'js/about/about.html'
    });

});

app.controller('AboutController', function($scope, $log, FullstackPics, AboutFactory) {

    AboutFactory.requestData()
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
        })
        .catch(function(err) {
            console.error(err);
        });
});
