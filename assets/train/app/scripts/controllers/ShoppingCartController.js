'use strict';

angular.module('sprintMobile.controllers').controller('ShoppingCartCtrl', ['$scope','ShoppingCartFactory',function ($scope,ShoppingCartFactory) {
  $scope.bundleData = ShoppingCartFactory.bundleWith();
  $scope.alsoBrough = ShoppingCartFactory.alsoBrough();
}]);