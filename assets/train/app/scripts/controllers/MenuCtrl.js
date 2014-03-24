'use strict';

angular.module('sprintMobile.controllers').controller('MenuCtrl', ['$scope', function ($scope) {
  $scope.navOpen = false;
  $scope.menuClick = function(){
    $scope.navOpen = !$scope.navOpen;
  };
}]);