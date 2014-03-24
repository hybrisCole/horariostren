angular.module('swiper', [])
  .directive('swiper', ['$parse','$timeout',function ($parse,$timeout) {
    return {
      scope: {
        modelInfoData:'=modelInfo'
      },
      templateUrl: function(tElement, tAttrs) {
        return tAttrs.template;
      },
      link: function(scope, element, attrs) {
        console.log(scope.modelInfoData);
        element.addClass('swipe');

        var config = {};

        if ( attrs.auto ) {
          config.auto = parseInt(attrs.auto,10);
        }
        if ( attrs.startSlide ) {
          config.startSlide = parseInt(attrs.startSlide,10);
        }
        if ( attrs.speed ) {
          config.speed = parseInt(attrs.speed,10);
        }
        if ( attrs.onSlideEnd ) {
          var onSlideEnd = $parse(attrs.onSlideEnd);
          config.callback = function(e, index, slide) {
            scope.$apply(function() {
              onSlideEnd(scope, { index: index, slide: slide});
            });
          };
        }

        var swiperProperty = attrs.swiper || 'swiper';
        $timeout(function(){
          var swiper = new Swipe(element[0], config);
          scope[swiperProperty] = swiper;
        });

      }
    };
  }]);
