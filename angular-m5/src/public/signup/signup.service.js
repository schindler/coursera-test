(function () {
"use strict";

angular.module('public')
.service('SignUpService', SignUpService);


SignUpService.$inject = [];
function SignUpService($scope) {
  var service = this;
 
  service.hasCredential = function () {
     return localStorage.getItem("signup").length>4;
  };

  service.setCredential = function (credential) {
    localStorage.setItem("signup", JSON.stringify(credential));
  };

  service.getCredential = function () {
  	return JSON.parse(localStorage.getItem("signup"));
    
  };
}



})();