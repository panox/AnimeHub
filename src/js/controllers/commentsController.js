angular
  .module("animeHub")
  .controller("commentsController", commentsController);

commentsController.$inject = ['Comment'];
function commentsController(Comment){
  var self = this;

  self.comment = {}

  self.create = function() {
    self.comment.user = '566c5a3737c7cc9c1e97e2f9'
    console.log('create');
    console.log(self.comment);
    Comment.save(
      { animeId: 21034 },
      self.comment, 
      function(res) {
        console.log(res);
      }, function(err) {
        console.log(err.data.message);
      }
    );
  };

  self.removeComment = function(id) {
    console.log('delete');
  };
}