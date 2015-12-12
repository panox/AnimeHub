angular
  .module("animeHub")
  .controller("animeController", animeController);

animeController.$inject = ['Anime'];
function animeController(Anime){

  // object saved as self
  var self = this;

  // gat all the anime
  Anime.query(function(res) {
    self.all = res.animes
    console.log(res)
  });

}