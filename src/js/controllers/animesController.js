angular
  .module("animeHub")
  .controller("animesController", animesController);

animesController.$inject = ['$stateParams', 'Anime', '$window'];
function animesController(Anime, $window, $stateParams){
  // object saved as self
  var self = this;

  // gat all the anime
  Anime.query(function(res) {
    self.all = res.animes;
  });

  // get one anime
  self.selectAnime = function(id) {
    Anime.get({"id": id}, function(res) {
      console.log(res.anime);
      $window.location = '#/anime/'+id;
      self.selectedAnime = res.anime;
    });
  };

  console.log("Anime Page", $stateParams)
}