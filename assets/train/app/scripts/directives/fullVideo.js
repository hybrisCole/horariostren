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
            // initialize BigVideo
            var BV = new $.BigVideo({useFlashForFirefox:false});
            BV.init();
            BV.show('http://vjs.zencdn.net/v/oceans.mp4', {altSource:'http://vjs.zencdn.net/v/oceans.webm',ambient:true});
            element.height($window.innerHeight);
          }
        }else{
          $document.find('body #big-video-wrap').hide();
        }
      }
    };
  }]);
