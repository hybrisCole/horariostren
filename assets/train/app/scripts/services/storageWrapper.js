'use strict';

angular.module('trenesMobile.services')
  .factory('storageWrapper', ['$q','$http',function ($q, $http) {
    return {
      getData: function (localStorageKey,getUrl) {
        var defer = $q.defer();
        var localStorageData = JSON.parse(localStorage.getItem(localStorageKey));
        if(_.isNull(localStorageData)){
          $http.get(getUrl).success(function(data){
            localStorage.setItem(localStorageKey,JSON.stringify(data));
            defer.resolve(data);
          }).error(function(data){
            defer.reject(data);
          });
        }else{
          defer.resolve(localStorageData)
        }

        return defer.promise;
      }
    };
  }]);
