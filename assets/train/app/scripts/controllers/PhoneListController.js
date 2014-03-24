'use strict';

angular.module('sprintMobile.controllers').controller('PhoneListCtrl', ['$scope','PhoneFactory', function ($scope,PhoneFactory) {
  $scope.phoneList = PhoneFactory.phoneData();
}]);