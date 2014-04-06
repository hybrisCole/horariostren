'use strict';

angular.module('sprintMobile', [
    'ngTouch',
    'ngRoute',
    'ngAnimate',
    'angular-gestures',
    'swiper',
    'sprintMobile.controllers',
    'sprintMobile.services',
    'sprintMobile.directives'
  ]).
  config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl : 'partials/home.html', 
        controller  : 'IndexCtrl',
        resolve     : {
          HomeData :['rutas','paradas','horarios','$q',function(rutas,paradas,horarios, $q) {
            var defer = $q.defer();
            paradas.getParadas().then(function(paradasData){
              rutas.getRutas().then(function(rutasData){
                horarios.getHorarios().then(function(horariosData){
                  return defer.resolve({rutasData:rutasData,paradasData:paradasData,horariosData:horariosData});
                });
              });
            });
            return defer.promise;
          }],
          User : ['user','$q',function(user, $q) {
            var defer = $q.defer();
            user.getUserPos().then(function(data){
              return defer.resolve(data);
            });
            return defer.promise;
          }]
        }
      })
      .when('/user', {templateUrl: 'partials/user.html', controller: 'UserCtrl'})
      .when('/phoneList', {templateUrl: 'partials/phoneList.html', controller: 'PhoneListCtrl'})
      .when('/phoneDetail/:id', {templateUrl: 'partials/phoneDetail.html', controller: 'PhoneDetailCtrl'})
      .when('/shoppingCart', {templateUrl: 'partials/shoppingCart.html', controller: 'ShoppingCartCtrl'})
      .when('/checkout', {templateUrl: 'partials/checkout.html', controller: 'CheckoutCtrl'})
      .when('/near/:id', {
        templateUrl: 'views/near.html',
        controller: 'NearCtrl',
        resolve     : {
          Paradas : ['paradas','$q',function(paradas, $q) {
            var defer = $q.defer();
            paradas.getParadas().then(function(data){
              return defer.resolve(data);
            });
            return defer.promise;
          }],
          User : ['user','$q',function(user, $q) {
            var defer = $q.defer();
            user.getUserPos().then(function(data){
              return defer.resolve(data);
            });
            return defer.promise;
          }]
        }
      })
      .otherwise({redirectTo: '/'});
  }]).run(['$rootScope',function($rootScope){
    $rootScope.displayViewChangeOverlay = false;
    $rootScope.$on( "$routeChangeStart", function (event, next, current){
      $rootScope.displayViewChangeOverlay = true;
    });
    $rootScope.$on( "$routeChangeSuccess", function (event, current, previous){
      $rootScope.displayViewChangeOverlay = false;
    });
  }]);