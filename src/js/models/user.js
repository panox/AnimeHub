angular
  .module("animeHub")
  .factory('User', User);

User.$inject = ['$resource', 'API'];
function User($resource, API) {

  return $resource(API + 'users/:id', null, {
    'login':{method: "POST", url: API + 'login'},
    'signup':{method: "POST", url: API + 'signup'}
  });
  
}