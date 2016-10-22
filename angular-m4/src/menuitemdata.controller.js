(function(){
	'use strict';
  
  angular.module('MenuApp')  
  .controller ('MenuItemDataController', MenuItemDataController);
  
  MenuItemDataController.$inject = ['items', '$state'];
   
  function MenuItemDataController (items, $state) {
      this.items   =items.menu_items; 
      this.category=items.category;                                
      if (undefined == this.category)
        $state.go('home');
  }
  
})();