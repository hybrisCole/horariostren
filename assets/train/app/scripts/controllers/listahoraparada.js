'use strict';

angular.module('trenesMobile.controllers')
  .controller('ListahoraparadaCtrl',[
  	'$scope',
  	'$routeParams', 
  	'HomeData', 
  	function ($scope, $routeParams, HomeData){
  	
  	var currentId   = $routeParams.id;
    var isOpen      = false;
    
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
		
    $scope.droppy = function(){
      if(isOpen === false){
        $scope.anim = 'fx-fade-down';
        isOpen = true;
        var i = 1;
        $scope.rutaAmin = _.map($scope.rutas, function(ruta){
          var rutasObj = {
            nombre : ruta.nombre,
            id     : ruta.id,
            speed  : 200 * i++
          };
          return rutasObj;
        });
      }else{
        $scope.anim = 'fx-fade-up-big';
        isOpen = false;
        $scope.rutaAmin = [];
      }
    }
}]);
