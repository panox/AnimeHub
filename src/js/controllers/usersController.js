angular
  .module("animeHub")
  .controller("usersController", usersController);

usersController.$inject = ['User', 'TokenService', '$window'];
function usersController(User, TokenService, $window){

  // object saved as self
  var self = this;

  // decoded info of user
  self.userToken = {};
  if (TokenService.getUserToken()) {
    self.userToken = TokenService.getUser();
  }

  // method to login
  self.login = function() {
    User.login(
      self.user, 
      function(res) {
        var userToken = res.token;
        TokenService.saveUserToken(userToken);
        self.loginMessage = res.message;
        self.user = {};
        $window.location = '/';
      }, function(err) {
        self.loginMessage = err.data.message;
      }
    );
  };

  // method to signup
  self.signup = function() {
    User.signup(
      self.user, 
      function(res) {
        self.signupMessage = res.message;
        self.user = {};
        $window.location = '/';
      }, function(err) {
        self.signupMessage = err.data.message;
      }
    );
  };

  // method to logout
  self.logout = function() {
    TokenService.removeUserToken();
    $window.location = '/';
  };

  // user is logged in
  self.loggedIn = function() {
    return !!TokenService.getUserToken();
  };

  // edit user
  self.editUser = function() {
    User.update({id: }, user, function(res) {
      console.log(res);
    });
  };

}