(function(){  
  'use strict'; 
  angular
    .module("password-manager", [])
    .controller("password-controller", PasswordController); 
    
  PasswordController.$inject = [ "$scope" ];
  
  function PasswordController ($scope) {
    $scope.version = "1.0.0";    
    $scope.navbar_button_blur = function () {  
       //if ($('.navbar-collapse').hasClass('collapse in'))    
       //   $("button.navbar-toggle").click( );
       $('.navbar-collapse').collapse("hide");
    }
  } 
})()



//CONF_GPRS_APN = 72404;getnet.tim.br;getnet;getnet
//CONF_GPRS_APN = 72405;claro.com.br;claro;claro