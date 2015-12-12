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