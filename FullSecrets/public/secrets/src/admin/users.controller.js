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
	}

})();