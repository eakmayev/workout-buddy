angular.module('myApp').controller('loginController', ['$scope', '$location', 'AuthService',
  function ($scope, $location, AuthService) {

    $scope.login = function () {

      // initial values
      $scope.error = false;
      $scope.disabled = true;

      // call login from service
      AuthService.login($scope.loginForm.username, $scope.loginForm.password)
        // handle success
        .then(function () {
          $location.path('/');
          $scope.disabled = false;
          $scope.loginForm = {};
        })
        // handle error
        .catch(function () {
          $scope.error = true;
          $scope.errorMessage = "Invalid username and/or password";
          $scope.disabled = false;
          $scope.loginForm = {};
        });
    };

    $scope.register = function () {
      $location.path('/register');
    }
  }
]);

angular.module('myApp').controller('logoutController', ['$scope', '$location', 'AuthService',
  function ($scope, $location, AuthService) {

    $scope.logout = function () {

      // call logout from service
      AuthService.logout()
        .then(function () {
          $location.path('/login');
        });
    };
  }
]);

angular.module('myApp').controller('registerController', ['$scope', '$location', 'AuthService',
  function ($scope, $location, AuthService) {

    $scope.register = function () {

      // initial values
      $scope.error = false;
      $scope.disabled = true;

      // call register from service
      AuthService.register($scope.registerForm.username, $scope.registerForm.password)
        // handle success
        .then(function () {
          $location.path('/login');
          $scope.disabled = false;
          $scope.registerForm = {};
        })
        // handle error
        .catch(function () {
          $scope.error = true;
          $scope.errorMessage = "Something went wrong!";
          $scope.disabled = false;
          $scope.registerForm = {};
        });

    };

  }
]);

angular.module('myApp')
  .controller('matchCtrl', ['$scope',
    function ($scope) {
      $scope.workoutLevel = function () {
        return 'Advanced';
      }
      $scope.workoutSchedule = function () {
        return 'Monday/Wednesday/Saturday';
      }
      $scope.getMatch = function () {
        let url = 'https://randomuser.me/api';
        if ($scope.male) {
          url += '/?gender=male';
        } else if ($scope.female) {
          url += '/?gender=female';
        }
        fetch(url)
          .then(res => res.json())
          .then(data => data.results[0])
          .then(data => {
            $scope.match = data;
            console.log($scope.match)
            $scope.$apply();
          })
          .catch(err => console.log(err));
      }
      $scope.setWorkout = function (type) {
        $scope.upper = 'btn-info';
        $scope.lower = 'btn-info';
        $scope.all = 'btn-info';
        if (type === 'upper') {
          $scope.upper = 'btn-success';
          $scope.getMatch();
        } else if (type === 'lower') {
          $scope.lower = 'btn-success';
          $scope.getMatch();
        } else if (type === 'all') {
          $scope.all = 'btn-success';
          $scope.getMatch();
        }
        $scope.workoutType = type;
      }
      $scope.toggleSex = function (sex) {
        if (sex === 'male') {
          $scope.male = !$scope.male;
          if ($scope.male && $scope.female) {
            $scope.female = false;
          }
        } else if (sex === 'female') {
          $scope.female = !$scope.female;
          if ($scope.male && $scope.female) {
            $scope.male = false;
          }
        }
        $scope.maleStyle = $scope.male ? 'btn-success' : 'btn-info';
        $scope.femaleStyle = $scope.female ? 'btn-success' : 'btn-info';
      }

      $scope.male = false;
      $scope.female = false;
      $scope.setWorkout('none');
      $scope.toggleSex('none');
    }
  ]);