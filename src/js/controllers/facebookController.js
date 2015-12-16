angular
  .module("animeHub")
  .controller("facebookController", facebookController);

facebookController.$inject = ['$window', 'FB_APP_ID'];
function facebookController($window, FB_APP_ID){
  var self = this;

  function fbInit() {

    $window.fbAsyncInit = function() {
      FB.init({
        appId      : FB_APP_ID,
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

  }

  fbInit();

}