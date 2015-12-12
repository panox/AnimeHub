angular
  .module("animeHub", ['ngResource'])
  .constant('API', window.location.hostname.match('localhost') ? 'http://localhost:3000/api/' : 'http://animehub.herokuapp.com/api/');
angular
  .module("animeHub")
  .controller("animeController", animeController);

animeController.$inject = ['Anime', 'API'];
function animeController(Anime, API){

  // object saved as self
  var self = this;

  // gat all the anime
  self.all = Anime.query();

  console.log(API)

}
angular
  .module("animeHub")
  .factory('Anime', Anime);

Anime.$inject = ['$resource', 'API']

function Anime($resource, API) {
  return $resource(API + 'anime/:id', null, {
  'query': { method:'get', url: API + 'animes' }
  })
}