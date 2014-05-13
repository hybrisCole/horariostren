'use strict';

angular.module('trenesMobile.services')
  .factory('rutas', ['storageWrapper','horarios','$q','$timeout',function (storageWrapper,horarios,$q,$timeout){
    return {
      getRutas: function () {
        return storageWrapper.getData('rutas','http://horarios-tren-data.nodejitsu.com/ruta');
      },
      getRutasConHorariosActuales:function(){
        var defer = $q.defer();
        this.getRutas().then(function(rutasData){
          horarios.getHorariosActuales().then(function(horariosActuales){
            _.each(rutasData,function(ruta){
              ruta.horariosActuales = horariosActuales[ruta.id] || [];
            });
            defer.resolve(rutasData);
          });
        });
        return defer.promise;
      }
    };
  }]);
