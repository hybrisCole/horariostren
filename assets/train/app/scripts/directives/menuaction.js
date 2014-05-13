'use strict';

angular.module('trenesMobile.directives',[])
  .directive('menuaction', ['$window','$document',function ($window, $document) {
    return {
      templateUrl: 'partials/menu.html',
      restrict: 'E',
      link: function(scope, element, attrs){
      	var innerH   = $window.innerHeight;
        var getPadd  = $window.innerWidth * 0.70;
        var menuPadd  = $window.innerWidth * 0.30;
      	var menubtn  = element.find('#menu-icon');
      	var menuOpt  = element.find('.menu-options');
        var menuhere = element.find('.menu-here');
      	var menuBar  = element.find('.pure-menu');
      	var holeDoc  = $document.find('body');
      	var menuOpen = false;

      	menuhere.height(innerH);
        menuhere.width(getPadd);
        menuhere.transition({x : -getPadd},0);

      	menubtn.bind('click', function(){
      		if(!(menuOpen)){
            open();
            // close the menu if the user click/touch the body page and menu
            holeDoc.find('.main-cont').bind('click', function(){
              close();
            });

      		}else{
      		  close();
      		}
      	});
        
        // functions 
        function close(){
          holeDoc.find('.main-cont').transition({ x: 0 },500);
          menuhere.transition({x: -getPadd}, 500);
          menuBar.transition({ x: 0 }, 500);
          menuOpen = false;
        }

        function open(){
          holeDoc.find('.main-cont').transition({ x: getPadd }, 500);
          menuBar.transition({ x: getPadd }, 500);
          menuhere.transition({x: 0}, 500);
          menuOpen = true;
        }
      }
    };
  }]);
