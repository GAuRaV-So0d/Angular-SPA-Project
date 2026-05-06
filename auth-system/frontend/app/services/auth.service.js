(function () {
  'use strict';

  angular
    .module('authApp')
    .factory('AuthService', AuthService);

  AuthService.$inject = ['$http', 'API_URL'];

  function AuthService($http, API_URL) {
    var TOKEN_KEY = 'auth_token';
    var USER_KEY = 'auth_user';

    return {
      register: register,
      login: login,
      logout: logout,
      getToken: getToken,
      getUser: getUser,
      isLoggedIn: isLoggedIn
    };

    function register(userData) {
      return $http.post(API_URL + '/register', userData);
    }

    function login(credentials) {
      return $http.post(API_URL + '/login', credentials).then(function (response) {
        // Store the JWT after successful login so future requests can use it.
        localStorage.setItem(TOKEN_KEY, response.data.token);
        localStorage.setItem(USER_KEY, angular.toJson(response.data.user));
        return response;
      });
    }

    function logout() {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
    }

    function getToken() {
      return localStorage.getItem(TOKEN_KEY);
    }

    function getUser() {
      var userJson = localStorage.getItem(USER_KEY);
      return userJson ? angular.fromJson(userJson) : null;
    }

    function isLoggedIn() {
      return Boolean(getToken());
    }
  }
})();
