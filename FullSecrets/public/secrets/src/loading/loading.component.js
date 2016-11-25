(function() {
"use strict";

angular.module('AppSecrets')
.component('appLoading', {
  template: '<md-progress-linear ng-disabled="!$ctrl.show" md-mode="indeterminate"></md-progress-linear>',
  controller: LoadingController
});


LoadingController.$inject = ['$rootScope'];
function LoadingController ($rootScope) {
  var $ctrl = this;
  var listener;
  
   //console.log("LoadingController: on" );

  $ctrl.$onInit = function() {
    $ctrl.show = false;
    listener = $rootScope.$on('spinner:activate', onSpinnerActivate);
  };

  $ctrl.$onDestroy = function() {
    listener();
  };

  function onSpinnerActivate(event, data) {
    //console.log("onSpinnerActivate: " + data.on);
    $ctrl.show = data.on;
  }
}

})();
