"use strict";angular.module("sprintMobile",["ngTouch","ngRoute","ngAnimate","angular-gestures","swiper","google-maps","sprintMobile.controllers","sprintMobile.services","sprintMobile.directives"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"partials/home.html",controller:"IndexCtrl",resolve:{Paradas:function(a,b){var c=b.defer();return a.getParadas().then(function(a){return c.resolve(a)}),c.promise}}}).when("/user",{templateUrl:"partials/user.html",controller:"UserCtrl"}).when("/phoneList",{templateUrl:"partials/phoneList.html",controller:"PhoneListCtrl"}).when("/phoneDetail/:id",{templateUrl:"partials/phoneDetail.html",controller:"PhoneDetailCtrl"}).when("/shoppingCart",{templateUrl:"partials/shoppingCart.html",controller:"ShoppingCartCtrl"}).when("/checkout",{templateUrl:"partials/checkout.html",controller:"CheckoutCtrl"}).when("/near/:id",{templateUrl:"views/near.html",controller:"NearCtrl",resolve:{Paradas:function(a,b){var c=b.defer();return a.getParadas().then(function(a){return c.resolve(a)}),c.promise}}}).otherwise({redirectTo:"/"})}]).run(["$rootScope",function(a){a.displayViewChangeOverlay=!1,a.$on("$routeChangeStart",function(){a.displayViewChangeOverlay=!0}),a.$on("$routeChangeSuccess",function(){a.displayViewChangeOverlay=!1})}]),angular.module("sprintMobile.controllers",[]).controller("MainCtrl",["$scope","$rootScope","$window","$location",function(a,b,c,d){a.slideClass="gr",b.back=function(){a.slideClass="slide-right",c.history.back()},b.go=function(b){a.slideClass="slide-left",d.url(b)},b.goBack=function(b){a.slideClass="slide-right",d.url(b)}}]),angular.module("sprintMobile.controllers").controller("IndexCtrl",["$scope","PhoneFactory","TabletBundleFactory","Paradas",function(a,b,c,d){a.paradas=d,a.showDrop=!1,a.slide="",a.showClosestSprintStore=!0,a.phoneCategories=b.phoneCategories(),a.tabletBundleCategories=c.tabletBundleCategories(),a.iPhoneAccessories=b.iPhoneAccessories();var e=_.random(0,a.paradas.length-1);a.near=a.paradas[e],a.closeSprintStoreLocation=function(){a.showClosestSprintStore=!1},a.openDrop=function(){a.showDrop=a.showDrop?!1:!0}}]),angular.module("sprintMobile.controllers").controller("UserCtrl",["$scope",function(a){a.missedPayment=[!0,!0],a.closeMissedPayment=function(b){a.missedPayment[b]=!1}}]),angular.module("sprintMobile.controllers").controller("SwipeTestCtrl",["$scope","PhoneFactory",function(a,b){a.slide="",a.phoneCategories=b.phoneCategories(),console.log(a.phoneCategories)}]),angular.module("sprintMobile.controllers").controller("MenuCtrl",["$scope",function(a){a.navOpen=!1,a.menuClick=function(){a.navOpen=!a.navOpen}}]),angular.module("sprintMobile.controllers").controller("PhoneListCtrl",["$scope","PhoneFactory",function(a,b){a.phoneList=b.phoneData()}]),angular.module("sprintMobile.controllers").controller("PhoneDetailCtrl",["$scope","PhoneFactory",function(a){a.capacity16=!0,a.productDetail={quantity:1},a.setCapacity=function(b){a.capacity16=b},a.addOneProduct=function(){a.productDetail.quantity+=1},a.lessOneProduct=function(){0!=a.productDetail.quantity&&(a.productDetail.quantity-=1)}}]),angular.module("sprintMobile.controllers").controller("ShoppingCartCtrl",["$scope","ShoppingCartFactory",function(a,b){a.bundleData=b.bundleWith(),a.alsoBrough=b.alsoBrough()}]),angular.module("sprintMobile.controllers").controller("CheckoutCtrl",["$scope",function(a){function b(){a.planSectionActive||a.serviceSectionActive||a.numberSectionActive||(a.billingPaymentSectionActive=!0)}function c(a,c){b(),angular.forEach(a,function(b,c){a[c].value=!1}),a[c].value=!0}a.planSectionActive=!0,a.serviceSectionActive=!1,a.numberSectionActive=!1,a.billingPaymentSectionActive=!1,a.plans=[{value:!1,price:50,title:"Sprint Framily Plan",copy:"Unlimited talk, text and data"}],a.services=[{value:!1,price:11,title:"Total Device Protection",copy:"Covers virtually anything that can happen to your device, including loss and theft"},{value:!1,price:99,title:"Apple Care",copy:""},{value:!1,price:0,title:"None",copy:""}],a.numbers=[{value:!1,title:"I want a new phone number"},{value:!1,title:"Bring your number"}],a.selectPlan=function(b){a.planSectionActive=!1,a.selectedPlan||(a.serviceSectionActive=!0),a.selectedPlan=a.plans[b],c(a.plans,b)},a.activatePlanSection=function(){a.planSectionActive=!0,a.serviceSectionActive=!1,a.numberSectionActive=!1,a.billingPaymentSectionActive=!1},a.selectService=function(b){a.serviceSectionActive=!1,a.selectedService||(a.numberSectionActive=!0),a.selectedService=a.services[b],c(a.services,b)},a.activateServiceSection=function(){a.planSectionActive=!1,a.serviceSectionActive=!0,a.numberSectionActive=!1,a.billingPaymentSectionActive=!1},a.selectNumber=function(b){a.numberSectionActive=!1,a.selectedNumber||(a.billingPaymentSectionActive=!0),a.selectedNumber=a.numbers[b],c(a.numbers,b)},a.activateNumberSection=function(){a.planSectionActive=!1,a.serviceSectionActive=!1,a.numberSectionActive=!0,a.billingPaymentSectionActive=!1}}]),angular.module("sprintMobile.services",[]).factory("PhoneFactory",[function(){var a=[{name:"iPhones 5s",image:"images/iphone5s_cat.jpg"},{name:"iPhones 5c",image:"images/iphone5c_cat.jpg"},{name:"iPhones",image:"images/iphones_cat.jpg"},{name:"Android",image:"images/android_cat.jpg"},{name:"Blackberry",image:"images/blackberry_cat.jpg"},{name:"All Smart Phones",image:"images/all_smart_phones_cat.jpg"},{name:"Basic",image:"images/basic_cat.jpg"}],b=[{name:"Dexim Premium AV Adapter",image:"images/iphone_acc_1.jpg"},{name:"Dexim Visible-G Charge & Sync Cable",image:"images/iphone_acc_2.jpg"},{name:"Vehicle Charger",image:"images/iphone_acc_3.jpg"}],c=[{id:1,name:"Apple iPhone 5s",stars:3,price:99,comments:8,photo:{path:"product_iphone5s.jpg",width:"119",height:"142"}},{id:2,name:"Apple iPhone 5c",stars:3,price:0,comments:8,photo:{path:"product_iphone5c.jpg",width:"128",height:"137"}},{id:3,name:"Google Nexus 5",stars:3,price:99,comments:8,photo:{path:"product_nexus5.jpg",width:"137",height:"136"}}];return{phoneCategories:function(){return a},iPhoneAccessories:function(){return b},phoneData:function(){return c}}}]),angular.module("sprintMobile.services").factory("TabletBundleFactory",[function(){var a=[{name:"Apple iPad mini Retina Display",image:"images/ipad_mini_cat.jpg"},{name:"iPad Air",image:"images/ipad_air_cat.jpg"},{name:"iPad 2",image:"images/ipad2_cat.jpg"},{name:"Galaxy Tab 3",image:"images/galaxy_tab_cat.jpg"}];return{tabletBundleCategories:function(){return a}}}]),angular.module("sprintMobile.services").factory("ShoppingCartFactory",[function(){var a=[{name:"Lighting to USB Cable (1M)",image:"images/product_apple_lighting_usb.jpg"},{name:"Nike+ FuelBand SE",image:"images/product_nike_fuelband.jpg"},{name:"Apple 5W Power Adapter",image:"images/product_apple_5wpower.jpg"},{name:"Belkin Dual Car Charger",image:"images/product_belkin_dual_charger.jpg"}],b=[{name:"iPhone 5c Case (Black)",image:"images/product_apple_iphone5c_black_case.jpg"},{name:"Bose Soundlink Mini Bluetooth Speakers",image:"images/product_bose_soundlink_mini.jpg"},{name:"iPhone 5c Dock",image:"images/product_apple_iphone5c_dock.jpg"}];return{bundleWith:function(){return a},alsoBrough:function(){return b}}}]),angular.module("sprintMobile.services").factory("paradas",function(a,b){return{getParadas:function(){var c=a.defer();return b.get("http://horarios-tren-data.nodejitsu.com/parada").success(function(a){c.resolve(a)}),c.promise}}}),angular.module("swiper",[]).directive("swiper",["$parse","$timeout",function(a,b){return{scope:{modelInfoData:"=modelInfo"},templateUrl:function(a,b){return b.template},link:function(c,d,e){console.log(c.modelInfoData),d.addClass("swipe");var f={};if(e.auto&&(f.auto=parseInt(e.auto,10)),e.startSlide&&(f.startSlide=parseInt(e.startSlide,10)),e.speed&&(f.speed=parseInt(e.speed,10)),e.onSlideEnd){var g=a(e.onSlideEnd);f.callback=function(a,b,d){c.$apply(function(){g(c,{index:b,slide:d})})}}var h=e.swiper||"swiper";b(function(){var a=new Swipe(d[0],f);c[h]=a})}}}]),angular.module("sprintMobile.directives",[]).directive("tileBuilder",["$parse","$timeout","$rootScope",function(a,b,c){return{scope:{modelInfoData:"=modelInfo",itemClass:"@itemClass"},templateUrl:function(a,b){return b.template},link:function(a,d){b(function(){var a=0;d.find(".item-data").each(function(b,c){a+=$(c).outerWidth(!0)}),d.find(".items-tile").width(a)},2e3),a.goToPhone=function(a){c.go("/phoneDetail/"+a)}}}}]),angular.module("sprintMobile").directive("menuaction",function(a,b){return{templateUrl:"../partials/menu.html",restrict:"E",link:function(c,d){function e(){l.find(".main-cont").animate({marginLeft:"0px"},500),k.animate({marginLeft:"0px"},500,function(){j.removeClass("menu-options")}),m=!1}function f(){l.find(".main-cont").animate({marginLeft:h+"px"},500),k.animate({marginLeft:h+"px"},500),j.addClass("menu-options"),m=!0}var g=a.innerHeight,h=a.innerWidth/2,i=d.find("#menu-icon"),j=(d.find(".menu-options"),d.find(".menu-here")),k=d.find(".pure-menu"),l=b.find("body"),m=!1;j.height(g),j.width(h),i.bind("click",function(){m?e():(f(),l.find(".main-cont").bind("click",function(){e()}))})}}}),angular.module("sprintMobile").directive("videojs",function(a,b,c){return{restrict:"A",link:function(d,e){if("/"===c.$$path)if(b.find("body #big-video-wrap").length>0)b.find("body #big-video-wrap").show();else{var f=new $.BigVideo;f.init(),f.show("http://vjs.zencdn.net/v/oceans.mp4"),e.height(a.innerHeight)}else b.find("body #big-video-wrap").hide()}}}),angular.module("sprintMobile.controllers").controller("NearCtrl",function(a,b,c){var d=b.id,e=_.where(c,{id:d});a.map={center:{latitude:e[0].lat,longitude:e[0].lng},marker:{latitude:e[0].lat,longitude:e[0].lng},polyline:{visible:!0,editable:!0},zoom:16}}),angular.module("sprintMobile.directives").directive("fulldiv",function(a){return{restrict:"A",link:function(b,c){var d=a.innerHeight;c.height(d-50),c.find(".angular-google-map-container").height(d-50)}}});