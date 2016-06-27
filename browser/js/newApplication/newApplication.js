app.config(function ($stateProvider) {
    $stateProvider.state('newApplication', {
        url: '/newApplication',
        templateUrl: 'js/newApplication/newApplication.html',
        controller: 'NewAppCtrl'
    });

});

app.controller('NewAppCtrl', function ($scope, $state, AppFactory) {
    $scope.sendApplication = function (appInfo) {
        AppFactory.createApp(appInfo)
        .then(function(){
            $state.go('home')
        })
        .catch(function () {
            $scope.error = 'Oops, try again';
        });

        // $scope.error = null;
        // AuthService.login(signupInfo).then(function () {
        //     $state.go('home');
        // }).catch(function () {
        //     $scope.error = 'Oops, try again';
        // });
    };
});