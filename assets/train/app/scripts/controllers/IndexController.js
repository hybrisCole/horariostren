'use strict';

angular.module('trenesMobile.controllers')
  .controller('IndexCtrl',['$scope','HomeData','User','$interval',function ($scope,HomeData,User,$interval){
		$scope.paradas  = HomeData.paradasData;
    $scope.rutas    = HomeData.rutasData;
    $scope.horario  = HomeData.horariosData;
		$scope.showDrop = false;
  	$scope.slide    = '';
  	$scope.showClosestSprintStore = true;
    $scope.hurryUp = {};

  	$scope.closeSprintStoreLocation = function(){
    	$scope.showClosestSprintStore = false;
  	};
    //TODO: Tirar esto a un servicio
    var distances = haversine($scope.paradas, User.coords),
        lowest = _.min(_.pluck(distances, "distance")),
        idNearParada = _.where(distances, {'distance':lowest}),
        nearMe = _.where($scope.paradas, {'id':idNearParada[0].id});

    $scope.near = nearMe[0];
    //$scope.dist = Math.floor(lowest * 100) / 100;

    var horarioParada = _.where($scope.horario, {'parada':idNearParada[0].id});

    

    $interval(function() {
        var horarioList = _.map(horarioParada, function(hora){
        var numberPattern = /\d+/g,
            horas     = hora.tiempo.match(numberPattern)[0],
            minutos   = hora.tiempo.match(numberPattern)[1],
            now       = moment(),
            rutasHour = moment(''+horas+':'+minutos+'','HH:mm'), 
            dif       = Math.abs(moment.duration(now - rutasHour).asMinutes()),
            rout      = _.where($scope.rutas, {'id':hora.ruta});
        var data_obj = {
          'horaID'     : hora.id,
          'diferencia' : dif,
          'rutaID'     : hora.ruta,
          'rutaNombre' : rout[0].nombre,
          'tiempo'     : hora.tiempo
        };
        return data_obj;
      });

      var lowestHour = _.min(_.pluck(horarioList, 'diferencia'));
   
      $scope.lowHourObj = _.where(horarioList, {'diferencia':lowestHour});
      $scope.hurryUp = moment.duration(lowestHour, "minutes");
    }, 1000);
    
    // http://es.wikipedia.org/wiki/F%C3%B3rmula_del_Haversine
    function haversine(p1, p2){
      var distObj = _.map(p1, function(data){
        var R = 6371,
            dLat  = rad(p2.latitude - data.lat),
            dLong = rad(p2.longitude - data.lng);

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