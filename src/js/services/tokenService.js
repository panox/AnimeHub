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

  self.removeUserToken = function() {
    $window.localStorage.removeItem('userToken');
  };

  self.getUser = function() {
    var token = self.getToken();
    return jwtHelper.decodeToken(token);
  };

}