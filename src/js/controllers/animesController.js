angular
  .module("animeHub")
  .controller("animesController", animesController);

animesController.$inject =['$stateParams', 'Anime', 'Comment', 'TokenService'];
function animesController($stateParams, Anime, Comment, TokenService){
  // object saved as self
  var self = this;

  // ---- ANIME -----

  // gat all the anime
  Anime.query(function(res) {
    self.all = res.animes;
  });

  // get one anime
  function getOne() {
    Anime.get({ id: $stateParams.animeId }, function(res) {
      console.log(res.anime); // console log one anime object
      self.selectedAnime = res.anime;
    });
  }

  // if there is params get one anime
  if ($stateParams.animeId) {
    getOne();
  }

  // ---- COMMENTS -----

  self.commentModel = {};

  self.userToken = TokenService.getUser();

  self.createComment = function(animeId) {
    self.commentModel.user = self.userToken._id;
    console.log(self.commentModel);
    Comment.save(
      { animeId: animeId },
      self.commentModel, 
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