'use strict';

angular.module('trenesMobile.services',[])
  .factory('paradas', ['$q','$http',function ($q, $http) {
    return {
      getParadas: function () {
        var defer = $q.defer();
        $http.get('http://horarios-tren-data.nodejitsu.com/parada').success(function(data){
          defer.resolve(data);
        }).error(function(data){
          defer.reject(data);
        });
        return defer.promise;
      }
    };
  }]);
