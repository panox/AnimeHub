angular
  .module("animeHub")
  .controller("usersController", usersController);

usersController.$inject = ['User', 'TokenService', '$window', 'ROOT', '$state', '$timeout'];
function usersController(User, TokenService, $window, ROOT, $state, $timeout){

  // object saved as self
  var self = this;

  // ediform model
  self.userEditData = {};

  // decoded info of user
  self.userToken = {};
  if (TokenService.getUserToken()) {
    self.userToken = TokenService.getUser();
  }

  // redirects to root of the website
  function goToRoot() {
    $window.location = ROOT;
  }
  function goToHomeState() {
    $state.go('home');
  }

  // payment method
  self.pay = function() {
    var $form = $('#payment-form');
    // disable button after first click
    $form.find('button').prop('disabled', true);
    Stripe.card.createToken($form, stripeResponseHandler);
  };

  // function with reponse from stripe create token
  function stripeResponseHandler(status, response) {
    var $form = $('#payment-form');
    if (response.error) {
      // Show the errors on the form
      $form.find('.payment-errors').text(response.error.message);
      $form.find('button').prop('disabled', false);
    } else {
      // response contains id and card, which contains additional card details
      var token = response.id;
      var data = { "stripeToken": token, amount: self.pay.amount};
      User.pay(data, function(res) {
        self.payMessage = "Donation Sent!";
        self.pay.amount = "";
        $timeout(function() {
          self.payForm = true;
          self.payMessage = "";
        }, 2100);
      });
    }
  }

  // toggle payment form
  self.payForm = true;
  self.payFormToggle = function() {
    self.payForm = self.payForm === false ? true: false;
  };

  // method to login
  self.login = function() {
    User.login(
      self.user, 
      function(res) {
        var userToken = res.token;
        TokenService.saveUserToken(userToken);
        self.loginMessage = res.message;
        goToRoot();
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
        goToRoot();
      }, function(err) {
        self.signupMessage = err.data.message;
      }
    );
  };

  // method to logout
  self.logout = function() {
    TokenService.removeUserToken();
    goToHomeState();
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
            goToRoot();
          });
        }
      );
    });
  };

}