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