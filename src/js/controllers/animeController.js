angular
  .module("animeHub")
  .controller("animeController", animeController);

animeController.$inject = ['Anime', 'API'];
function animeController(Anime, API){

  var self = this;

  self.all = "test"

  console.log(API)

}