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
    			div: '#'+attrs.id,
    			lat: scope.objmap.center.latitude,
    			lng: scope.objmap.center.longitude
				});

				runMarkers(scope.objmap.markers);

				map.travelRoute({
  				origin: [scope.objmap.markers[1].latitude, scope.objmap.markers[1].longitude],
  				destination: [scope.objmap.center.latitude, scope.objmap.center.longitude],
  				travelMode: 'driving',
  				step: function(e){
  					$('#instructions').append('<li>'+e.instructions+'</li>');
            $('#instructions li:eq('+e.step_number+')').delay(450*e.step_number).fadeIn(200, function(){
              map.setCenter(e.end_location.lat(), e.end_location.lng());
              map.drawPolyline({
                path: e.path,
                strokeColor: '#131540',
                strokeOpacity: 0.6,
                strokeWeight: 6
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
