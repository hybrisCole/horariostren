'use strict';

angular.module('sprintMobile.controllers').controller('PhoneDetailCtrl', ['$scope','PhoneFactory', function ($scope,PhoneFactory) {
  $scope.capacity16 = true;
  $scope.productDetail = {
    quantity: 1
  }
  $scope.setCapacity = function(val){
    $scope.capacity16 = val;
  };
  $scope.addOneProduct = function(){
    $scope.productDetail.quantity+=1;
  }
  $scope.lessOneProduct = function(){
    if($scope.productDetail.quantity!=0){
      $scope.productDetail.quantity-=1;
    }
  }
}]);