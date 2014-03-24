'use strict';

angular.module('sprintMobile.controllers')
  .controller('NearCtrl', function ($scope, $routeParams, Paradas, $window){
  	var currentId     = $routeParams.id;
  	var currentParada = _.where(Paradas, {'id':currentId});
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
  });
