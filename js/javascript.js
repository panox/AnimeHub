angular
  .module("animeHub", ['ngResource', 'angular-jwt'])
  .constant('API', window.location.hostname.match('localhost') ? 'http://localhost:3000/api/' : 'http://animehub.herokuapp.com/api/');
angular
  .module("animeHub")
  .factory('Anime', Anime);

Anime.$inject = ['$resource', 'API'];

function Anime($resource, API) {
  return $resource(API + 'anime/:id', null, {
    'query': { method:'get', url: API + 'animes' }
  });
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

}
angular
  .module("animeHub")
  .controller("usersController", usersController);

usersController.$inject = ['User', 'TokenService'];
function usersController(User, TokenService){

  // object saved as self
  var self = this;

  // method to login
  self.login = function() {
    console.log(self.user);
    User.login(self.user, function(res) {
      var userToken = res.token;
      TokenService.saveUserToken(userToken);
    });
  };
}
angular
  .module("animeHub")
  .service('TokenService', TokenService);

TokenService.$inject = ['$window', 'jwtHelper'];
function TokenService($window, jwtHelper) {
  var self = this;

  self.saveUserToken = function(token) {
    $window.localStorage.setItem('userToken', token);
  };

  self.getUserToken = function() {
    return $window.localStorage.getItem('userToken');
  };

}