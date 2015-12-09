angular
  .module('animeHub')
  .factory('AuthInterceptor', AuthInterceptor);

function AuthInterceptor(TokenService) {
  return {

    request: function(config) {
      var token = TokenService.getClientToken();

      config.headers.Authorization = 'Bearer ' + token;

      return config;
    }
  
  };
  
};