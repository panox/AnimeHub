angular
  .module("animeHub")
  .controller("commentsController", commentsController);

commentsController.$inject = ['$stateParams', 'Comments'];
function commentsController($stateParams, Comments){
}