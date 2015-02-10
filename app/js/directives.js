"use strict";

Poemy.directive('inputtext', function ($timeout) {
    return {
        restrict:'E',
        replace:true,
        template:'<input type="text"/>',
        scope: {
        	//if there were attributes it would be shown here
        },
        link:function (scope, element, attrs, ctrl) {
        	// DOM manipulation may happen here.
        }
    }
});

Poemy.directive('version', function(version) {
  return function(scope, elm, attrs) {
    elm.text(version);
  };
});

Poemy.directive('validChars', [function() {
  return {
    restrict : 'A',
    link: function(scope, elm, attrs) {
      elm.on('change', function (e) {
        var value = scope.user.name;
        var valid = /[0-9]+/.test(value) &&
                    /[a-z]+/.test(value) &&
                    /[A-Z]+/.test(value) &&
                    /\W+/.test(value);
        //console.log(scope.signupForm.$valid);
        //console.log(scope.signupForm.username.$invalid);
        scope.signupForm.username.$setValidity('validChars', valid );
        console.log(scope.signupForm.username.$invalid);
        //console.log(valid);
      });
    }
  }
}]);



Poemy.directive('getGravatar', function(md5,$timeout) {
  return function(scope, elm, attrs) {
    function checkAndGetGrav () {
        attrs.$observe("email", function(newValue) {
          var email = newValue;
          var tag ='';
          if ((email !== null) && (email !== undefined) && (email !== '')){
            var hash = md5.createHash(email.toLowerCase());
          }
          var src = 'https://secure.gravatar.com/avatar/' + hash + '?s=200&d=mm';
          var $newElm = $('<img src=' + src + ' id="gravatar" class="img-responsive"/>');
          var oldElm = elm.find('img#gravatar');
          oldElm.fadeOut(500, function () {
            oldElm.replaceWith($newElm);
            $newElm.fadeIn(500, function () {
            })
          });
        });
    }
    scope.$on('$viewContentLoaded', checkAndGetGrav());
  }
});

Poemy.directive('uniqueUsername', ['$http', '$q', function($http, $q) {
  return {
    require : 'ngModel',
    link : function(scope, elm, attrs, ngModel) {
      ngModel.$asyncValidators.usernameAvailable = function(modelValue, viewValue) {
        var value = viewValue || modelValue;
        var defer = $q.defer();
        $http.get('/api/username-exists/' + value)
          .success(function(data) {
            var valid = Boolean(data);
            if (valid == true) {
              defer.reject('exists');
            } else {
              defer.resolve();
            }
          })
          .error(function(data) {
            defer.reject('broke');
          });
        return defer.promise;
      };
    }
  }
}]);

Poemy.directive('uniqueEmail', function($http) {
  return {
    require : 'ngModel',
    link : function(scope, elm, attrs, ctrl) {
      elm.on('change', function (e) {
        var username = elm.val();
        var valid = false;
        if (( username !== undefined) && ( username!== null) && ( username !== '')) {
        $http.get('/api/email-exists/' + username)
          .success(function(data, status, headers, config) {
            valid = Boolean(data);
            console.log('email unique?: ' + data);
            scope.signupForm.email.$setValidity('unique', valid);
          })
          .error( function(data, status, headers, config) {
            console.log(data);
            scope.signupForm.email.$setValidity('unique', false);
          });
        }
      });
    }
  }
});

Poemy.directive('compareTo', function() {
    return {
        require: "ngModel",
        scope: {
            otherModelValue: "=compareTo"
        },
        link: function(scope, element, attributes, ngModel) {

            console.log(ngModel.$valid);

            ngModel.$validators.compareTo = function(modelValue) {
                var validity = (modelValue !== scope.otherModelValue);
                console.log('passwords_match?: ' + validity);
                return validity;
            };
            scope.$watch("otherModelValue", function() {
              ngModel.$validate();
            });
        }
    };
});

Poemy.directive('patternValidator', function() {
  return {
    require : 'ngModel',
    link : function(scope, element, attrs, ngModel) {
      ngModel.$validators.patternCharacters = function(value) {
        var REQUIRED_PATTERNS = [
          /\d+/,    //numeric values
          /[a-z]+/, //lowercase values
          /[A-Z]+/, //uppercase values
          /\W+/,    //special characters
          /^\S+$/   //no whitespace allowed
        ];
        var status = true;
        angular.forEach(REQUIRED_PATTERNS, function (pattern) {
          status = status && pattern.test(value);
        });
        console.log('incorrect pattern?: ' + status);
        return status;
      }
    }
  }
});
