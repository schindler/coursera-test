var Mongoose = require('mongoose');
var Morgan   = require('morgan');
var Express  = require('express');
var Passport = require('passport');
var Strategy = require('passport-local').Strategy;
var Users    = require('./routers/users');

Mongoose.connect('mongodb://localhost:27017/secrets');

var db = Mongoose.connection;

db.on  ('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
	var application = Express();

    application.set('port', (process.env.PORT || 8080));
	application.use(Morgan('dev'));

    // passport config
	var User = require('./models/users');

	application.use(Passport.initialize());

	Passport.use(new Strategy(User.authenticate()));
	Passport.serializeUser(User.serializeUser());
	Passport.deserializeUser(User.deserializeUser());

	application.use("/users", Users); 
    application.use(Express.static(__dirname + '/public'));
    
	/*
	 * Finally, turning on
	 */
	application.listen (application.get('port'), function () {
		//var port = server.address().port;
        console.log("App now running on port", application.get('port'));
	});
});