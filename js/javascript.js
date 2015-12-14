angular
  .module("animeHub", ['ngResource', 'angular-jwt', 'ui.router'])
  .constant('API', window.location.hostname.match('localhost') ? 'http://localhost:3000/api/' : 'http://animehub.herokuapp.com/api/')
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptor');
  });
angular
  .module("animeHub")
  .controller("animesController", animesController);

animesController.$inject =['$stateParams', 'Anime', 'Comment', 'TokenService'];
function animesController($stateParams, Anime, Comment, TokenService){
  // object saved as self
  var self = this;

  // decoded info of user
  self.userToken = { _id: ""};
  if (TokenService.getUserToken()) {
    self.userToken = TokenService.getUser();
  }
  // model where comment form data are saved
  self.commentModel = {};
  // model where edit form data are saved
  self.commentEditModel = {};

  // ---- ANIME -----

  // gat all the anime
  Anime.query(function(res) {
    self.all = res.animes;
  });

  // get one anime
  function getOne() {
    Anime.get({ id: $stateParams.animeId }, function(res) {
      console.log('Anime:', res.anime); // console log one anime object
      self.selectedAnime = res.anime;
    });
  }

  // if there is params get one anime
  if ($stateParams.animeId) {
    getOne();
  }

  // ---- COMMENTS -----

  // create comment
  self.createComment = function(animeId) {
    self.commentModel.user = self.userToken._id;
    Comment.save(
      { animeId: animeId }, self.commentModel, 
      // success
      function(res) {
        console.log(res)
        var newComment = {
          _id: res.comment._id,
          title: res.comment.title, 
          content: res.comment.content,
          user: { _id : res.comment.user, username: self.userToken.username}
        };
        self.selectedAnime.comments.push(newComment);
        self.commentModel = {};
      }, 
      // error
      function(err) {
        console.log(err.data.message);
      }
    );
  };

  // delete comment
  self.removeComment = function(comment) {
    Comment.remove({id: comment._id}, function() {
      var commentsArray = self.selectedAnime.comments;
      var index = commentsArray.indexOf(comment);
      commentsArray.splice(index, 1);
    });
  };

  // select comment to edit comment
  self.selectEdit = function(comment) {
    self.selectedEdit = comment;
  };

  // edit comment
  self.editComment = function() {
    var selectedComment = self.selectedEdit;
    var editFormData = self.commentEditModel;
    var editData;
    // checks to see if user made changes
    if ( editFormData.title === "" && editFormData.content === "") {
      editData = {
        title: selectedComment.title,
        content: selectedComment.content
      };
    }
    else {
      editData = {
        title: editFormData.title,
        content: editFormData.content
      };
    }
    Comment.update({id: selectedComment._id}, editData, function(res) {
      var commentsArray = self.selectedAnime.comments;
      var index = commentsArray.indexOf(selectedComment);
      commentsArray[index].title = res.comment.title;
      commentsArray[index].content = res.comment.content;
      self.selectedEdit = {};
    });
  };

}
angular
  .module("animeHub")
  .controller("usersController", usersController);

usersController.$inject = ['User', 'TokenService', '$window'];
function usersController(User, TokenService, $window){

  // object saved as self
  var self = this;

  // decoded info of user
  self.userToken = {};
  if (TokenService.getUserToken()) {
    self.userToken = TokenService.getUser();
  }

  // method to login
  self.login = function() {
    User.login(
      self.user, 
      function(res) {
        var userToken = res.token;
        TokenService.saveUserToken(userToken);
        self.loginMessage = res.message;
        self.user = {};
        $window.location = '/';
      }, function(err) {
        self.loginMessage = err.data.message;
      }
    );
  };

  // method to signup
  self.signup = function() {
    User.signup(
      self.user, 
      function(res) {
        self.signupMessage = res.message;
        self.user = {};
        $window.location = '/';
      }, function(err) {
        self.signupMessage = err.data.message;
      }
    );
  };

  // method to logout
  self.logout = function() {
    TokenService.removeUserToken();
    $window.location = '/';
  };

  // user is logged in
  self.loggedIn = function() {
    return !!TokenService.getUserToken();
  };

}
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
      });

    $urlRouterProvider.otherwise('/');
  }
angular
  .module("animeHub")
  .factory('Anime', Anime);

Anime.$inject = ['$resource', 'API'];

function Anime($resource, API) {
  return $resource(API + 'anime/:id', null, {
    'query': { method:'get', url: API + 'animes' }
  });
}
angular
  .module("animeHub")
  .factory('Comment', Comment);

Comment.$inject = ['$resource', 'API'];
function Comment($resource, API) {

  return $resource(API + 'comment/:id', null, {
    'update': { method:'PUT', url: API + 'comment/:id' },
    'save': { method:'POST', url: API + 'anime/:animeId/comments'}
  });
  
}
angular
  .module("animeHub")
  .factory('User', User);

User.$inject = ['$resource', 'API'];
function User($resource, API) {

  return $resource(API + 'users/:id', null, {
    'login':{method: "POST", url: API + 'login'},
    'signup':{method: "POST", url: API + 'signup'}
  });
  
}
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
  
}
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

  self.removeUserToken = function() {
    $window.localStorage.removeItem('userToken');
  };

  self.getUser = function() {
    var token = self.getUserToken();
    return jwtHelper.decodeToken(token);
  };

}