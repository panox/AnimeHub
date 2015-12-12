angular
  .module("animeHub")
  .controller("animesController", animesController);

animesController.$inject = ['Anime'];
function animesController(Anime){

  // object saved as self
  var self = this;

  // gat all the anime
  Anime.query(function(res) {
    self.all = res.animes;
  });

  // get one anime
  self.selectAnime = function() {
    Anime.get(function() {
      self.selectedAnime = res.anime;
    })
  };

}