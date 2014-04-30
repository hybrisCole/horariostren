'use strict';

angular.module('trenesMobile.services')
  .factory('storageWrapper', ['$q','$http','$cacheFactory',function ($q, $http,$cacheFactory) {
    return {
      getData: function (cacheKey,getUrl) {
        var defer = $q.defer(),
            cache,
            cacheFactoryName = 'tren-factory';
        if(_.isUndefined($cacheFactory.get(cacheFactoryName))){
          cache = $cacheFactory(cacheFactoryName);
        }else{
          cache = $cacheFactory.get(cacheFactoryName);
        }
        if(_.isUndefined(cache.get(cacheKey))){
          $http.get(getUrl).success(function(data){
            cache.put(cacheKey,data);
            defer.resolve(data);
          }).error(function(data){
            defer.reject(data);
          });
        }else{
          defer.resolve(cache.get(cacheKey));
        }
        return defer.promise;
      }
    };
  }]);
