'use strict';

angular.module('trenesMobile.services')
  .factory('rutas', ['$q','$http',function ($q, $http) {
    return {
      getRutas: function () {
        var defer = $q.defer();
        $http.get('http://horarios-tren-data.nodejitsu.com/ruta').success(function(data){
          defer.resolve(data);
        }).error(function(data){
            defer.reject(data);
          });
        return defer.promise;
      }
    };
  }]);
