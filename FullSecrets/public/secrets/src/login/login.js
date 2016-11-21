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
  
  
  LoginController.$inject = ['$mdDialog', '$mdMedia', '$mdToast', '$window', "auth"];
  function LoginController ($mdDialog, $mdMedia,$mdToast, $window, auth) {
        
      var login   = this;
      this.isOpen = false; 
      this.selectedMode = 'md-fling';
 
      login.status = "";
      login.username = "";
      login.password ="";
      login.requesting = false;
      login.show =function ($event){

        var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'));
        $mdDialog.show({
          controller: LoginController,
          controllerAs: 'dialog',
          templateUrl:  'src/login/login-dialog.template.html',
          parent: angular.element(document.body),
          targetEvent: $event,
          clickOutsideToClose: true,
          fullscreen: useFullScreen
        })
        .then(function (user) {
           console.log(user);
           showToast(`Welcome ${user.name}!`);
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

    login.hasUser=function(){
      return auth.isLoggedIn();
    };

    login.logout=function(){
      return auth.logOut();
    };

    login.perform=function () {
        login.requesting = true;
        auth.logIn(login)
        .then (function(result){
          $mdDialog.hide(result.user);
        })       
        .catch(function(response){
          login.requesting = false;
          console.log(response);
          showToast(response.data.err.message);
        });
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
