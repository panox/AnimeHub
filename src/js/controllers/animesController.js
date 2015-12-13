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

  self.createComment = function(animeId) {
    self.commentModel.user = self.userToken._id;
    console.log(self.commentModel);
    Comment.save(
      { animeId: animeId }, self.commentModel, 
      // success
      function(res) {
        var newComment = { 
          title: self.commentModel.title, 
          content: self.commentModel.content
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

  self.removeComment = function(id) {
    Comment.remove({id:id});
  };

}