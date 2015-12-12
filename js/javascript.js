angular
  .module("animeHub", ['ngResource'])
  .constant('API', window.location.hostname.match('localhost') ? 'http://localhost:3000/api' : 'animehub.herokuapp.com/api/');
angular
  .module("animeHub")
  .factory('Anime', Anime);

Anime.$inject = ['$resource'];

function Anime($resource) {
}
angular
  .module("animeHub")
  .controller("animeController", animeController);

animeController.$inject = ['Anime'];
function animeController(Anime){

  var self = this;

  self.all = "test"

}