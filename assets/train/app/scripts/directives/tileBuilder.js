angular.module('sprintMobile.directives', [])
  .directive('tileBuilder', ['$parse','$timeout','$rootScope',function ($parse,$timeout,$rootScope) {
    return {
      scope: {
        modelInfoData:'=modelInfo',
        itemClass:'@itemClass'
      },
      templateUrl: function(tElement, tAttrs) {
        return tAttrs.template;
      },
      link: function(scope, element, attrs) {

        $timeout(function(){
          var itemsTileWidth = 0;
          element.find('.item-data').each(function(index,element){
            itemsTileWidth+=$(element).outerWidth(true);
          });
          element.find('.items-tile').width(itemsTileWidth);
        },2000);

        scope.goToPhone = function(phoneId){
          $rootScope.go('/phoneDetail/'+phoneId);
        };

      }
    };
  }]);