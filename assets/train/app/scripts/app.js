'use strict';

angular.module('trenesMobile', [
    'ngTouch',
    'ngRoute',
    'ngAnimate',
    'angular-gestures',
    'swiper',
    'trenesMobile.controllers',
    'trenesMobile.services',
    'trenesMobile.directives'
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
                  defer.resolve({rutasData:rutasData,paradasData:paradasData,horariosData:horariosData});
                });
              });
            });
            return defer.promise;
          }],
          User : ['user','$q',function(user, $q) {
            var defer = $q.defer();
            alert('USER');
            user.getUserPos().then(function(data){
              alert(JSON.stringify(data));
              defer.resolve(data);
            },function(data){
              alert(JSON.stringify(data));
              //en caso de error, devolviendo un objeto por defecto Con la posicion de la choza de Cali
              defer.resolve({"timestamp":1396975380431,"coords":{"speed":null,"heading":null,"altitudeAccuracy":null,"accuracy":36,"altitude":null,"longitude":-84.04992109999999,"latitude":9.932789}});
            });
            return defer.promise;
          }]
        }
      })
      .when('/near/:id', {
        templateUrl: 'views/near.html',
        controller: 'NearCtrl',
        resolve     : {
          Paradas : ['paradas','$q',function(paradas, $q) {
            var defer = $q.defer();
            paradas.getParadas().then(function(data){
              defer.resolve(data);
            });
            return defer.promise;
          }],
          User : ['user','$q',function(user, $q) {
            var defer = $q.defer();
            user.getUserPos().then(function(data){
              defer.resolve(data);
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