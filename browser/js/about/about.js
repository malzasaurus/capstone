app.config(function($stateProvider) {

    // Register our *about* state.
    $stateProvider.state('about', {
        url: '/about',
        controller: 'AboutController',
        templateUrl: 'js/about/about.html'
    });

});

app.controller('AboutController', function($scope, $log, $http, $routeParams, $location, FullstackPics) {
 
   // $log.warn("$location.path split on slashes is: ", $location.path().split("/").unshift());
    // Images of beautiful Fullstack people.
    $scope.images = _.shuffle(FullstackPics);

    // var dataSource = 'https://real-time-web-dashboard-bsullins.c9.io/modules/5 - Working with Data/getTrendData.php?format=json';
    $scope.appId = $location.path().split("/").unshift();

    $scope.dataSource = 'http://localhost:1337/api/applications/' + $scope.appId + '/bugs';

    $http.get('http://localhost:1337/api/applications/' + appId)
    .success(function(data) {
        $scope.appId = $routeParams.appId;
    });

    function requestData() {
        $.ajax({
            url: dataSource,
            success: function(points) {

                chart.series[0].setData(
                    points,
                    true
                );

                // refresh after X miliseconds
                setTimeout(requestData, 1000);
            },
            cache: false
        });
    }

    // Testing HighCharts Data
    //     $scope.chartOptions = {

    //     chart: {
    //         renderTo: 'chart-container',
    //         type: 'bar'
    //     },
    //     title: {
    //         text: 'Sales by Sector'
    //     },
    //     xAxis: {
    //         categories: ['Tech', 'Retail', 'Services', 'Other']
    //     },
    //     yAxis: {
    //         title: {
    //             text: 'Sales in Thousands'
    //         }
    //     },
    //     series: [{
    //         name: 'Sales Overall',
    //         data: [100, 33, 58, 77]
    //     }]
    // };



});

app.directive('chartData', function() {
    return {
        restrict: 'E',
        template: '<div class="chart-container"></div>',
        scope: {
            options: '='
        },
        link: function(scope, element) {
            //console.log("element looks like: ", element, "\n", "scope.options looks like: ", scope.options);
            Highcharts.chart(element[0], scope.options);
        },
        controller: 'AboutController'

    };
});
