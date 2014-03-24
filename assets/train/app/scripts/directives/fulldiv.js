'use strict';

angular.module('sprintMobile.directives')
  .directive('fulldiv', ['$window',function ($window) {
    return {
      restrict: 'A',
      link: function(scope, element, attrs){
      	var inner   = $window.innerHeight;
		    element.height(inner - 50);
		    element.find('.angular-google-map-container').height(inner - 50);
      }
    };
	}]);
