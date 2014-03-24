'use strict';

angular.module('sprintMobile')
  .directive('videojs', ['$window','$document','$location',function ($window, $document, $location){
    return {
      restrict: 'A',
      link: function (scope, element, attrs){
        if($location.$$path === '/'){
          if($document.find('body #big-video-wrap').length > 0){
            $document.find('body #big-video-wrap').show();
          }else{
            var BV = new $.BigVideo();
            BV.init();
            BV.show('http://vjs.zencdn.net/v/oceans.mp4');
            element.height($window.innerHeight);
          }
        }else{
          $document.find('body #big-video-wrap').hide();
        }
		  }
    };
  }]);
