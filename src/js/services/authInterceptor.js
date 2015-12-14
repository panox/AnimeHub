angular
  .module("animeHub")
  .factory('AuthInterceptor', AuthInterceptor);

function AuthInterceptor(API, TokenService) {
  return {

    request: function(config) {
      var token = TokenService.getUserToken();

      if(config.url.match(API) && token) {
        config.headers.Authorization = 'Bearer ' + token;
      }

      return config;
    },

    response: function(res) {
      if(res.config.url.match(API) && res.data.token) {
        TokenService.saveUserToken(res.data.token);
      }

      return res;
    }
  
  };
  
};