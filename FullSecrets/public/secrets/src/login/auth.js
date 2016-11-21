(function(windows, angular){
  "use strict";
 // Export
 angular
    .module('secretLogin')
    .service('auth', AuthService);

 AuthService.$inject = ["$http", "session"];

 function AuthService ($http, session) {
   /**
    * Check whether the user is logged in
    * @returns boolean
    */
    this.isLoggedIn = function isLoggedIn(){
       return session.getUser() !== null;
    };

   /**
    * Log in
    *
    * @param credentials
    * @returns {*|Promise}
    */
    this.logIn = function(credentials){
      return $http
        .post('/users/login', credentials)
        .then(function(response){
          var data = response.data;   
          session.setUser(data.user, data.token);
          return data;
        });
    };

   /**
    * Log out
    *
    * @returns {*|Promise}
    */
    this.logOut = function(){
      var headers = session.xAccessHeader();
      session.clear();
      return $http
        .get('/users/logout', headers)
        .then(function(response){
          // Destroy session in the browser
             
        });

    };
  }
})(window, window.angular);