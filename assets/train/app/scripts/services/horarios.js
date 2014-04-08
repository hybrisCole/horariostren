'use strict';

angular.module('trenesMobile.services')
  .factory('horarios', ['storageWrapper',function (storageWrapper) {
    return {
      getHorarios: function () {
        return storageWrapper.getData('horarios','http://horarios-tren-data.nodejitsu.com/horario');
      }
    };
  }]);
