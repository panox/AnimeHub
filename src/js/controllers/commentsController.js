angular
  .module("animeHub")
  .controller("commentsController", commentsController);

commentsController.$inject = ['Comment', 'TokenService'];
function commentsController(Comment, TokenService){
  var self = this;

  self.comment = {};

  self.userToken = TokenService.getUser();

  self.create = function(animeId) {
    self.comment.user = self.userToken._id;
    console.log(self.comment);
    Comment.save(
      { animeId: animeId },
      self.comment, 
      function(res) {
        console.log(res);
      }, function(err) {
        console.log(err.data.message);
      }
    );
  };

  self.removeComment = function(id) {
    Comment.remove({id:id});
  };
}