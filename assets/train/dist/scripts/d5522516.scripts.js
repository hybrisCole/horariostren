"use strict";angular.module("sprintMobile",["ngTouch","ngRoute","ngAnimate","angular-gestures","swiper","sprintMobile.controllers","sprintMobile.services","sprintMobile.directives"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"partials/home.html",controller:"IndexCtrl",resolve:{HomeData:["rutas","paradas","$q",function(a,b,c){var d=c.defer();return b.getParadas().then(function(b){a.getRutas().then(function(a){return d.resolve({rutasData:a,paradasData:b})})}),d.promise}],User:["user","$q",function(a,b){var c=b.defer();return a.getUserPos().then(function(a){return c.resolve(a)}),c.promise}]}}).when("/user",{templateUrl:"partials/user.html",controller:"UserCtrl"}).when("/phoneList",{templateUrl:"partials/phoneList.html",controller:"PhoneListCtrl"}).when("/phoneDetail/:id",{templateUrl:"partials/phoneDetail.html",controller:"PhoneDetailCtrl"}).when("/shoppingCart",{templateUrl:"partials/shoppingCart.html",controller:"ShoppingCartCtrl"}).when("/checkout",{templateUrl:"partials/checkout.html",controller:"CheckoutCtrl"}).when("/near/:id",{templateUrl:"views/near.html",controller:"NearCtrl",resolve:{Paradas:["paradas","$q",function(a,b){var c=b.defer();return a.getParadas().then(function(a){return c.resolve(a)}),c.promise}],User:["user","$q",function(a,b){var c=b.defer();return a.getUserPos().then(function(a){return c.resolve(a)}),c.promise}]}}).otherwise({redirectTo:"/"})}]).run(["$rootScope",function(a){a.displayViewChangeOverlay=!1,a.$on("$routeChangeStart",function(){a.displayViewChangeOverlay=!0}),a.$on("$routeChangeSuccess",function(){a.displayViewChangeOverlay=!1})}]),angular.module("sprintMobile.controllers",[]).controller("MainCtrl",["$scope","$rootScope","$window","$location",function(a,b,c,d){a.slideClass="gr",b.back=function(){a.slideClass="slide-right",c.history.back()},b.go=function(b){a.slideClass="slide-left",d.url(b)},b.goBack=function(b){a.slideClass="slide-right",d.url(b)}}]),angular.module("sprintMobile.controllers").controller("IndexCtrl",["$scope","HomeData","User",function(a,b,c){function d(a,b){var c=_.map(a,function(a){var c=6371,d=e(b.latitude-a.lat),f=e(b.longitude-a.lng),g=Math.sin(d/2)*Math.sin(d/2)+Math.cos(e(a.lat))*Math.cos(e(b.latitude))*Math.sin(f/2)*Math.sin(f/2),h=2*Math.atan2(Math.sqrt(g),Math.sqrt(1-g)),i=c*h,j={id:a.id,distance:i};return j});return c}function e(a){return a*Math.PI/180}a.paradas=b.paradasData,a.rutas=b.rutasData,a.showDrop=!1,a.slide="",a.showClosestSprintStore=!0,a.closeSprintStoreLocation=function(){a.showClosestSprintStore=!1};var f=d(a.paradas,c.coords),g=_.min(_.pluck(f,"distance")),h=_.where(f,{distance:g}),i=_.where(a.paradas,{id:h[0].id});a.near=i[0]}]),angular.module("sprintMobile.controllers").controller("MenuCtrl",["$scope",function(a){a.navOpen=!1,a.menuClick=function(){a.navOpen=!a.navOpen}}]),angular.module("sprintMobile.services",[]).factory("paradas",["$q","$http",function(a,b){return{getParadas:function(){var c=a.defer();return b.get("http://horarios-tren-data.nodejitsu.com/parada").success(function(a){c.resolve(a)}).error(function(a){c.reject(a)}),c.promise}}}]),angular.module("sprintMobile.services").factory("rutas",["$q","$http",function(a,b){return{getRutas:function(){var c=a.defer();return b.get("http://horarios-tren-data.nodejitsu.com/ruta").success(function(a){c.resolve(a)}).error(function(a){c.reject(a)}),c.promise}}}]),angular.module("sprintMobile.services").factory("user",["$q",function(a){return{getUserPos:function(){function b(a){c.resolve(a)}var c=a.defer();return navigator.geolocation?navigator.geolocation.getCurrentPosition(b):c.resolve("Geolocation is not supported for this Browser/OS version yet."),c.promise}}}]),angular.module("swiper",[]).directive("swiper",["$parse","$timeout",function(a,b){return{scope:{modelInfoData:"=modelInfo"},templateUrl:function(a,b){return b.template},link:function(c,d,e){console.log(c.modelInfoData),d.addClass("swipe");var f={};if(e.auto&&(f.auto=parseInt(e.auto,10)),e.startSlide&&(f.startSlide=parseInt(e.startSlide,10)),e.speed&&(f.speed=parseInt(e.speed,10)),e.onSlideEnd){var g=a(e.onSlideEnd);f.callback=function(a,b,d){c.$apply(function(){g(c,{index:b,slide:d})})}}var h=e.swiper||"swiper";b(function(){var a=new Swipe(d[0],f);c[h]=a})}}}]),angular.module("sprintMobile.directives",[]).directive("tileBuilder",["$parse","$timeout","$rootScope",function(a,b,c){return{scope:{modelInfoData:"=modelInfo",itemClass:"@itemClass"},templateUrl:function(a,b){return b.template},link:function(a,d){b(function(){var a=0;d.find(".item-data").each(function(b,c){a+=$(c).outerWidth(!0)}),d.find(".items-tile").width(a)},2e3),a.goToPhone=function(a){c.go("/phoneDetail/"+a)}}}}]),angular.module("sprintMobile").directive("menuaction",["$window","$document",function(a,b){return{templateUrl:"partials/menu.html",restrict:"E",link:function(c,d){function e(){l.find(".main-cont").animate({marginLeft:"0px"},500),k.animate({marginLeft:"0px"},500,function(){j.removeClass("menu-options")}),m=!1}function f(){l.find(".main-cont").animate({marginLeft:h+"px"},500),k.animate({marginLeft:h+"px"},500),j.addClass("menu-options"),m=!0}var g=a.innerHeight,h=.7*a.innerWidth,i=d.find("#menu-icon"),j=(d.find(".menu-options"),d.find(".menu-here")),k=d.find(".pure-menu"),l=b.find("body"),m=!1;j.height(g),j.width(h),i.bind("click",function(){m?e():(f(),l.find(".main-cont").bind("click",function(){e()}))})}}}]),angular.module("sprintMobile.controllers").controller("NearCtrl",["$scope","$routeParams","Paradas","User",function(a,b,c,d){var e=b.id,f=_.where(c,{id:e}),g=d.coords;a.map={center:{latitude:f[0].lat,longitude:f[0].lng},markers:[{latitude:f[0].lat,longitude:f[0].lng},{latitude:g.latitude,longitude:g.longitude}]}}]),angular.module("sprintMobile.directives").directive("fulldiv",["$window",function(a){return{restrict:"A",link:function(b,c){var d=a.innerHeight;c.height(d)}}}]),angular.module("sprintMobile.directives").directive("routeMap",["$interval",function(){return{scope:{objmap:"="},restrict:"A",link:function(a,b,c){function d(a){_.each(a,function(a){e.addMarker({lat:a.latitude,lng:a.longitude,title:"Lima",click:function(){alert("You clicked in this marker")}})})}console.log(a.objmap);var e=new GMaps({div:"#"+c.id,lat:a.objmap.markers[1].latitude,lng:a.objmap.markers[1].longitude});e.setZoom(16),console.log(e.controls),d(a.objmap.markers),e.travelRoute({origin:[a.objmap.markers[1].latitude,a.objmap.markers[1].longitude],destination:[a.objmap.center.latitude,a.objmap.center.longitude],travelMode:"driving",step:function(a){$("#instructions").append("<li>"+a.instructions+"</li>"),$("#instructions li:eq("+a.step_number+")").delay(550*a.step_number).fadeIn(200,function(){e.setCenter(a.end_location.lat(),a.end_location.lng()),e.drawPolyline({path:a.path,strokeColor:"#BF4B4B",strokeOpacity:1,strokeWeight:5})})}})}}}]);