(function () {
  'use strict';

  angular
    .module('authApp')
    .controller('RegisterController', RegisterController);

  RegisterController.$inject = ['$location', 'AuthService'];

  function RegisterController($location, AuthService) {
    var vm = this;

    vm.user = {
      name: '',
      email: '',
      password: ''
    };
    vm.error = '';
    vm.success = '';
    vm.loading = false;
    vm.submit = submit;

    function submit(form) {
      vm.error = '';
      vm.success = '';

      if (form.$invalid) {
        angular.forEach(form.$error, function (fields) {
          angular.forEach(fields, function (field) {
            field.$setTouched();
          });
        });
        return;
      }

      vm.loading = true;

      AuthService.register(vm.user)
        .then(function () {
          vm.success = 'Account created. Redirecting to login...';
          $location.path('/login');
        })
        .catch(function (error) {
          vm.error = error.data && error.data.message ? error.data.message : 'Registration failed.';
        })
        .finally(function () {
          vm.loading = false;
        });
    }
  }
})();
