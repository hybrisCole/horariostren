'use strict';

angular.module('trenesMobile.directives')
  .directive('routeMap',['$interval', function ($interval) {
    return {
      scope: {
        objmap : '='
      },
      restrict: 'A',
      link: function (scope, element, attrs) {
        var map = new GMaps({
    			div     : '#'+attrs.id,
    			lat     : scope.objmap.markers[1].latitude,
    			lng     : scope.objmap.markers[1].longitude
				});

        var MY_MAPTYPE_ID = 'custom_style';

        var featureOpts = [
          {
            stylers: [
              { hue: '#007993' },
              { visibility: 'on' },
              { gamma: 1 },
              { weight: 2 },
              {invert_lightness:true}
            ]
          },

          {
            featureType: 'water',
            stylers: [
              { color: '#007993' }
            ]
          },
          {
            featureType: 'transit.line',
            stylers: [
              { color:'#BF4B4B',
                weight: 20,
                gamma:10,
                lightness:100
              }
            ]
          }
        ];

        var mapOptions = {
          mapTypeControlOptions: {
            mapTypeIds: [google.maps.MapTypeId.ROADMAP, MY_MAPTYPE_ID]
          },
          mapTypeId: MY_MAPTYPE_ID
        };

        var styledMapOptions = {
          name: 'Estilo Tren'
        };

        var customMapType = new google.maps.StyledMapType(featureOpts, styledMapOptions);

        map.map.setOptions(mapOptions);
        map.map.mapTypes.set(MY_MAPTYPE_ID, customMapType);

        map.setZoom(16);

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
