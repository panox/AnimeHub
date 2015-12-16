angular
  .module("animeHub")
  .controller("facebookController", facebookController);

  facebookController.$inject = ['$window'];
function facebookController($window){
  var self = this;

  self.init = function() {
    window.fbAsyncInit = function() {
      FB.init({
        appId      : '1664979030450339',
        xfbml      : true,
        version    : 'v2.5'
      });
    };

    (function(d, s, id){
       var js, fjs = d.getElementsByTagName(s)[0];
       if (d.getElementById(id)) {return;}
       js = d.createElement(s); js.id = id;
       js.src = "//connect.facebook.net/en_US/sdk.js";
       fjs.parentNode.insertBefore(js, fjs);
     }(document, 'script', 'facebook-jssdk'));
  };

  self.init;
}