'use strict';

angular.module('trenesMobile.controllers')
  .controller('ListahoraparadaCtrl',[
  	'$scope',
  	'$routeParams', 
  	'HomeData', 
  	function ($scope, $routeParams, HomeData){
  	
  	var currentId   = $routeParams.id;
    
    $scope.paradas  = HomeData.paradasData;
    $scope.rutas    = HomeData.rutasData;
    $scope.horario  = HomeData.horariosData;

    $scope.currentRuta = _.where($scope.rutas, {'id':currentId});
    $scope.horarioList = _.where($scope.horario, {'ruta':currentId});

    var printObj = _.map($scope.horarioList,function(hora){
    	var parada = _.where($scope.paradas, {'id':hora.parada});
    	var data_obj = {
          'paradaNombre' : parada[0].nombre,
          'paradaId'     : parada[0].id,
          'tiempo'       : hora.tiempo,
          'sortHour'     : parseFloat(hora.tiempo.replace(':','.'))
      };
      return data_obj;
		});

    $scope.horasParadas = _.sortBy(printObj, 'sortHour');
		
}]);
