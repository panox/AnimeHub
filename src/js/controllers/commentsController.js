angular
  .module("animeHub")
  .controller("commentsController", commentsController);

commentsController.$inject = ['Comment'];
function commentsController(Comment){
  var self = this;

  self.create = function() {
    console.log('create');
    console.log(self.comment);
    Comment.save({ animeId: 21034 }, self.comment, 
      function(res) {
        console.log(res)
      }, function(err) {
        console.log(err)
      };
    )
  };

  self.removeComment = function(id) {
    console.log('delete');
  };
}