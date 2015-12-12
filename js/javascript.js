angular
  .module("animeHub", ['ngResource', 'angular-jwt'])
  .constant('API', $window.location.hostname.match('localhost') ? 'localhost:3000/api' : 'animehub.herokuapp.com/api')
