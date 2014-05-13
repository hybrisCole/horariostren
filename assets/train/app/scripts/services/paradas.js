'use strict';

angular.module('trenesMobile.services',[])
  .factory('paradas',['storageWrapper','$q',function (storageWrapper,$q) {
    return {
      getParadas: function () {
        return storageWrapper.getData('paradas','http://horarios-tren-data.nodejitsu.com/parada');
      },
      
      getParada:function(id){
        var defer = $q.defer();
        this.getParadas().then(function(paradas){
          var parada = _.find(paradas,function(parada){
            return parada.id === id;
          });
          defer.resolve(parada);
        });
        return defer.promise;
      },
      
      filtrar: function(ids){
        var defer = $q.defer();
        this.getParadas().then(function(paradas){
          var paradasFiltradas = _.filter(paradas,function(parada){
            return _.contains(ids,parada.id);
          });
          defer.resolve(paradasFiltradas);
        });
        return defer.promise;
      }

    };
  }]);
