'use strict';

angular.module('trenesMobile.controllers', []).controller('MainCtrl', ['$scope', '$rootScope', '$window', '$location', function ($scope, $rootScope, $window, $location) {
  $scope.slideClass = 'gr';
  $rootScope.back = function() {
    $scope.slideClass = 'fx-fade-normal';
    $window.history.back();
  };

  $scope.go = function(path){
    $scope.slideClass = 'fx-fade-right-big';
    $location.url(path);
    $rootScope.$broadcast('go');
  };

  $scope.goBack = function(path){
    $scope.slideClass = 'fx-fade-left-big';
    $location.url(path);
    $rootScope.$broadcast('goBack');
  };

}]);