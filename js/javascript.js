angular
  .module("animeHub", ['ngResource'])
  .constant('API', window.location.hostname.match('localhost') ? 'http://localhost:3000/api/' : 'http://animehub.herokuapp.com/api/');
angular
  .module("animeHub")
  .controller("animesController", animesController);

animesController.$inject = ['Anime'];
function animesController(Anime){

  // object saved as self
  var self = this;

  // gat all the anime
  Anime.query(function(res) {
    self.all = res.animes
  });

}
angular
  .module("animeHub")
  .controller("usersController", usersController);

usersController.$inject = ['User'];
function usersController(User){

  // object saved as self
  var self = this;

  self.login = function() {
    console.log('login')
  };
}
angular
  .module("animeHub")
  .factory('Anime', Anime);

Anime.$inject = ['$resource', 'API']

function Anime($resource, API) {
  return $resource(API + 'anime/:id', null, {
    'query': { method:'get', url: API + 'animes' }
  })
}
angular
  .module("animeHub")
  .factory('User', User);

User.$inject = ['$resource', 'API'];
function User($resource, API) {

  return $resource(API + 'users/:id', null, {
    'login':{method: "POST", url: API + 'login'},
    'signup':{method: "POST", url: API + 'signup'}
  });
  
}