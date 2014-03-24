'use strict';

angular.module('sprintMobile.controllers').controller('CheckoutCtrl', ['$scope', function ($scope) {

  $scope.planSectionActive = true;
  $scope.serviceSectionActive = false;
  $scope.numberSectionActive = false;
  $scope.billingPaymentSectionActive = false;


  $scope.plans = [
    {
      value:false,
      price:50,
      title:'Sprint Framily Plan',
      copy:'Unlimited talk, text and data'
    }
  ];

  $scope.services = [
    {
      value:false,
      price:11,
      title:'Total Device Protection',
      copy:'Covers virtually anything that can happen to your device, including loss and theft'
    },
    {
      value:false,
      price:99,
      title:'Apple Care',
      copy:''
    },
    {
      value:false,
      price:0,
      title:'None',
      copy:''
    }
  ];

  $scope.numbers = [
    {
      value:false,
      title:'I want a new phone number'
    },
    {
      value:false,
      title:'Bring your number'
    }
  ];

  $scope.selectPlan = function(index){
    $scope.planSectionActive = false;
    if(!$scope.selectedPlan){
      $scope.serviceSectionActive = true;
    }
    $scope.selectedPlan = $scope.plans[index];
    selectOption($scope.plans,index);
  };

  $scope.activatePlanSection = function(){
    $scope.planSectionActive = true;
    $scope.serviceSectionActive = false;
    $scope.numberSectionActive = false;
    $scope.billingPaymentSectionActive = false;
  }

  $scope.selectService = function(index){
    $scope.serviceSectionActive = false;
    if(!$scope.selectedService){
      $scope.numberSectionActive = true;
    }
    $scope.selectedService = $scope.services[index];
    selectOption($scope.services,index);
  };

  $scope.activateServiceSection = function(){
    $scope.planSectionActive = false;
    $scope.serviceSectionActive = true;
    $scope.numberSectionActive = false;
    $scope.billingPaymentSectionActive = false;
  }

  $scope.selectNumber = function(index){
    $scope.numberSectionActive = false;
    if(!$scope.selectedNumber){
      $scope.billingPaymentSectionActive = true;
    }
    $scope.selectedNumber = $scope.numbers[index];
    selectOption($scope.numbers,index);
  };


  $scope.activateNumberSection = function(){
    $scope.planSectionActive = false;
    $scope.serviceSectionActive = false;
    $scope.numberSectionActive = true;
    $scope.billingPaymentSectionActive = false;
  }

  function veryfyShowBilling(){
    if(!$scope.planSectionActive && !$scope.serviceSectionActive && !$scope.numberSectionActive){
      $scope.billingPaymentSectionActive = true;
    }
  }

  function selectOption(array,keyTrue){
    veryfyShowBilling();
    angular.forEach(array, function(value, key){
      array[key].value = false;
    });
    array[keyTrue].value = true;
  }

}]);