app.config(function ($stateProvider) {
    $stateProvider.state('signup', {
        url: '/signup',
        templateUrl: 'js/signup/signup.html',
        controller: 'SignupCtrl'
    });

});

app.controller('SignupCtrl', function ($scope, $state, SignupFactory, AuthService) {
    $scope.signup = {};
    $scope.error = null;
    $scope.sendSignup = function (signupInfo) {
        console.log(signupInfo)
        SignupFactory.createUser(signupInfo)
        .then(function(){
            AuthService.login(signupInfo)
            .then(function () {
            $state.go('allApps')
             })
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