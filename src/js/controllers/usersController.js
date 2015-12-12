angular
  .module("animeHub")
  .controller("usersController", usersController);

usersController.$inject = ['User'];
function usersController(User){

  // object saved as self
  var self = this;

  // method to login
  self.login = function() {
    console.log(self.user);
    User.login(self.user, function(res) {
      console.log(res);
    });
  };
}