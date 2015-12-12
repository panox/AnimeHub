angular
  .module("animeHub")
  .controller("usersController", usersController);

usersController.$inject = ['User'];
function usersController(User){

  // object saved as self
  var self = this;

  self.login = function() {
    console.log('login');
  };
}