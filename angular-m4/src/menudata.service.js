(function () {
'use strict'
  
  angular.module('data')  
  .service ('MenuDataService', MenuDataService);
  
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
         params: {category: categoryShortName}
       }).then(function (result) { 
          //console.log(result.data.category);
          //console.log(result.data.menu_items);
          return result.data; });
       
     }
    
  }
  
})();