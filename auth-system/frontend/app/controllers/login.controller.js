(function () {
  'use strict';

  angular
    .module('authApp')
    .controller('LoginController', LoginController);

  LoginController.$inject = ['$location', 'AuthService'];

  function LoginController($location, AuthService) {
    var vm = this;

    vm.credentials = {
      email: 'demo@example.com',
      password: 'password123'
    };
    vm.error = '';
    vm.loading = false;
    vm.submit = submit;

    function submit(form) {
      vm.error = '';

      if (form.$invalid) {
        angular.forEach(form.$error, function (fields) {
          angular.forEach(fields, function (field) {
            field.$setTouched();
          });
        });
        return;
      }

      vm.loading = true;

      AuthService.login(vm.credentials)
        .then(function () {
          $location.path('/dashboard');
        })
        .catch(function (error) {
          vm.error = error.data && error.data.message ? error.data.message : 'Login failed.';
        })
        .finally(function () {
          vm.loading = false;
        });
    }
  }
})();
