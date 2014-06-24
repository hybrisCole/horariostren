"use strict";var geolocFunction=function(a,b){var c=b.defer();return a.getUserPos().then(function(a){c.resolve(a)},function(a){c.resolve(a)}),c.promise};angular.module("trenesMobile",["trenesMobile.controllers","trenesMobile.services","trenesMobile.directives","ngTouch","ngRoute","ngAnimate","ngSlideVelocity"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/home.html",controller:"IndexCtrl",resolve:{HomeData:["rutas","paradas","horarios","$q",function(a,b,c,d){var e=d.defer();return b.getParadas().then(function(b){c.getHorarios().then(function(c){a.getRutasConHorariosActuales().then(function(a){e.resolve({rutasData:a,paradasData:b,horariosData:c})})})}),e.promise}],User:["user","$q",geolocFunction]}}).when("/near/:id",{templateUrl:"views/near.html",controller:"NearCtrl",resolve:{Paradas:["paradas","$q",function(a,b){var c=b.defer();return a.getParadas().then(function(a){c.resolve(a)}),c.promise}],User:["user","$q",geolocFunction]}}).when("/rutasinfo/:id",{templateUrl:"views/listahoraparada.html",controller:"ListahoraparadaCtrl",resolve:{HomeData:["rutas","paradas","horarios","$q",function(a,b,c,d){var e=d.defer();return b.getParadas().then(function(b){a.getRutas().then(function(a){c.getHorarios().then(function(c){e.resolve({rutasData:a,paradasData:b,horariosData:c})})})}),e.promise}],User:["user","$q",geolocFunction]}}).otherwise({redirectTo:"/"})}]).run(["$rootScope",function(a){a.displayViewChangeOverlay=!1,a.$on("$routeChangeStart",function(){a.displayViewChangeOverlay=!0}),a.$on("$routeChangeSuccess",function(){a.displayViewChangeOverlay=!1})}]),angular.module("trenesMobile.controllers",[]).controller("MainCtrl",["$scope","$rootScope","$window","$location",function(a,b,c,d){a.slideClass="slide-velocity-next",b.back=function(){a.slideClass="slide-velocity-previous",c.history.back()},a.go=function(c){a.slideClass="slide-velocity-next",console.log(a.slideClass),d.url(c),b.$broadcast("go")},a.goBack=function(c){a.slideClass="slide-velocity-previous",d.url(c),b.$broadcast("goBack")}}]),angular.module("trenesMobile.controllers").controller("IndexCtrl",["$scope","HomeData","User","$interval","$route","$routeParams","$location",function(a,b,c,d,e){function f(a,b){var c=_.map(a,function(a){var c=6371,d=g(b.latitude-a.lat),e=g(b.longitude-a.lng),f=Math.sin(d/2)*Math.sin(d/2)+Math.cos(g(a.lat))*Math.cos(g(b.latitude))*Math.sin(e/2)*Math.sin(e/2),h=2*Math.atan2(Math.sqrt(f),Math.sqrt(1-f)),i=c*h,j={id:a.id,distance:i};return j});return c}function g(a){return a*Math.PI/180}a.paradas=b.paradasData,a.rutas=b.rutasData,a.horario=b.horariosData,a.showDrop=!1,a.slide="",a.showClosestSprintStore=!0,a.hurryUp={};var h=f(a.paradas,c.coords),i=_.min(_.pluck(h,"distance")),j=_.where(h,{distance:i}),k=_.where(a.paradas,{id:j[0].id});a.near=k[0];var l=_.where(a.horario,{parada:j[0].id});d(function(){var b=_.map(l,function(b){var c=/\d+/g,d=b.tiempo.match(c)[0],e=b.tiempo.match(c)[1],f=moment(),g=moment(""+d+":"+e,"HH:mm"),h=Math.abs(moment.duration(f-g).asMinutes()),i=_.where(a.rutas,{id:b.ruta}),j={horaID:b.id,diferencia:h,rutaID:b.ruta,rutaNombre:i[0].nombre,tiempo:b.tiempo};return j}),c=_.min(_.pluck(b,"diferencia"));a.lowHourObj=_.where(b,{diferencia:c}),a.hurryUp=moment.duration(c,"minutes"),0===a.hurryUp._data.hours&&0===a.hurryUp._data.minutes&&a.hurryUp._data.seconds<1&&e.reload()},1e3)}]),angular.module("trenesMobile.controllers").controller("MenuCtrl",["$scope",function(a){a.navOpen=!1,a.menuClick=function(){a.navOpen=!a.navOpen}}]),angular.module("trenesMobile.services",[]).factory("paradas",["storageWrapper","$q",function(a,b){return{getParadas:function(){return a.getData("paradas","http://horarios-tren-data.nodejitsu.com/parada")},getParada:function(a){var c=b.defer();return this.getParadas().then(function(b){var d=_.find(b,function(b){return b.id===a});c.resolve(d)}),c.promise},filtrar:function(a){var c=b.defer();return this.getParadas().then(function(b){var d=_.filter(b,function(b){return _.contains(a,b.id)});c.resolve(d)}),c.promise}}}]),angular.module("trenesMobile.services").factory("rutas",["storageWrapper","horarios","$q","$timeout",function(a,b,c){return{getRutas:function(){return a.getData("rutas","http://horarios-tren-data.nodejitsu.com/ruta")},getRutasConHorariosActuales:function(){var a=c.defer();return this.getRutas().then(function(c){b.getHorariosActuales().then(function(b){_.each(c,function(a){a.horariosActuales=b[a.id]||[]}),a.resolve(c)})}),a.promise}}}]),angular.module("trenesMobile.services").factory("horarios",["storageWrapper","paradas","$q",function(a,b,c){var d={1:5,2:5,3:5,4:5,5:5,6:6,7:7,8:8,9:9,10:15,11:15,12:15,13:15,14:15,15:15,16:16,17:17,18:18,19:19,20:20,21:5,22:5,23:5,24:5},e={0:[0,30],30:[30,59]};return{getHorarios:function(){return a.getData("horarios","http://horarios-tren-data.nodejitsu.com/horario")},getHorariosActuales:function(){var a=c.defer(),f=moment().hours(),g=moment().minutes(),h=d[f],i=e[0];return f===h&&_.each(e,function(a){g>=a[0]&&g<=a[1]&&(i=a)}),15===h&&15!==f&&(i=e[0]),20===h&&g>30&&(i=e[30]),this.getHorarios().then(function(c){var d=_.filter(c,function(a){var b=a.tiempo.split(":"),c=_.parseInt(b[1]);return _.parseInt(b[0])===h&&c>=i[0]&&c<=i[1]});b.filtrar(_.pluck(d,"parada")).then(function(b){_.each(d,function(a){a.paradaObj=_.find(b,function(b){return b.id===a.parada})}),a.resolve(_.groupBy(_.sortBy(d,function(a){return 100*parseFloat(a.tiempo.replace(":","."))}),function(a){return a.ruta}))})}),a.promise}}}]),angular.module("trenesMobile.services").factory("user",["$q","$window","$rootScope",function(a,b,c){var d={timestamp:1396975380431,coords:{speed:null,heading:null,altitudeAccuracy:null,accuracy:36,altitude:null,longitude:-84.04992109999999,latitude:9.932789}};return{getUserPos:function(){var e=a.defer();return b.navigator&&b.navigator.geolocation?b.navigator.geolocation.getCurrentPosition(function(a){c.$apply(function(){e.resolve(a)})},function(a){console.log("ERROR: when geoloc..., sending default coords"+JSON.stringify(a)),c.$apply(function(){e.resolve(d)})}):e.resolve(d),e.promise}}}]),angular.module("trenesMobile.services").factory("storageWrapper",["$q","$http","$cacheFactory",function(a,b,c){return{getData:function(d,e){var f,g=a.defer(),h="tren-factory";return f=_.isUndefined(c.get(h))?c(h):c.get(h),_.isUndefined(f.get(d))?b.get(e).success(function(a){f.put(d,a),g.resolve(a)}).error(function(a){g.reject(a)}):g.resolve(f.get(d)),g.promise}}}]),angular.module("trenesMobile.directives",[]).directive("menuaction",["$window","$document","$location",function(a,b,c){return{templateUrl:"views/menu.html",restrict:"E",scope:{back:"&"},link:function(d,e){function f(){m.find(".main-cont").transition({x:0},500),k.transition({x:-i},500),l.transition({x:0},500),n=!1}function g(){m.find(".main-cont").transition({x:i},500),l.transition({x:i},500),k.transition({x:0},500),n=!0}var h=a.innerHeight,i=.7*a.innerWidth,j=(.3*a.innerWidth,e.find("#menu-icon")),k=(e.find(".menu-options"),e.find(".menu-here")),l=e.find(".pure-menu"),m=b.find("body"),n=!1,o=[];o.push("/"),d.$on("go",function(){o.push(c.path()),d.goback=o[o.length-2]}),d.$on("goBack",function(){o.length>1&&o.pop(),d.goback=o[o.length-2]}),d.showBack=!1,d.$on("$routeChangeSuccess",function(){d.showBack="/"!==c.path()?!0:!1}),k.height(h),k.width(i),k.transition({x:-i},0),j.bind("click",function(){n?f():(g(),m.find(".main-cont").bind("click",function(){f()}))})}}}]),angular.module("trenesMobile.controllers").controller("NearCtrl",["$scope","$routeParams","Paradas","User",function(a,b,c,d){var e=b.id,f=_.where(c,{id:e}),g=d.coords;a.map={center:{latitude:f[0].lat,longitude:f[0].lng,name:"paradaStatic"},markers:[{latitude:f[0].lat,longitude:f[0].lng,name:"paradaStatic"},{latitude:g.latitude,longitude:g.longitude,name:"userWatcher"}]}}]),angular.module("trenesMobile.directives").directive("fulldiv",["$window",function(a){return{restrict:"A",link:function(b,c){var d=a.innerHeight;c.height(d)}}}]),angular.module("trenesMobile.directives").directive("routeMap",["$timeout",function(a){return{scope:{objmap:"="},restrict:"A",link:function(b,c,d){function e(a){_.each(a,function(a){f.addMarker({lat:a.latitude,lng:a.longitude,title:a.name,click:function(){alert("You clicked in this marker")}})})}var f=new GMaps({div:"#"+d.id,lat:b.objmap.markers[1].latitude,lng:b.objmap.markers[1].longitude}),g=new google.maps.Marker({position:new google.maps.LatLng(b.objmap.markers[1].latitude,b.objmap.markers[1].longitude),title:"Your Location",draggable:!1,map:f.map});f.map.setCenter(g.getPosition());var h="custom_style",i=[{stylers:[{hue:"#007993"},{visibility:"on"},{gamma:1},{weight:2},{invert_lightness:!0}]},{featureType:"water",stylers:[{color:"#007993"}]},{featureType:"transit.line",stylers:[{color:"#BF4B4B"},{weight:5}]}],j={mapTypeControlOptions:{mapTypeIds:[google.maps.MapTypeId.ROADMAP,h]},mapTypeId:h},k={name:"Estilo Tren"},l=new google.maps.StyledMapType(i,k);f.map.setOptions(j),f.map.mapTypes.set(h,l),e(b.objmap.markers),f.travelRoute({origin:[b.objmap.markers[1].latitude,b.objmap.markers[1].longitude],destination:[b.objmap.center.latitude,b.objmap.center.longitude],travelMode:"driving",step:function(a){$("#instructions").append("<li>"+a.instructions+"</li>"),$("#instructions li:eq("+a.step_number+")").delay(550*a.step_number).fadeIn(200,function(){f.drawPolyline({path:a.path,strokeColor:"#BF4B4B",strokeOpacity:1,strokeWeight:5})})}});var m=_.where(f.markers,{title:"userWatcher"});a(function(){google.maps.event.trigger(f.map,"resize");var a=new google.maps.LatLngBounds;_.each(b.objmap.markers,function(b){a.extend(new google.maps.LatLng(b.latitude,b.longitude))}),f.map.fitBounds(a)},100);var n=navigator.geolocation.watchPosition(function(a){var b=new google.maps.LatLng(a.coords.latitude,a.coords.longitude);m[0].setPosition(b)});b.$on("$locationChangeStart",function(){navigator.geolocation.clearWatch(n)})}}}]),angular.module("trenesMobile.controllers").controller("ListahoraparadaCtrl",["$scope","$routeParams","HomeData",function(a,b,c){var d=b.id,e=!1;a.paradas=c.paradasData,a.rutas=c.rutasData,a.horario=c.horariosData,a.currentRuta=_.where(a.rutas,{id:d}),a.horarioList=_.where(a.horario,{ruta:d});var f=_.map(a.horarioList,function(b){var c=_.where(a.paradas,{id:b.parada}),d={paradaNombre:c[0].nombre,paradaId:c[0].id,tiempo:b.tiempo,sortHour:parseFloat(b.tiempo.replace(":","."))};return d});a.horasParadas=_.sortBy(f,"sortHour"),a.droppy=function(){if(e===!1){a.anim="fx-fade-down",e=!0;var b=1;a.rutaAmin=_.map(a.rutas,function(a){var c={nombre:a.nombre,id:a.id,speed:200*b++};return c})}else a.anim="fx-fade-up-big",e=!1,a.rutaAmin=[]}}]);