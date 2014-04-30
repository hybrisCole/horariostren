"use strict";var geolocFunction=function(a,b){var c=b.defer();return a.getUserPos().then(function(a){c.resolve(a)},function(a){c.resolve(a)}),c.promise};angular.module("trenesMobile",["trenesMobile.controllers","trenesMobile.services","trenesMobile.directives","ngTouch","ngRoute","ngAnimate"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"partials/home.html",controller:"IndexCtrl",resolve:{HomeData:["rutas","paradas","horarios","$q",function(a,b,c,d){var e=d.defer();return b.getParadas().then(function(b){a.getRutas().then(function(a){c.getHorarios().then(function(c){e.resolve({rutasData:a,paradasData:b,horariosData:c})})})}),e.promise}],User:["user","$q",geolocFunction]}}).when("/near/:id",{templateUrl:"views/near.html",controller:"NearCtrl",resolve:{Paradas:["paradas","$q",function(a,b){var c=b.defer();return a.getParadas().then(function(a){c.resolve(a)}),c.promise}],User:["user","$q",geolocFunction]}}).otherwise({redirectTo:"/"})}]).run(["$rootScope",function(a){a.displayViewChangeOverlay=!1,a.$on("$routeChangeStart",function(){a.displayViewChangeOverlay=!0}),a.$on("$routeChangeSuccess",function(){a.displayViewChangeOverlay=!1})}]),angular.module("trenesMobile.controllers",[]).controller("MainCtrl",["$scope","$rootScope","$window","$location",function(a,b,c,d){a.slideClass="gr",b.back=function(){a.slideClass="slide-right",c.history.back()},b.go=function(b){a.slideClass="slide-left",d.url(b)},b.goBack=function(b){a.slideClass="slide-right",d.url(b)}}]),angular.module("trenesMobile.controllers").controller("IndexCtrl",["$scope","HomeData","User",function(a,b,c){function d(a,b){var c=_.map(a,function(a){var c=6371,d=e(b.latitude-a.lat),f=e(b.longitude-a.lng),g=Math.sin(d/2)*Math.sin(d/2)+Math.cos(e(a.lat))*Math.cos(e(b.latitude))*Math.sin(f/2)*Math.sin(f/2),h=2*Math.atan2(Math.sqrt(g),Math.sqrt(1-g)),i=c*h,j={id:a.id,distance:i};return j});return c}function e(a){return a*Math.PI/180}a.paradas=b.paradasData,a.rutas=b.rutasData,a.horario=b.horariosData,a.showDrop=!1,a.slide="",a.showClosestSprintStore=!0,a.closeSprintStoreLocation=function(){a.showClosestSprintStore=!1};var f=moment().hours(),g=_.filter(a.horario,function(a){return _.parseInt(a.tiempo.split(":")[0])===f});console.log(g);var h=d(a.paradas,c.coords),i=_.min(_.pluck(h,"distance")),j=_.where(h,{distance:i}),k=_.where(a.paradas,{id:j[0].id});a.near=k[0],a.dist=Math.floor(100*i)/100;var l=_.where(a.horario,{parada:j[0].id}),m=_.map(l,function(b){var c=/\d+/g,d=b.tiempo.match(c)[0],e=b.tiempo.match(c)[1],f=moment(),g=moment(""+d+":"+e,"HH:mm"),h=Math.abs(moment.duration(f-g).asMinutes()),i=_.where(a.rutas,{id:b.ruta}),j={horaID:b.id,diferencia:h,rutaID:b.ruta,rutaNombre:i[0].nombre,tiempo:b.tiempo};return j}),n=_.min(_.pluck(m,"diferencia"));a.lowHourObj=_.where(m,{diferencia:n})}]),angular.module("trenesMobile.controllers").controller("MenuCtrl",["$scope",function(a){a.navOpen=!1,a.menuClick=function(){a.navOpen=!a.navOpen}}]),angular.module("trenesMobile.services",[]).factory("paradas",["storageWrapper",function(a){return{getParadas:function(){return a.getData("paradas","http://horarios-tren-data.nodejitsu.com/parada")}}}]),angular.module("trenesMobile.services").factory("rutas",["storageWrapper",function(a){return{getRutas:function(){return a.getData("rutas","http://horarios-tren-data.nodejitsu.com/ruta")}}}]),angular.module("trenesMobile.services").factory("horarios",["storageWrapper",function(a){return{getHorarios:function(){return a.getData("horarios","http://horarios-tren-data.nodejitsu.com/horario")}}}]),angular.module("trenesMobile.services").factory("user",["$q","$window","$rootScope",function(a,b,c){var d={timestamp:1396975380431,coords:{speed:null,heading:null,altitudeAccuracy:null,accuracy:36,altitude:null,longitude:-84.04992109999999,latitude:9.932789}};return{getUserPos:function(){var e=a.defer();return b.navigator&&b.navigator.geolocation?b.navigator.geolocation.getCurrentPosition(function(a){c.$apply(function(){e.resolve(a)})},function(a){console.log("ERROR: when geoloc..., sending default coords"+JSON.stringify(a)),c.$apply(function(){e.resolve(d)})}):e.resolve(d),e.promise}}}]),angular.module("trenesMobile.services").factory("storageWrapper",["$q","$http","$cacheFactory",function(a,b,c){return{getData:function(d,e){var f,g=a.defer(),h="tren-factory";return f=_.isUndefined(c.get(h))?c(h):c.get(h),_.isUndefined(f.get(d))?b.get(e).success(function(a){f.put(d,a),g.resolve(a)}).error(function(a){g.reject(a)}):g.resolve(f.get(d)),g.promise}}}]),angular.module("trenesMobile.directives",[]).directive("menuaction",["$window","$document",function(a,b){return{templateUrl:"partials/menu.html",restrict:"E",link:function(c,d){function e(){l.find(".main-cont").transition({x:0},500),k.transition({x:0},500,function(){j.removeClass("menu-options")}),m=!1}function f(){l.find(".main-cont").transition({x:h},500),k.transition({x:h},500),j.addClass("menu-options"),m=!0}var g=a.innerHeight,h=.7*a.innerWidth,i=d.find("#menu-icon"),j=(d.find(".menu-options"),d.find(".menu-here")),k=d.find(".pure-menu"),l=b.find("body"),m=!1;j.height(g),j.width(h),i.bind("click",function(){m?e():(f(),l.find(".main-cont").bind("click",function(){e()}))})}}}]),angular.module("trenesMobile.controllers").controller("NearCtrl",["$scope","$routeParams","Paradas","User",function(a,b,c,d){var e=b.id,f=_.where(c,{id:e}),g=d.coords;a.map={center:{latitude:f[0].lat,longitude:f[0].lng,name:"paradaStatic"},markers:[{latitude:f[0].lat,longitude:f[0].lng,name:"paradaStatic"},{latitude:g.latitude,longitude:g.longitude,name:"userStatic"},{latitude:g.latitude,longitude:g.longitude,name:"userWatcher"}]}}]),angular.module("trenesMobile.directives").directive("fulldiv",["$window",function(a){return{restrict:"A",link:function(b,c){var d=a.innerHeight;c.height(d)}}}]),angular.module("trenesMobile.directives").directive("routeMap",["$interval","$timeout",function(a,b){return{scope:{objmap:"="},restrict:"A",link:function(a,c,d){function e(a){_.each(a,function(a){f.addMarker({lat:a.latitude,lng:a.longitude,title:a.name,click:function(){alert("You clicked in this marker")}})})}var f=new GMaps({div:"#"+d.id,lat:a.objmap.markers[1].latitude,lng:a.objmap.markers[1].longitude}),g=new google.maps.Marker({position:new google.maps.LatLng(a.objmap.markers[1].latitude,a.objmap.markers[1].longitude),title:"Your Location",draggable:!0,map:f.map});f.map.setCenter(g.getPosition());var h="custom_style",i=[{stylers:[{hue:"#007993"},{visibility:"on"},{gamma:1},{weight:2},{invert_lightness:!0}]},{featureType:"water",stylers:[{color:"#007993"}]},{featureType:"transit.line",stylers:[{color:"#BF4B4B"},{weight:5}]}],j={mapTypeControlOptions:{mapTypeIds:[google.maps.MapTypeId.ROADMAP,h]},mapTypeId:h},k={name:"Estilo Tren"},l=new google.maps.StyledMapType(i,k);f.map.setOptions(j),f.map.mapTypes.set(h,l),e(a.objmap.markers),f.travelRoute({origin:[a.objmap.markers[1].latitude,a.objmap.markers[1].longitude],destination:[a.objmap.center.latitude,a.objmap.center.longitude],travelMode:"driving",step:function(a){$("#instructions").append("<li>"+a.instructions+"</li>"),$("#instructions li:eq("+a.step_number+")").delay(550*a.step_number).fadeIn(200,function(){f.drawPolyline({path:a.path,strokeColor:"#BF4B4B",strokeOpacity:1,strokeWeight:5})})}});{var m=_.where(f.markers,{title:"userWatcher"});navigator.geolocation.watchPosition(function(a){var b=new google.maps.LatLng(a.coords.latitude,a.coords.longitude);m.setPosition(b)})}b(function(){google.maps.event.trigger(f.map,"resize");var b=new google.maps.LatLngBounds;_.each(a.objmap.markers,function(a){b.extend(new google.maps.LatLng(a.latitude,a.longitude))}),f.map.fitBounds(b),console.log(f.markers)},100)}}}]);