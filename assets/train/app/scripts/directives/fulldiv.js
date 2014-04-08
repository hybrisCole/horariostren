'use strict';

angular.module('trenesMobile.directives')
  .directive('fulldiv', ['$window',function ($window) {
    return {
      restrict: 'A',
      link: function(scope, element, attrs){
      	var inner   = $window.innerHeight;
		    element.height(inner);
      }
    };
	}]);
