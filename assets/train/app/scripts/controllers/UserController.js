'use strict';

angular.module('sprintMobile.controllers').controller('UserCtrl', ['$scope', function ($scope) {
  $scope.missedPayment = [true,true];

  $scope.closeMissedPayment=function(index){
    $scope.missedPayment[index] = false;
  }
}]);
