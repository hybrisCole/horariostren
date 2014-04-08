'use strict';

angular.module('trenesMobile.services',[])
  .factory('paradas', ['storageWrapper',function (storageWrapper) {
    return {
      getParadas: function () {
        return storageWrapper.getData('paradas','http://horarios-tren-data.nodejitsu.com/parada');
      }
    };
  }]);
