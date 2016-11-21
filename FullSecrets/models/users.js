var Mongoose = require('mongoose');
var Schema   = Mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
	name: {
        type    : String,
    }
}, {timestamps : true});

User.plugin(passportLocalMongoose); 

module.exports = Mongoose.model('User', User);