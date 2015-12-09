angular
  .module("animeHub", ['ngResource', 'angular-jwt'])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptor');
  });