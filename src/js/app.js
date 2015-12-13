angular
  .module("animeHub", ['ngResource', 'angular-jwt', 'ui.router'])
  .constant('API', window.location.hostname.match('localhost') ? 'http://localhost:3000/api/' : 'http://animehub.herokuapp.com/api/')
  .config(MainRouter);

MainRouter.$inject = ['$stateProvider', '$urlRouterProvider'];
function MainRouter($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('home', { // 'home' is a name so we can refer to this state
      url: '/', // a relative url so angular can match the route to this state
      templateUrl: "partials/home.html" // the name of the file that contains our html for this stat ( a template )
    })
    .state('login', { 
      url: '/login',
      templateUrl: "partials/login.html"
    })
    .state('signup', { 
      url: '/signup',
      templateUrl: "partials/signup.html"
    })
    .state('oneAnime', { 
      url: '/anime/{animeId}',
      templateUrl: "partials/oneAnime.html",
      controller: function (Anime, $stateParams) {
        Anime.get({"id": $stateParams.animeId}, function(res) {
          console.log('app.js', res.anime);
          self.selectedAnime = res.anime;
        });
        console.log('app.js', $stateParams.animeId)
      }
    });

  $urlRouterProvider.otherwise('/');
}