(function(){
	'user strict';


 	angular.module('public')
  		.controller('MyInfoController', MyInfoController);


  	MyInfoController.$inject = ['item', 'SignUpService'];


  	function MyInfoController(item, SignUpService) {
  		var info = this;
  		info.registered = SignUpService.hasCredential();
  		info.credential = SignUpService.getCredential ();
  		info.item = item;
  	}

})();