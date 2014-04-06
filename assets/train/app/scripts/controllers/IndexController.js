'use strict';

angular.module('sprintMobile.controllers')
	.controller('IndexCtrl', ['$scope','Paradas','User',
		function ($scope,Paradas,User){
		$scope.paradas  = Paradas;
		$scope.showDrop = false;
  	$scope.slide = '';
  	$scope.showClosestSprintStore = true;
  	
  	$scope.closeSprintStoreLocation = function(){
    	$scope.showClosestSprintStore = false;
  	}

    var distances = haversine(Paradas, User.coords),
        lowest = _.min(_.pluck(distances, "distance")),
        idNearParada = _.where(distances, {'distance':lowest}),
        nearMe = _.where(Paradas, {'id':idNearParada[0].id});

    $scope.near = nearMe[0];

    // http://es.wikipedia.org/wiki/F%C3%B3rmula_del_Haversine
    function haversine(p1, p2){
      var distObj = _.map(p1, function(data){
        var R = 6371;
        var dLat  = rad(p2.latitude - data.lat);
        var dLong = rad(p2.longitude - data.lng);

        var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(rad(data.lat)) * Math.cos(rad(p2.latitude)) * Math.sin(dLong/2) * Math.sin(dLong/2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        var d = R * c;

        var data_obj = {
          'id'       : data.id,
          'distance' : d,
        };
        return data_obj;
      });
      return distObj;
    };

    function rad(x) { return x * Math.PI / 180 };
	
  }]);