(function () {
  'use strict';

  angular
    .module('authApp')
    .controller('NavController', NavController);

  NavController.$inject = ['$location', 'AuthService'];

  function NavController($location, AuthService) {
    var vm = this;

    vm.isLoggedIn = AuthService.isLoggedIn;
    vm.currentUser = function () {
      return AuthService.getUser() || {};
    };
    vm.logout = function () {
      AuthService.logout();
      $location.path('/login');
    };
  }
})();
