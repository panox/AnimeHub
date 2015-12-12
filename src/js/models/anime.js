angular
  .module("animeHub")
  .factory('Anime', Anime);

Anime.$inject = ['$resource', 'API']

function Anime($resource, API) {
  return $resource(API + 'anime/:id', null, {
  'update': { method:'PUT' }
  })
}