(function(){
'use strict';


angular.module('public')
  .controller('SignupController', SignupController);

 SignupController.$inject = ['menuItems'];
 function SignupController (menuItems) {
 	var $ctrl = this;
 	$ctrl.first_name = "";
 	$ctrl.last_name = "";
 	$ctrl.email="";
 	$ctrl.phone="";
 	$ctrl.fmenu="";
  $ctrl.smenu={};
 	$ctrl.items=menuItems.menu_items;

 	$ctrl.ckeckItem = function (form) { 
    if ( $ctrl.fmenu != undefined && $ctrl.fmenu.length > 0 ){
      var v = $ctrl.fmenu.toLowerCase();
   		var s = $.grep($ctrl.items, function(item){ return item.short_name.toLowerCase() === v; });
      form.fmenu.$setValidity("no-item", s.length>0);
      if ( s.length>0 ){
        $ctrl.smenu = s[0];
        $ctrl.fmenu = $ctrl.smenu.short_name;
      }
    }
 	}

 }


})();
