'use strict';

angular.module('trenesMobile.services')
  .factory('storageWrapper', ['$q','$http',function ($q, $http) {
    return {
      getData: function (localStorageKey,getUrl) {
        console.log('storageWrapper.getData()');
        console.log(Modernizr.localstorage);
        var defer = $q.defer();
        if(Modernizr.localstorage){
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
        //No local storage, just doing REST call...
        }else{
          $http.get(getUrl).success(function(data){
            defer.resolve(data);
          }).error(function(data){
            defer.reject(data);
          });
        }
        return defer.promise;
      }
    };
  }]);
