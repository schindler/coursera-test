(function(){
	"use strict";
	angular
	.module('secretAdmin')
	.controller('UserController', UserController);


	UserController.$inject = ["users"];

	function UserController(users) {
		var ctrl = this;
		ctrl.users = users;
		ctrl.filter="";
	    

	    ctrl.getFilteredUsers=function(){
			if (ctrl.filter.trim().length > 0) {
				return $.grep(ctrl.users, function( user, i ) {
				  return user.name.toLowerCase().indexOf(ctrl.filter.toLowerCase()) !== -1;
				});
			} else {
				return ctrl.users;
			}
		};

	}

})();