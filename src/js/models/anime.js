angular
  .module("animeHub")
  .factory('Anime', Anime);

Anime.$inject = ['$resource'];

function Anime($resource) {
  // Rsource class
  return $resource(API + 'anime/:id', null, {
    console.log('ok')
  });
}