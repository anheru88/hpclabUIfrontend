(function () {
  'use strict'
  angular.module('CondorUi.login')
    .controller('LoginController', ['$scope', '$location', '$http', 'jwtLoginService', 'logger', LoginController])
    .run(function () {
      console.log('CondorUi Login is Ready')
    })

  /* @ngInject */
  function LoginController ($scope, $location, $http, jwtLoginService, logger) {

    $scope.required = true;

    $scope.login = function (user) {

      jwtLoginService.login(user).then(function (response) {

        logger.info("Exito");

        var token = response.data.token

        localStorage.setItem('token', token)

        $location.path('/')

      }, function () {

        logger.error("Login Incorrecto");
        $scope.user.password = null


      })
    }

  }

})()