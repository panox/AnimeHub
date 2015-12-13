angular
  .module("animeHub")
  .controller("animesController", animesController);

animesController.$inject =['$stateParams', 'Anime', 'Comment', 'TokenService'];
function animesController($stateParams, Anime, Comment, TokenService){
  // object saved as self
  var self = this;

  // decoded info of user
  self.userToken = TokenService.getUser();
  // model where comment form data are saved
  self.commentModel = {};

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
        var newComment = {
          _id: res.comment._id,
          title: res.comment.title, 
          content: res.comment.content
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
      var index = self.selectedAnime.comments.indexOf(comment);
      self.selectedAnime.comments.splice(index, 1);
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
      editData = selectedComment;
    }
    else {
      editData = {
        title: editFormData.title,
        content: editFormData.content
      }
    }
    Comment.update({id: selectedComment._id}, editData, function() {
      console.log('edit')
      self.selectedEdit = {}
    });
  };

}