app.config(function ($stateProvider) {
    $stateProvider.state('guide', {
        url: '/guide',
        templateUrl: 'js/guide/guide.html',
        controller: 'GuideCtrl'
    });
});

app.controller('GuideCtrl', function($scope, $window){
  $window.scrollTo(0,0);
});