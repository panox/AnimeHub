angular
  .module("animeHub")
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
      })
      .state('profile', { 
        url: '/profile',
        templateUrl: "partials/profile.html"
      });

    $urlRouterProvider.otherwise('/');
  }