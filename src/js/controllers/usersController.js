angular
  .module("animeHub")
  .controller("usersController", usersController);

usersController.$inject = ['User', 'TokenService', '$window', 'ROOT'];
function usersController(User, TokenService, $window, ROOT){

  // object saved as self
  var self = this;

  // ediform model
  self.userEditData = {};

  // decoded info of user
  self.userToken = {};
  if (TokenService.getUserToken()) {
    self.userToken = TokenService.getUser();
  }

  // payment method
  self.pay = function() {
    console.log('pay')
  };

  // method to login
  self.login = function() {
    User.login(
      self.user, 
      function(res) {
        var userToken = res.token;
        TokenService.saveUserToken(userToken);
        self.loginMessage = res.message;
        self.user = {};
        $window.location = ROOT;
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
        $window.location = ROOT;
      }, function(err) {
        self.signupMessage = err.data.message;
      }
    );
  };

  // method to logout
  self.logout = function() {
    TokenService.removeUserToken();
    $window.location = ROOT;
  };

  // user is logged in
  self.loggedIn = function() {
    return !!TokenService.getUserToken();
  };

  // show form 
  self.showEditForm = function() {
    if (!self.EditForm) {
      self.EditForm = true;
    }
    else if (self.EditForm) {
      self.EditForm = false;
    }
  };

  // edit user
  self.editUser = function(user) {
    var data = {
      username: self.userEditData.username || user.username,
      picture: self.userEditData.picture || user.picture 
    };
    // get user login data to send
    var logiData = 
      { email: user.local.email, 
        password: self.userEditData.password
      };
    if (self.userEditData.password === "") {
      return console.log('error');
    }
    // login to check if user matches
    User.login(logiData, function(res) {
      User.update({id: user._id}, data,
        // sucess
        function(res) {
          // change the token
          User.login(logiData, function(res) { 
            var userToken = res.token;
            TokenService.saveUserToken(userToken);
            $window.location = '/';
          });
        }
      );
    });
  };

}