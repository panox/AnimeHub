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
  self.selectAnime = function(id) {
    Anime.get({"id": id }, function(res) {
      console.log(res.anime);
      self.selectedAnime = res.anime
    })
  };

}