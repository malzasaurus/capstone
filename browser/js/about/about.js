app.config(function($stateProvider) {

    // Register our *about* state.
    $stateProvider.state('about', {
        url: '/about',
        controller: 'AboutController',
        templateUrl: 'js/about/about.html'
    });

});

app.controller('AboutController', function($scope, $log, $http, $routeParams, $location, FullstackPics, AboutFactory) {

    // Images of beautiful Fullstack people.
    $scope.images = _.shuffle(FullstackPics);

    // $scope.appId = $location.path().split("/").unshift();
    $scope.appId = 2;
    $scope.dataSource = 'http://localhost:1337/api/applications/' + $scope.appId + '/bugs';


    AboutFactory.requestData()
        .then(function(bugsData) {
    
            $('#line-chart').highcharts({
                  title: {
                    text: 'Line Chart'
                },
                xAxis: {
                    categories: []
                },
                series: [{
                    data: bugsData.map(function(obj){
                        console.log("obj.id looks like: ", obj.id);
                        return obj.id;
                    })                        
                }]
            });

              $('#bar-chart').highcharts({
                  title: {
                    text: 'Bar Chart'
                },
                xAxis: {
                    categories: ['Apples', 'Bananas', 'Oranges']
                },
                series: [{
                    type: 'bar',
                    data: bugsData.map(function(obj){
                        console.log("obj.id looks like: ", obj.id);
                        return obj.id;
                    })
                    //[1, 2, 3]
                        
                }]
            });

                 $('#pie-chart').highcharts({
                  title: {
                    text: 'Pie Chart'
                },
                xAxis: {
                    categories: ['Apples', 'Bananas', 'Oranges']
                },
                series: [{
                    type: 'pie',
                    data: bugsData.map(function(obj){
                        console.log("obj.id looks like: ", obj.id);
                        return obj.id;
                    })                        
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
