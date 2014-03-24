'use strict';

angular.module('sprintMobile.services',[])
  .factory('PhoneFactory',[
    function() {

      var phoneCategoryData = [
        {name:'iPhones 5s',image:'images/iphone5s_cat.jpg'},
        {name:'iPhones 5c',image:'images/iphone5c_cat.jpg'},
        {name:'iPhones',image:'images/iphones_cat.jpg'},
        {name:'Android',image:'images/android_cat.jpg'},
        {name:'Blackberry',image:'images/blackberry_cat.jpg'},
        {name:'All Smart Phones',image:'images/all_smart_phones_cat.jpg'},
        {name:'Basic',image:'images/basic_cat.jpg'}
      ];

      var iPhoneAccessoriesData = [
        {name:'Dexim Premium AV Adapter',image:'images/iphone_acc_1.jpg'},
        {name:'Dexim Visible-G Charge & Sync Cable',image:'images/iphone_acc_2.jpg'},
        {name:'Vehicle Charger',image:'images/iphone_acc_3.jpg'}
      ];

      var phonesListData = [
        {
          id:1,
          name: 'Apple iPhone 5s',
          stars: 3,
          price: 99,
          comments:8,
          photo: {
            path:'product_iphone5s.jpg',
            width:'119',
            height:'142'
          }
        },
        {
          id:2,
          name: 'Apple iPhone 5c',
          stars: 3,
          price: 0.00,
          comments:8,
          photo: {
            path:'product_iphone5c.jpg',
            width:'128',
            height:'137'
          }
        },
        {
          id:3,
          name: 'Google Nexus 5',
          stars: 3,
          price: 99,
          comments:8,
          photo: {
            path:'product_nexus5.jpg',
            width:'137',
            height:'136'
          }
        }
      ];

      return {
        phoneCategories: function() {
          return phoneCategoryData;
        },
        iPhoneAccessories:  function(){
          return iPhoneAccessoriesData;
        },
        phoneData: function(){
          return phonesListData;
        }
      };
    }]);