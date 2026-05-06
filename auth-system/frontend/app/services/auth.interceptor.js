(function () {
  'use strict';

  angular
    .module('authApp')
    .factory('AuthInterceptor', AuthInterceptor);

  AuthInterceptor.$inject = ['$q', '$location'];

  function AuthInterceptor($q, $location) {
    return {
      request: attachToken,
      responseError: handleError
    };

    function attachToken(config) {
      var token = localStorage.getItem('auth_token');

      if (token) {
        config.headers.Authorization = 'Bearer ' + token;
      }

      return config;
    }

    function handleError(response) {
      // If the API says the token is invalid, clear login state and redirect.
      if (response.status === 401) {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('auth_user');
        $location.path('/login');
      }

      return $q.reject(response);
    }
  }
})();
