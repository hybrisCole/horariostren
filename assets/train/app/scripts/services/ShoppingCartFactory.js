'use strict';

angular.module('sprintMobile.services')
  .factory('ShoppingCartFactory',[
    function() {

      var bundleWithData = [
        {name:'Lighting to USB Cable (1M)',image:'images/product_apple_lighting_usb.jpg'},
        {name:'Nike+ FuelBand SE',image:'images/product_nike_fuelband.jpg'},
        {name:'Apple 5W Power Adapter',image:'images/product_apple_5wpower.jpg'},
        {name:'Belkin Dual Car Charger',image:'images/product_belkin_dual_charger.jpg'}
      ];

      var alsoBroughtData = [
        {name:'iPhone 5c Case (Black)',image:'images/product_apple_iphone5c_black_case.jpg'},
        {name:'Bose Soundlink Mini Bluetooth Speakers',image:'images/product_bose_soundlink_mini.jpg'},
        {name:'iPhone 5c Dock',image:'images/product_apple_iphone5c_dock.jpg'},
      ]

      return {
        bundleWith: function() {
          return bundleWithData;
        },
        alsoBrough: function() {
          return alsoBroughtData;
        },
      };
    }]);