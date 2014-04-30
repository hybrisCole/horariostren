'use strict';

angular.module('trenesMobile.services')
  .factory('user', ['$q','$window','$rootScope',function($q,$window,$rootScope) {
    var defaultCoord = {"timestamp":1396975380431,"coords":{"speed":null,"heading":null,"altitudeAccuracy":null,"accuracy":36,"altitude":null,"longitude":-84.04992109999999,"latitude":9.932789}};
    // Public API here
    return {
      getUserPos:function(){
        var defer = $q.defer();
        if ($window.navigator && $window.navigator.geolocation) {
          $window.navigator.geolocation.getCurrentPosition(function(position){
            $rootScope.$apply(function(){
              defer.resolve(position);
            });
          },function(error){
            console.log('ERROR: when geoloc..., sending default coords'+ JSON.stringify(error));
            $rootScope.$apply(function(){
              defer.resolve(defaultCoord);
            });
          });
        }else{
          defer.resolve(defaultCoord);
        }
        return defer.promise;
      }
    };
  }]);
