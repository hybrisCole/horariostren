'use strict';

angular.module('trenesMobile.controllers')
  .controller('NearCtrl', ['$scope','$routeParams','Paradas','User', function ($scope, $routeParams, Paradas, User){
  	var currentId     = $routeParams.id;
  	var currentParada = _.where(Paradas, {'id':currentId});
    var userPos       = User.coords;
    
    //google-maps object setting values
    $scope.map = {
    	center : {
        latitude  : currentParada[0].lat,
        longitude : currentParada[0].lng,
        name      : 'paradaStatic'
    	},
    	markers : [
        {
          latitude  : currentParada[0].lat,
          longitude : currentParada[0].lng,
          name      : 'paradaStatic'
        },
        {
          latitude  : userPos.latitude,
          longitude : userPos.longitude,
          name      : 'userWatcher'
        }
      ]
		};
  }]);
