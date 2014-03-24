'use strict';

angular.module('sprintMobile.services')
  .factory('paradas', function ($q, $http) {
    return {
      getParadas: function () {
        var defer = $q.defer();
        $http.get('http://horarios-tren-data.nodejitsu.com/parada').success(function(data){
          defer.resolve(data);
        });
        return defer.promise;
      }
    };
  });
