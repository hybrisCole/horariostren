'use strict';

angular.module('trenesMobile.controllers', []).controller('MainCtrl', ['$scope', '$rootScope', '$window', '$location', function ($scope, $rootScope, $window, $location) {
  $scope.slideClass = 'gr';
  $rootScope.back = function() {
    $scope.slideClass = 'slide-right';
    $window.history.back();
  };

  $scope.go = function(path){
    $scope.slideClass = 'slide-left';
    $location.url(path);
    $rootScope.$broadcast('go');
  };

  $scope.goBack = function(path){
    $scope.slideClass = 'slide-right';
    $location.url(path);
    $rootScope.$broadcast('goBack');
  };

}]);