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