'use strict';

angular.module('trenesMobile.controllers')
	.controller('IndexCtrl', ['$scope','HomeData','geolocService',
		function ($scope,HomeData,geolocService){
      alert('WTF')
		$scope.paradas  = HomeData.paradasData;
    $scope.rutas  = HomeData.rutasData;
		$scope.showDrop = false;
  	$scope.slide = '';
  	$scope.showClosestSprintStore = true;

  	$scope.closeSprintStoreLocation = function(){
    	$scope.showClosestSprintStore = false;
  	}

  }]);