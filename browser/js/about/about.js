app.config(function($stateProvider) {

    // Register our *about* state.
    $stateProvider.state('about', {
        url: '/about',
        controller: 'AboutController',
        templateUrl: 'js/about/about.html'
    });

});

app.controller('AboutController', function($scope, $log, $http, $routeParams, $location, FullstackPics, AboutFactory) {

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
                //return assignmentName;

                
                var arr = [];
                for (var key in assignmentName) {
                    if (assignmentName.hasOwnProperty(key)) {
                        var tempArray = [key, assignmentName[key]];
                        arr.push(tempArray);
                    }
                }
                //console.log("arrrrrrrr you gonna work? ", arr);
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
                        // console.log("obj.id looks like: ", obj.id);
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
                        // console.log("obj.id looks like: ", obj.id);
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
                    //[

                        // ['Firefox', 45],
                        // ['IE', 26.8],
                        // ['Safari', 8.5],
                        // ['Opera', 6.2],
                        // ['Others', 0.7]
                    //],
                    //data: assignmentCount(bugsData)
                    // data: [
                    //     {
                    //         name: weGotTheNames(),
                    //         y: weGotTheNamesValues()
                    //     }, {
                    //         name: "Danielle", 
                    //         y: 4                          
                    //     },
                    //     { 
                    //         name: "Ashley", 
                    //         y: 2 
                    //     }
                    // ]
                }]
            });
        })
        .catch(function(err) {
            console.error(err);
        });


});
// app.directive('chartData', function() {
//     return {
//         restrict: 'E',
//         template: '<div></div>',
//         scope: {
//             options: '='
//         },
//         link: function(scope, element) {
//             // console.log("chartOptions is: ", scope.chartOptions);
//             console.log("element[0] looks like: ", element[0]);
//             console.log("scope.options looks like: ", scope.options);
//             Highcharts.chart(element[0], scope.options);
//         }
//     };
// });
