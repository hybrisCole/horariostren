'use strict';

angular.module('sprintMobile.directives')
  .directive('routeMap',['$interval', function ($interval) {
    return {
      scope: {
        objmap : '=',
      },
      restrict: 'A',
      link: function (scope, element, attrs) {

      	console.log(scope.objmap);

        var map = new GMaps({
    			div     : '#'+attrs.id,
    			lat     : scope.objmap.markers[1].latitude,
    			lng     : scope.objmap.markers[1].longitude
				});

        map.setZoom(16);

        console.log(map.controls);

				runMarkers(scope.objmap.markers);

				map.travelRoute({
  				origin: [scope.objmap.markers[1].latitude, scope.objmap.markers[1].longitude],
  				destination: [scope.objmap.center.latitude, scope.objmap.center.longitude],
  				travelMode: 'driving',
  				step: function(e){
  					$('#instructions').append('<li>'+e.instructions+'</li>');
            $('#instructions li:eq('+e.step_number+')').delay(550*e.step_number).fadeIn(200, function(){
              map.setCenter(e.end_location.lat(), e.end_location.lng());
              map.drawPolyline({
                path: e.path,
                strokeColor: '#BF4B4B',
                strokeOpacity: 1,
                strokeWeight: 5
              });
            });
  				}
				});

				function runMarkers(markers){
					_.each(markers, function(marker){
							map.addMarker({
  						lat: marker.latitude,
  						lng: marker.longitude,
  						title: 'Lima',
  						click: function(e) {
    						alert('You clicked in this marker');
  						}
						});
					});
				}
      }
    };
  }]);
