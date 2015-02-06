'use strict';

Poemy.controller("MyCtrl1", function ($scope, UtilSrvc) {
    $scope.aVariable = 'anExampleValueWithinScope';
    $scope.valueFromService = UtilSrvc.helloWorld("Amy");
});

Poemy.controller("HomeCtrl", function ($scope, $http) {

  $http.get('/api/random_poem')
    .success(function(data, status, headers, config) {
       $scope.poem = data;
    })
    .error(function(data, status, headers, config) {
      alert(data);
    })
});

Poemy.controller("UsersCtrl", function ($scope, $http) {
  $http.get('/api/users')
    .success(function(data, status, headers, config) {
      $scope.users = data;
    })
    .error(function(data, status, headers, config) {
      alert(data);
    });
});

Poemy.controller("LoginCtrl", function ($scope, $http) {
});

Poemy.controller("SignupCtrl", function ($scope, $http) {



  $scope.postUser = function () {

    $scope.success = '';
    $scope.error = '';

    $http.post('/signup', $scope.user)
      .success(function(data, status, headers, config) {
        $scope.success = 'your account was succesfully made!';
      })
      .error(function(data, status, headers, config) {
        $scope.error = data;
      });

    $scope.user = '';
  };

});

// you may add more controllers below
