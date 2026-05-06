(function () {
  'use strict';

  angular
    .module('authApp')
    .config(configureRoutes);

  configureRoutes.$inject = ['$routeProvider'];

  function configureRoutes($routeProvider) {
    $routeProvider
      .when('/login', {
        templateUrl: 'templates/login.html',
        controller: 'LoginController',
        controllerAs: 'login'
      })
      .when('/register', {
        templateUrl: 'templates/register.html',
        controller: 'RegisterController',
        controllerAs: 'register'
      })
      .when('/dashboard', {
        templateUrl: 'templates/dashboard.html',
        controller: 'DashboardController',
        controllerAs: 'dashboard',
        resolve: {
          auth: protectRoute
        }
      })
      .otherwise({
        redirectTo: '/dashboard'
      });
  }

  protectRoute.$inject = ['AuthService', '$q'];

  function protectRoute(AuthService, $q) {
    if (AuthService.isLoggedIn()) {
      return true;
    }

    return $q.reject('AUTH_REQUIRED');
  }
})();
