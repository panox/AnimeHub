angular
  .module('animeHub')
  .directive('show', showView);

function showView() {
  return directive = {
    restrict: 'E',
    replace: false,
    templateUrl: '/partials/_show.html',
    scope: {
      question: '='
    }
  };

}