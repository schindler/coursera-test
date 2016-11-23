/*!
 * Side Navigator Controllers
 * @license MIT
 * v1.0
 */
(function(){
  "use strict";
   
   angular
      .module('AppSecrets')
      .controller('sidenav-controller', SideNavController);	

   SideNavController.$inject = ['$timeout', '$mdSidenav', '$log', 'session'];
   
   function SideNavController($timeout, $mdSidenav, $log, session) {
        var ctrl = this;
        ctrl.fullname = (session.getUser() || { name : ""}).name;
        ctrl.username = (session.getUser() || { email: ""}).email;
		ctrl.toggle   = buildDelayedToggler('left'); 
		ctrl.close    = buildDelayedClose('left');
		ctrl.isOpen   = function(navID){
		  return $mdSidenav(navID).isOpen();
		};
   	 

		/**
		 * Supplies a function that will continue to operate until the
		 * time is up.
		 */
		function debounce(func, wait, context) {
		  var timer;

		  return function debounced() {
		    var context = ctrl,
		        args = Array.prototype.slice.call(arguments);
		    $timeout.cancel(timer);
		    timer = $timeout(function() {
		      timer = undefined;
		      func.apply(context, args);
		    }, wait || 10);
		  };
		}

		/**
		 * Build handler to open/close a SideNav; when animation finishes
		 * report completion in console
		 */
		function buildDelayedClose(navID) {
		  return debounce(function() {
		    // Component lookup should always be available since we are not using `ng-if`
            ctrl.fullname = (session.getUser() || { name  : ""}).name;
            ctrl.username = (session.getUser() || { email : ""}).email;
		    $mdSidenav(navID)
		      .close()
		      .then(function () {
				
		        $log.debug("close " + navID + " is done");
		      });
		  }, 300);
		}

		/**
		 * Build handler to open/close a SideNav; when animation finishes
		 * report completion in console
		 */
		function buildDelayedToggler(navID) {
		  return debounce(function() {
		    // Component lookup should always be available since we are not using `ng-if`
            ctrl.fullname = (session.getUser() || { name  : ""}).name;
            ctrl.username = (session.getUser() || { email : ""}).email;
		    $mdSidenav(navID)
		      .toggle()
		      .then(function () {
				
		        $log.debug("toggle " + navID + " is done");
		      });
		  }, 300);
		}

		function buildToggler(navID) {
		  return function() {
		    // Component lookup should always be available since we are not using `ng-if`
		    $mdSidenav(navID)
		      .toggle()
		      .then(function () {
		        $log.debug("toggle " + navID + " is done");
		      });
		  }
		}
   }
})(); 
  
