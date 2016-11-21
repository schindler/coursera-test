(function(){
	"use strict";
	 // Export
	 angular
	    .module('secretLogin')
	    .service('session', SessionService);


     SessionService.$inject=[];

	 function SessionService() {
	 	var session = this;
	 	var storage = window.localStorage;
	 	var mUser=null;
	 	var mToken=null;
	 	var USER_KEY="user";
        var TOKEN_KEY="token";

	 	session.setUser=function(user, token) {
	 		storage.setItem(USER_KEY,  JSON.stringify(mUser=user));
	 		storage.setItem(TOKEN_KEY,             (mToken=token));
	 	};

	 	session.getUser=function(){
	 		if (mUser) return mUser;
	 		return mUser=JSON.parse(storage.getItem(USER_KEY));
	 	}; 

	 	session.getToken=function(){
	 		if (mToken) return mToken;
	 		return mToken=(storage.getItem(TOKEN_KEY));
	 	};

	 	session.clear=function(){
        	mUser=null;
	 		mToken=null;
	 		storage.removeItem(USER_KEY);
	 		storage.removeItem(TOKEN_KEY);
	 	};

	 	session.xAccessHeader=function(){
	 		return { headers : { 'x-access-token' : session.getToken() } };
	 	}
	 }
})();