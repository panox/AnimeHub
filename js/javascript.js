angular
  .module("animeHub", ['ngResource', 'angular-jwt'])
  .constant('API', $window.location.hostname.match('localhost') ? 'localhost:3000/api/' : 'animehub.herokuapp.com/api/')
angular
  .module("animeHub")
  .controller("animeController", animeController);

animeController.$inject = ['Anime']
function animeController(Anime){

  var self = this;

  self.getAll = function() {
    Anime.query(function(res) {
      self.all = res
    });
  };

  self.getAll();

}
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