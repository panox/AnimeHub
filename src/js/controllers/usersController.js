angular
  .module("animeHub")
  .controller("usersController", usersController);

usersController.$inject = ['User', 'TokenService', '$window'];
function usersController(User, TokenService, $window){

  // object saved as self
  var self = this;

  // ediform model
  self.userEditData = {};

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
  self.editUser = function(user) {
    var data = {
      username: self.userEditData.username || user.username,
      picture: self.userEditData.picture || user.picture 
    }
    User.update({id: user._id}, data,
      // sucess
      function(res) {
        console.log(res);
        // get user login data to send
        self.user = 
          { email: user.local.email, 
            password: self.userEditData.password
          }
        self.login();
      }, 
      // error handling
      function(err) { 
        console.log(err)
      }
    );
  };

}