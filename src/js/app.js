angular
  .module("animeHub", ['ngResource', 'angular-jwt', 'ui.router'])
  .constant('API', window.location.hostname.match('localhost') ? 'http://localhost:3000/api/' : 'http://animehub.herokuapp.com/api/')
  .config(MainRouter);

function MainRouter($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('home', { // 'home' is a name so we can refer to this state
      url: '/', // a relative url so angular can match the route to this state
      templateUrl: "partials/home.html" // the name of the file that contains our html for this stat ( a template )
    });

  $stateProvider
    .state('login', { 
      url: '/login',
      templateUrl: "partials/login.html"
    });

  $stateProvider
    .state('signup', { 
      url: '/signup',
      templateUrl: "partials/signup.html"
    });

  $stateProvider
    .state('oneAnime', { 
      url: '/anime',
      templateUrl: "partials/oneAnime.html"
    });

  $urlRouterProvider.otherwise('/');
}