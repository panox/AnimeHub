angular
  .module("animeHub", ['ngResource', 'angular-jwt', 'ui.router'])
  .constant('API', window.location.hostname.match('localhost') ? 'http://localhost:3000/api/' : 'https://animehub-api.herokuapp.com/api/')
  .constant('CLIENT', window.location.hostname.match('panox.github.io') ? 'http://panox.github.io/AnimeHub/#/' : 'http://5734940f.ngrok.com/#/')
  .constant('ROOT', window.location.hostname.match('localhost') ? '/' : '/AnimeHub/#/')
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptor');
  });
