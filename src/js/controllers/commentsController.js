angular
  .module("animeHub")
  .controller("commentsController", commentsController);

commentsController.$inject = ['Comments'];
function commentsController(Comments){
  var self = this;

  self.removeComment = function(id) {
    
  };
}