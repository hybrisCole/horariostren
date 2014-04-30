'use strict';

angular.module('trenesMobile.services')
  .factory('storageWrapper', ['$q','$http','$cacheFactory',function ($q, $http,$cacheFactory) {
    return {
      getData: function (cacheKey,getUrl) {
        var defer = $q.defer(),
            cache;
        if(_.isUndefined($cacheFactory.get('tren-factory'))){
          cache = $cacheFactory('tren-factory');
        }else{
          cache = $cacheFactory.get('tren-factory');
        }
        if(_.isUndefined(cache.get(cacheKey))){
          $http.get(getUrl).success(function(data){
            cache.put(cacheKey,data);
            defer.resolve(data);
          }).error(function(data){
            defer.reject(data);
          });
        }else{
          console.log(cache.get(cacheKey));
          defer.resolve(cache.get(cacheKey));
        }
        return defer.promise;
      }
    };
  }]);
