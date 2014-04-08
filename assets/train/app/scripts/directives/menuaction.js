'use strict';

angular.module('trenesMobile.directives',[])
  .directive('menuaction', ['$window','$document',function ($window, $document) {
    return {
      templateUrl: 'partials/menu.html',
      restrict: 'E',
      link: function(scope, element, attrs){
      	var innerH   = $window.innerHeight;
        var getPadd  = $window.innerWidth * 0.70;
      	var menubtn  = element.find('#menu-icon');
      	var menuOpt  = element.find('.menu-options');
        var menuhere = element.find('.menu-here');
      	var menuBar  = element.find('.pure-menu');
      	var holeDoc  = $document.find('body');
      	var menuOpen = false;

      	menuhere.height(innerH);
        menuhere.width(getPadd);

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
          holeDoc.find('.main-cont').animate({marginLeft : "0px"}, 500);
          menuBar.animate(
            {marginLeft : "0px"}, 
            500,
            function() {
              menuhere.removeClass('menu-options');  
            }
          );
          menuOpen = false;
        }

        function open(){
          holeDoc.find('.main-cont').animate({marginLeft : getPadd+"px"}, 500);
          menuBar.animate({marginLeft : getPadd+"px"}, 500);
          menuhere.addClass('menu-options');
          menuOpen = true;
        }
      }
    };
  }]);
