'use strict';

angular.module('trenesMobile.controllers').controller('MenuCtrl', ['$scope', function ($scope) {
  $scope.navOpen = false;
  $scope.menuClick = function(){
    $scope.navOpen = !$scope.navOpen;
  };
}]);