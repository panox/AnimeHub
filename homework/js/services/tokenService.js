angular
  .module("animeHub")
  .service('TokenService', TokenService);

TokenService.$inject = ['$window', 'jwtHelper'];
function TokenService($window, jwtHelper) {
  var self = this;

  self.saveClientToken = function(token) {
    $window.localStorage.setItem('clientToken', token)
  };

  self.getClientToken = function() {
    return $window.localStorage.getItem('clientToken')
  };

}