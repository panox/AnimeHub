angular
  .module("animeHub", ['ngResource', 'angular-jwt', 'ui.router', 'updateMeta'])
  .constant('API', window.location.hostname.match('localhost') ? 'http://localhost:3000/api/' : 'https://animehub-api.herokuapp.com/api/')
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptor');
  });