angular
  .module("animeHub", ['ngResource'])
  .constant('API', window.location.hostname.match('localhost') ? 'http://localhost:3000/api' : 'animehub.herokuapp.com/api/');
angular
  .module("animeHub")
  .controller("animeController", animeController);

function animeController(){

  var self = this;

  self.all = "test"

}