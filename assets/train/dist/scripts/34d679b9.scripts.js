"use strict";angular.module("trenesMobile",["ngTouch","ngRoute","ngAnimate","angular-gestures","swiper","trenesMobile.controllers","trenesMobile.services","trenesMobile.directives"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"partials/home.html",controller:"IndexCtrl",resolve:{HomeData:["rutas","paradas","horarios","$q",function(a,b,c,d){var e=d.defer();return b.getParadas().then(function(b){a.getRutas().then(function(a){c.getHorarios().then(function(c){e.resolve({rutasData:a,paradasData:b,horariosData:c})})})}),e.promise}],User:["user","$q",function(a,b){var c=b.defer();return alert("USER"),a.getUserPos().then(function(a){alert(JSON.stringify(a)),c.resolve(a)},function(a){alert(JSON.stringify(a)),c.resolve({timestamp:1396975380431,coords:{speed:null,heading:null,altitudeAccuracy:null,accuracy:36,altitude:null,longitude:-84.04992109999999,latitude:9.932789}})}),c.promise}]}}).when("/near/:id",{templateUrl:"views/near.html",controller:"NearCtrl",resolve:{Paradas:["paradas","$q",function(a,b){var c=b.defer();return a.getParadas().then(function(a){c.resolve(a)}),c.promise}],User:["user","$q",function(a,b){var c=b.defer();return a.getUserPos().then(function(a){c.resolve(a)}),c.promise}]}}).otherwise({redirectTo:"/"})}]).run(["$rootScope",function(a){a.displayViewChangeOverlay=!1,a.$on("$routeChangeStart",function(){a.displayViewChangeOverlay=!0}),a.$on("$routeChangeSuccess",function(){a.displayViewChangeOverlay=!1})}]),angular.module("trenesMobile.controllers",[]).controller("MainCtrl",["$scope","$rootScope","$window","$location",function(a,b,c,d){a.slideClass="gr",b.back=function(){a.slideClass="slide-right",c.history.back()},b.go=function(b){a.slideClass="slide-left",d.url(b)},b.goBack=function(b){a.slideClass="slide-right",d.url(b)}}]),angular.module("trenesMobile.controllers").controller("IndexCtrl",["$scope","HomeData","User",function(a,b,c){function d(a,b){var c=_.map(a,function(a){var c=6371,d=e(b.latitude-a.lat),f=e(b.longitude-a.lng),g=Math.sin(d/2)*Math.sin(d/2)+Math.cos(e(a.lat))*Math.cos(e(b.latitude))*Math.sin(f/2)*Math.sin(f/2),h=2*Math.atan2(Math.sqrt(g),Math.sqrt(1-g)),i=c*h,j={id:a.id,distance:i};return j});return c}function e(a){return a*Math.PI/180}console.log(JSON.stringify(c)),a.paradas=b.paradasData,a.rutas=b.rutasData,a.showDrop=!1,a.slide="",a.showClosestSprintStore=!0,a.closeSprintStoreLocation=function(){a.showClosestSprintStore=!1};var f=d(a.paradas,c.coords),g=_.min(_.pluck(f,"distance")),h=_.where(f,{distance:g}),i=_.where(a.paradas,{id:h[0].id});a.near=i[0]}]),angular.module("trenesMobile.controllers").controller("MenuCtrl",["$scope",function(a){a.navOpen=!1,a.menuClick=function(){a.navOpen=!a.navOpen}}]),angular.module("trenesMobile.services",[]).factory("paradas",["storageWrapper",function(a){return{getParadas:function(){return a.getData("paradas","http://horarios-tren-data.nodejitsu.com/parada")}}}]),angular.module("trenesMobile.services").factory("rutas",["storageWrapper",function(a){return{getRutas:function(){return a.getData("rutas","http://horarios-tren-data.nodejitsu.com/ruta")}}}]),angular.module("trenesMobile.services").factory("horarios",["storageWrapper",function(a){return{getHorarios:function(){return a.getData("horarios","http://horarios-tren-data.nodejitsu.com/horario")}}}]),angular.module("trenesMobile.services").factory("user",["$q","$window","$rootScope",function(a,b,c){return{getUserPos:function(){var d=a.defer();return b.navigator&&b.navigator.geolocation&&b.navigator.geolocation.getCurrentPosition(function(a){c.$apply(function(){alert(JSON.stringify(a)),d.resolve(a)})},function(a){c.$apply(function(){alert(JSON.stringify(a)),d.reject(a)})}),d.promise}}}]),angular.module("trenesMobile.services").factory("storageWrapper",["$q","$http",function(a,b){return{getData:function(c,d){var e=a.defer(),f=JSON.parse(localStorage.getItem(c));return _.isNull(f)?b.get(d).success(function(a){localStorage.setItem(c,JSON.stringify(a)),e.resolve(a)}).error(function(a){e.reject(a)}):e.resolve(f),e.promise}}}]),angular.module("swiper",[]).directive("swiper",["$parse","$timeout",function(a,b){return{scope:{modelInfoData:"=modelInfo"},templateUrl:function(a,b){return b.template},link:function(c,d,e){console.log(c.modelInfoData),d.addClass("swipe");var f={};if(e.auto&&(f.auto=parseInt(e.auto,10)),e.startSlide&&(f.startSlide=parseInt(e.startSlide,10)),e.speed&&(f.speed=parseInt(e.speed,10)),e.onSlideEnd){var g=a(e.onSlideEnd);f.callback=function(a,b,d){c.$apply(function(){g(c,{index:b,slide:d})})}}var h=e.swiper||"swiper";b(function(){var a=new Swipe(d[0],f);c[h]=a})}}}]),angular.module("trenesMobile.directives",[]).directive("tileBuilder",["$parse","$timeout","$rootScope",function(a,b,c){return{scope:{modelInfoData:"=modelInfo",itemClass:"@itemClass"},templateUrl:function(a,b){return b.template},link:function(a,d){b(function(){var a=0;d.find(".item-data").each(function(b,c){a+=$(c).outerWidth(!0)}),d.find(".items-tile").width(a)},2e3),a.goToPhone=function(a){c.go("/phoneDetail/"+a)}}}}]),angular.module("trenesMobile.directives").directive("menuaction",["$window","$document",function(a,b){return{templateUrl:"partials/menu.html",restrict:"E",link:function(c,d){function e(){l.find(".main-cont").animate({marginLeft:"0px"},500),k.animate({marginLeft:"0px"},500,function(){j.removeClass("menu-options")}),m=!1}function f(){l.find(".main-cont").animate({marginLeft:h+"px"},500),k.animate({marginLeft:h+"px"},500),j.addClass("menu-options"),m=!0}var g=a.innerHeight,h=.7*a.innerWidth,i=d.find("#menu-icon"),j=(d.find(".menu-options"),d.find(".menu-here")),k=d.find(".pure-menu"),l=b.find("body"),m=!1;j.height(g),j.width(h),i.bind("click",function(){m?e():(f(),l.find(".main-cont").bind("click",function(){e()}))})}}}]),angular.module("trenesMobile.controllers").controller("NearCtrl",["$scope","$routeParams","Paradas","User",function(a,b,c,d){var e=b.id,f=_.where(c,{id:e}),g=d.coords;a.map={center:{latitude:f[0].lat,longitude:f[0].lng},markers:[{latitude:f[0].lat,longitude:f[0].lng},{latitude:g.latitude,longitude:g.longitude}]}}]),angular.module("trenesMobile.directives").directive("fulldiv",["$window",function(a){return{restrict:"A",link:function(b,c){var d=a.innerHeight;c.height(d)}}}]),angular.module("trenesMobile.directives").directive("routeMap",["$interval",function(){return{scope:{objmap:"="},restrict:"A",link:function(a,b,c){function d(a){_.each(a,function(a){e.addMarker({lat:a.latitude,lng:a.longitude,title:"Lima",click:function(){alert("You clicked in this marker")}})})}console.log(a.objmap);var e=new GMaps({div:"#"+c.id,lat:a.objmap.markers[1].latitude,lng:a.objmap.markers[1].longitude});e.setZoom(16),console.log(e.controls),d(a.objmap.markers),e.travelRoute({origin:[a.objmap.markers[1].latitude,a.objmap.markers[1].longitude],destination:[a.objmap.center.latitude,a.objmap.center.longitude],travelMode:"driving",step:function(a){$("#instructions").append("<li>"+a.instructions+"</li>"),$("#instructions li:eq("+a.step_number+")").delay(550*a.step_number).fadeIn(200,function(){e.setCenter(a.end_location.lat(),a.end_location.lng()),e.drawPolyline({path:a.path,strokeColor:"#BF4B4B",strokeOpacity:1,strokeWeight:5})})}})}}}]);