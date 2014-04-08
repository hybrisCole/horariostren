'use strict';

angular.module('trenesMobile.services')
  .factory('user', ['$q', function ($q) {
    // Public API here
    return {
      getUserPos : function () {
        var defer = $q.defer();
        // check for Geolocation support
        if(navigator.geolocation){
          navigator.geolocation.getCurrentPosition(showPosition);
        }
        else{
          defer.resolve('Geolocation is not supported for this Browser/OS version yet.');
        }
        function showPosition(position){
          defer.resolve(position);
        }
        return defer.promise;
      }
    };
  }]);
