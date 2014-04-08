'use strict';

angular.module('trenesMobile.services')
  .factory('horarios', ['$q','$http',function ($q, $http) {
    return {
      getHorarios: function () {
        var defer = $q.defer();
        if(_.isNull(localStorage.getItem('horarios'))){
          $http.get('http://horarios-tren-data.nodejitsu.com/horario').success(function(data){
            defer.resolve(data);
          }).error(function(data){
              defer.reject(data);
            });
        }else{

        }

        return defer.promise;
      }
    };
  }]);
