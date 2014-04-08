'use strict';

angular.module('trenesMobile.services')
  .factory('rutas', ['storageWrapper',function (storageWrapper) {
    return {
      getRutas: function () {
        return storageWrapper.getData('rutas','http://horarios-tren-data.nodejitsu.com/ruta');
      }
    };
  }]);
