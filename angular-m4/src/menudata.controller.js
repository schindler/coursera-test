(function(){
	'use strict';
  
  angular.module('MenuApp')  
  .controller ('MenuDataController', MenuDataController);
  
  MenuDataController.$inject = ['items'];
   
  function MenuDataController (items) {
    var data = this;
    data.items = items; 
  }
  
})();