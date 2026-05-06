(function () {
  'use strict';

  angular
    .module('authApp', ['ngRoute'])
    .constant('API_URL', 'http://localhost:3000/api')
    .config(configureHttp)
    .run(handleRouteErrors);

  configureHttp.$inject = ['$httpProvider'];

  function configureHttp($httpProvider) {
    // Every API request passes through this interceptor before it is sent.
    $httpProvider.interceptors.push('AuthInterceptor');
  }

  handleRouteErrors.$inject = ['$rootScope', '$location'];

  function handleRouteErrors($rootScope, $location) {
    $rootScope.$on('$routeChangeError', function (event, current, previous, rejection) {
      if (rejection === 'AUTH_REQUIRED') {
        $location.path('/login');
      }
    });
  }
})();
