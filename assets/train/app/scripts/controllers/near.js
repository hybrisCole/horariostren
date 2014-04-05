'use strict';

angular.module('sprintMobile.controllers')
  .controller('NearCtrl', ['$scope','$routeParams','Paradas','$window',function ($scope, $routeParams, Paradas, $window){
  	var currentId     = $routeParams.id;
  	var currentParada = _.where(Paradas, {'id':currentId});

    // check for Geolocation support
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(showPosition);
    }
    else{
      console.log('Geolocation is not supported for this Browser/OS version yet.');
    }

    //google-maps object setting values
    $scope.map = {
    	center : {
        latitude  : currentParada[0].lat,
        longitude : currentParada[0].lng
    	},
    	marker : {
        latitude  : currentParada[0].lat,
        longitude : currentParada[0].lng
      },
      polyline:{
    		visible  : true,
    		editable : true
      },
    	zoom : 16
		};

    function showPosition(position){
      console.log(position.coords.latitude); 
      console.log(position.coords.longitude); 
    }
  }]);
