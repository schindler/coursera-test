/*!
 * Login Controllers
 * @license MIT
 * v1.0
 */
(function(window, angular, undefined){
  "use strict";
  (function(){
    "use strict";
    angular
      .module('secretLogin', ['ngMaterial', 'ngMessages', 'material.svgAssetsCache'])
      .controller('login-controller', LoginController);
  })();
  
  
  LoginController.$inject = ['$mdDialog', '$mdMedia', '$mdToast', '$window'];
  function LoginController ($mdDialog, $mdMedia,$mdToast, $window) {
        
      var login   = this;
      this.isOpen = false; 
      this.selectedMode = 'md-fling';
 
      login.status = "";
      login.username = "";
      login.password ="";
      login.show =function ($event){

        var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'));
        $mdDialog.show({
          controller: LoginController,
          controllerAs: 'dialog',
          templateUrl: 'login/login-dialog.template.html',
          parent: angular.element(document.body),
          targetEvent: $event,
          clickOutsideToClose: true,
          fullscreen: useFullScreen
        })
        .then(function (user) {
           showToast("Sucesso " + user.username);
        })
        .catch(function () {
            showToast("Cancelado");
        });
    }
  
    login.hide=function() {
      $mdDialog.hide();
    }

    login.close=function() {
      $mdDialog.cancel();
    }

    login.perform=function () {
      $mdDialog.hide({username: login.username, password: login.password});
    }

    function showToast(content) {
      $mdToast.show(
      $mdToast.simple()
          .content(content)
          .position('top right')
          .hideDelay(3000)
      );
    }
  }
})(window, window.angular);;window.secretLogin={version:{full: "1.0.0"}};
