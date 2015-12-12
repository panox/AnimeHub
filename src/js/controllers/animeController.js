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