'use strict';

angular.module('sprintMobile.controllers')
	.controller('IndexCtrl', ['$scope', 'PhoneFactory', 'TabletBundleFactory','Paradas',
		function ($scope, PhoneFactory,TabletBundleFactory,Paradas){
		$scope.paradas  = Paradas;
		$scope.showDrop = false;
  	$scope.slide = '';
  	$scope.showClosestSprintStore = true;
  	$scope.phoneCategories = PhoneFactory.phoneCategories();
  	$scope.tabletBundleCategories = TabletBundleFactory.tabletBundleCategories();
  	$scope.iPhoneAccessories = PhoneFactory.iPhoneAccessories();

    var paradaRandom = _.random(0, $scope.paradas.length - 1);
    $scope.near = $scope.paradas[paradaRandom];
  	
  	$scope.closeSprintStoreLocation = function(){
    	$scope.showClosestSprintStore = false;
  	}

  	$scope.openDrop = function(){
  		if($scope.showDrop){
  			$scope.showDrop = false;
  		}else{
  			$scope.showDrop = true;
  		}
  	}
	}]);