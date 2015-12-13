angular
  .module("animeHub")
  .controller("commentsController", commentsController);

commentsController.$inject = ['Comment'];
function commentsController(Comment){
  var self = this;

  self.removeComment = function(id) {
    console.log('delete');
  };
}