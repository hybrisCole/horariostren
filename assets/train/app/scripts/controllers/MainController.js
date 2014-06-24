'use strict';

angular.module('trenesMobile.controllers', []).controller('MainCtrl', ['$scope', '$rootScope', '$window', '$location', function ($scope, $rootScope, $window, $location) {
  $scope.slideClass = 'slide-velocity-next';
  $rootScope.back = function() {
    $scope.slideClass = 'slide-velocity-previous';
    $window.history.back();
  };

  $scope.go = function(path){
    $scope.slideClass = 'slide-velocity-next';
    console.log($scope.slideClass);
    $location.url(path);
    $rootScope.$broadcast('go');
  };

  $scope.goBack = function(path){
    $scope.slideClass = 'slide-velocity-previous';
    $location.url(path);
    $rootScope.$broadcast('goBack');
  };

}]);