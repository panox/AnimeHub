angular
  .module("animeHub")
  .factory('Comment', Comment);

Comment.$inject = ['$resource', 'API'];
function Comment($resource, API) {

  return $resource(API + 'comment/:id', null, {
  });
  
}