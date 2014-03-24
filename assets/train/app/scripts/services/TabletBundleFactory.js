'use strict';

angular.module('sprintMobile.services')
  .factory('TabletBundleFactory',[
    function() {

      var tabletBundleCategoryData = [
        {name:'Apple iPad mini Retina Display',image:'images/ipad_mini_cat.jpg'},
        {name:'iPad Air',image:'images/ipad_air_cat.jpg'},
        {name:'iPad 2',image:'images/ipad2_cat.jpg'},
        {name:'Galaxy Tab 3',image:'images/galaxy_tab_cat.jpg'}
      ];

      return {
        tabletBundleCategories: function() {
          return tabletBundleCategoryData;
        }
      };
    }]);