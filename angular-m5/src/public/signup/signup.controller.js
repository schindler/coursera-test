(function(){
'use strict';


angular.module('public')
  .controller('SignupController', SignupController);

 SignupController.$inject = ['menuItems', 'SignUpService'];
 function SignupController (menuItems, SignUpService) {
 	var $ctrl = this;
  $ctrl.signin=false;
  $ctrl.registered=false;
  if (SignUpService.hasCredential()){
      var c = SignUpService.getCredential();
      $ctrl.first_name = c.first_name;
      $ctrl.last_name = c.last_name;
      $ctrl.email=c.email;
      $ctrl.phone=c.phone;
      $ctrl.fmenu=c.fmenu;
      $ctrl.agree=true;
      $ctrl.registered=true;
  } else {
     	$ctrl.first_name = "";
     	$ctrl.last_name = "";
     	$ctrl.email="";
     	$ctrl.phone="";
     	$ctrl.fmenu="";
      $ctrl.agree=false;
  }

  $ctrl.smenu={};
  $ctrl.items=menuItems.menu_items;
  

  $ctrl.update = function () { 
    if ( $ctrl.fmenu != undefined && $ctrl.fmenu.length > 0 ){
      var v = $ctrl.fmenu.toLowerCase();
      var s = $.grep($ctrl.items, function(item){ return item.short_name.toLowerCase() === v; });
      if ( s.length>0 ){
        $ctrl.smenu = s[0];
        return $ctrl.smenu.name;
      }
    }
  }

  /*ng-model-options="{allowInvalid: true}"*/ 
   
   $ctrl.signUp=function () {
     SignUpService.setCredential({
       last_name : $ctrl.last_name,
       email:$ctrl.email,
       first_name:$ctrl.first_name,
       phone:$ctrl.phone,
       fmenu:$ctrl.smenu.short_name
     });
     $ctrl.signin=true;
     $ctrl.registered=true;
   }

  $ctrl.clear=function () {
     SignUpService.setCredential(null);
     $ctrl.signin=false;
     $ctrl.registered=false;
     $ctrl.first_name = "";
     $ctrl.last_name = "";
     $ctrl.email="";
     $ctrl.phone="";
     $ctrl.fmenu="";
     $ctrl.agree=false;
   }

 }
 

})();
