angular
  .module("animeHub", ['ngResource', 'angular-jwt', 'ui.router'])
  .constant('API', window.location.hostname.match('localhost') ? 'http://localhost:3000/api/' : 'http://animehub.herokuapp.com/api/')
  .config(MainRouter);

MainRouter.$inject = ['$stateProvider', '$urlRouterProvider'];
function MainRouter($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('home', { 
      url: '/',
      templateUrl: "partials/home.html",
      controller: 'animesController as anime'
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
      url: '/anime/:animeId',
      templateUrl: "partials/oneAnime.html",
      controller: 'animesController as anime'
    });

  $urlRouterProvider.otherwise('/');
}