(function () {
'use strict'
  
  angular.module('data')  
  .service ('menu-data-service', MenuDataService);
  
  MenuDataService.$inject = ["$http"];
  
  function MenuDataService($http) {
    
     var menuDataService = this;
     
     menuDataService.getAllCategories = function () {
       return $http({
         method: 'GET',
         url   : 'https://davids-restaurant.herokuapp.com/categories.json'
       }).then(function (result) { return result.data; });
       
     }
     
     menuDataService.getItemsForCategory = function (categoryShortName) {
       return $http({
         method: 'GET',
         url   : 'https://davids-restaurant.herokuapp.com/menu_items.json',
         datavv: {category: categoryShortName}
       }).then(function (result) { return result.data.menu_items; });
       
     }
    
  }
  
})();