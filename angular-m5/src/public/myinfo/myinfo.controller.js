(function(){
	'user strict';


 	angular.module('public')
  		.controller('MyInfoController', MyInfoController);


  	MyInfoController.$inject = ['menu', 'SignUpService'];


  	function MyInfoController(menu, SignUpService) {
  		var info = this;
  		info.registered = SignUpService.hasCredential();
  		info.credential = SignUpService.getCredential ();
  		if (menu.menu_items)
  		   info.item = $.grep(menu.menu_items, function(item){ return item.short_name === info.credential.fmenu; })[0];
  	}

})();