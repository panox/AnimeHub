angular
  .module("animeHub", ['ngResource'])
  .constant('API', window.location.hostname.match('localhost') ? 'http://localhost:3000/api/' : 'http://animehub.herokuapp.com/api/');
angular
  .module("animeHub")
  .controller("animeController", animeController);

animeController.$inject = ['API'];
function animeController(API){

  var self = this;

  self.all = "test"

  console.log(API)

}