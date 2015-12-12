angular
  .module("animeHub")
  .controller("animeController", animeController);

animeController.$inject = ['API'];
function animeController(API){

  var self = this;

  self.all = "test"

  console.log(API)

}