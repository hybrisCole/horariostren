'use strict';

angular.module('trenesMobile.services')
  .factory('user', ['$q','$window','$rootScope',function($q,$window,$rootScope) {
    // Public API here
    return {
      getUserPos : function () {
        var defer = $q.defer();
        if ($window.navigator && $window.navigator.geolocation) {
          $window.navigator.geolocation.getCurrentPosition(function(position){
            $rootScope.$apply(function(){
              defer.resolve(position);
            });
          },function(error){
            $rootScope.$apply(function(){
              defer.resolve(error);
            });
          });
        }
        return defer.promise;
      }
    };
  }]);
