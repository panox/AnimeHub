angular
  .module("animeHub")
  .controller("animeController", animeController);

animeController.$inject = ['Anime', 'TokenService']
function animeController(Anime, TokenService){

  var self = this;

  self.alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
  self.string = "test";

  self.anilist = {
    grant_type: "client_credentials", 
    client_id: "", 
    client_secret: ""
  }

  self.anilistAccess = function() {
    Anime.anilistClientAccess(self.anilist, function(res) {
      TokenService.saveClientToken(res.access_token);
    });
  };

  // self.one = Anime.query({id:1})

  self.getFall = function() {
    var fall = {
      type: "TV",
      season: 'fall',
      sort: 'score-desc'
    }
    Anime.browse(fall, function(res) {
      self.fall = res
    });
  };

}