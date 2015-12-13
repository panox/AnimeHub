angular
  .module("animeHub")
  .controller("commentsController", commentsController);

commentsController.$inject = ['Comment'];
function commentsController(Comment){
  var self = this;

  self.create = function() {
    console.log('create')
  };

  self.removeComment = function(id) {
    console.log('delete');
  };
}