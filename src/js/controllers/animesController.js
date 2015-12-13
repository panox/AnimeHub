angular
  .module("animeHub")
  .controller("animesController", animesController);

animesController.$inject = ['$stateParams', 'Anime', '$window'];
function animesController($stateParams, Anime, $window){
  // object saved as self
  var self = this;

  // gat all the anime
  Anime.query(function(res) {
    self.all = res.animes;
  });

  // get one anime
  function getOne() {
    Anime.get({ id: $stateParams.animeId }, function(res) {
      console.log(res.anime); // console log one anime object
      self.selectedAnime = res.anime;
    });
  }

  if ($stateParams.animeId) {
    getOne();
  }

}