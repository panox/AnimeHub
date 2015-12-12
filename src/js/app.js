angular
  .module("animeHub", ['ngResource', 'angular-jwt'])
  .constant('API', window.location.hostname.match('localhost') ? 'http://localhost:3000/api/' : 'http://animehub.herokuapp.com/api/');