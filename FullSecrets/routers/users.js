var Express  = require('express');
var Body     = require('body-parser');
var Mongoose = require('mongoose');
var Assert   = require('assert');;
var Passport = require('passport');
var Verify   = require('./verify');
var Users    = require("../models/users")
 
var 
userRouter = Express.Router();
userRouter.use(Body.json());

userRouter.route('/register')

.post(function (req, res, next) {
     Users.register(new Users({ username : req.body.username }),
      req.body.password, function(err, user) {
        if (err) {
            return res.status(500).json({err: err});
        }
        if (req.body.name ) user.name  = req.body.name;         
        user.save(function(err, user){
            Passport.authenticate('local') (req, res, function(){
                 return res.status(200).json({status: 'Registration Successful!'});
            });
        });
    });
});

userRouter.route('/login')

.post(function (req, res, next) {
    Passport.authenticate('local', function(err, user, info) {
        if (err) {
          return next(err);
        }
        if (!user) {
          return res.status(401).json({
            err: info
          });
        }
        req.logIn(user, function(err) {
          if (err) {
            return res.status(500).json({
              err: 'Could not log in user'
            });
          }
            
          var token = Verify.getToken(user);
          res.status(200).json({
            status: 'Login successful!',
            success: true,
            user   : {name : user.name, email: user.username},
            token: token
          });
        });
    })(req, res, next);
});

userRouter.route('/logout')
.all(Verify.verifyOrdinaryUser, function(req, res){
    req.logout();
    delete req.session;
    res.status(200).json({status: 'Bye Bye!'});
});

userRouter.route('/')

.get(Verify.verifyOrdinaryUser, function (req, res, next) {
    Users.find({}, function (err, dish) {
        if (err) {
            return res.status(500).json({err: err});
        }
        res.json(dish);
    });
})

.delete(Verify.verifyOrdinaryUser, function (req, res, next) {
    Users.remove({}, function (err, resp) {
        if (err) {
            return res.status(500).json({err: err});
        }
        res.json(resp);
    });
});

userRouter.route('/:id')
.get(Verify.verifyOrdinaryUser, function (req, res, next) {
    Users.findById(req.params.id, function (err, user) {
        if (err) {
            return res.status(500).json({err: err});
        }
        res.json(user);
    });
})

.put(function (req, res, next) {
    Users.findByIdAndUpdate(req.params.dishId, {
        $set: req.body
    }, {
        new: true
    }, function (err, dish) {
        Assert.equal(err, null);
        res.json(dish);
    });
})

.delete(function (req, res, next) {
    Users.findByIdAndRemove(req.params.dishId, function (err, resp) {        
        Assert.equal(err, null);
        res.json(resp);
    });
});

module.exports = userRouter;