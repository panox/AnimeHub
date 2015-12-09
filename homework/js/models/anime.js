angular
  .module("animeHub")
  .factory('Anime', Anime);

Anime.$inject = ['$resource'];

function Anime($resource) {
  // Rsource class
  return $resource('https://anilist.co/api/anime/:id', null, {
    'anilistClientAccess': {
      method: "POST",
      url: 'https://anilist.co/api/auth/access_token'
    },
    'query': {method: "GET", isArray: false},
    'browse': {
      url: 'https://anilist.co/api/browse/anime',
      method: "GET",
      isArray: true
    }
  });
};