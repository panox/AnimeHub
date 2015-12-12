angular
  .module("animeHub", ['ngResource', 'angular-jwt'])
  .constant('API', $window.location.hostname.match('localhost') ? 'localhost:3000/api/' : 'animehub.herokuapp.com/api/')

angular
  .module("animeHub")
  .factory('Anime', Anime);

Anime.$inject = ['$resource'];

function Anime($resource) {
  // Rsource class
  return $resource(API + 'anime/:id', null, {
    console.log('ok')
  });
}