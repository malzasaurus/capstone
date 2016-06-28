app.config(function ($stateProvider) {
    $stateProvider.state('newApplication', {
        url: '/new_application',
        templateUrl: 'js/newApplication/newApplication.html',
        controller: 'NewAppCtrl'
    });

});

app.controller('NewAppCtrl', function ($scope, $state, AppFactory) {
    $scope.sendApplication = function (appInfo) {
        AppFactory.createApp(appInfo)
        .then(function(){
            $state.go('allApps')
        })
        .catch(function () {
            $scope.error = 'Oops, try again';
        });
    };
});

