'use strict';

angular.module('sprintMobile.services')
  .factory('horarios', ['$q','$http',function ($q, $http) {
    return {
      getHorarios: function () {
        var defer = $q.defer();
        $http.get('http://horarios-tren-data.nodejitsu.com/horario').success(function(data){
          defer.resolve(data);
        }).error(function(data){
            defer.reject(data);
          });
        return defer.promise;
      }
    };
  }]);
