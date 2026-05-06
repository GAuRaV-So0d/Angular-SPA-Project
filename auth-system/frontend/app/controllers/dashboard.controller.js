(function () {
  'use strict';

  angular
    .module('authApp')
    .controller('DashboardController', DashboardController);

  DashboardController.$inject = ['$http', 'API_URL', 'AuthService'];

  function DashboardController($http, API_URL, AuthService) {
    var vm = this;

    vm.localUser = AuthService.getUser();
    vm.data = null;
    vm.error = '';
    vm.loading = true;
    vm.tokenStatus = 'Not checked';
    vm.tokenPreview = AuthService.getToken();
    vm.tokenExpiry = 'May 5, 2026, 11:56 AM';
    vm.checkStatus = checkStatus;
    vm.refreshData = refreshData;

    refreshData();

    function checkStatus() {
      vm.tokenStatus = AuthService.isLoggedIn() ? 'Authenticated' : 'Unauthenticated';
    }

    function refreshData() {
      vm.loading = true;
      vm.error = '';

      $http.get(API_URL + '/dashboard')
      .then(function (response) {
        vm.data = response.data;
        vm.protectedJson = angular.toJson(response.data, true);
        vm.checkStatus();
      })
      .catch(function (error) {
        vm.error = error.data && error.data.message ? error.data.message : 'Could not load dashboard.';
      })
      .finally(function () {
        vm.loading = false;
      });
    }
  }
})();
