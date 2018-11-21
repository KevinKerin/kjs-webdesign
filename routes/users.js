var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer({dest: './uploads'});
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;



var User = require('../models/user');

// GET home page. 
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.get('/signup', function (req, res, next) {
    res.render('signup');
});

router.get('/signin', function (req, res, next) {
    res.render('signin');
});

router.post('/signin', 
    passport.authenticate('local',{failureRedirect:'/users/signin', failureFlash: 'Invalid username or password'}), 
    function(req, res){
        req.flash('success', 'You are now logged in');
        res.redirect('/');
});

passport.serializeUser(function(user, done){
    done(null, user.id);
});

passport.deserializeUser(function(id, done){
    User.getUserById(id, function(err, user){
        done(err, user);
    });
});

passport.use(new LocalStrategy(function(username, password, done){
    User.getUserByUsername(username, function(err, user){
        if(err) throw err;
        if(!user){
            return done(null, false, {message: 'Unknown User'});
        }
        User.comparePassword(password, user.password, function(err, isMatch){
            if(err) return done(err);
            if(isMatch){
                return done(null, user);
            } else {
                return done(null, false, {message: 'Invalid Password'});
            }
        });
    });
}));

router.post('/signup', upload.single('profileimage'), function (req, res, next) {
    var name = req.body.name;
    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;
    var password2 = req.body.password2;
    
    if(req.file){
        console.log('Uploading File...');
        var profileimage = req.file.filename;
    } else {
        console.log('No File Uploaded...');
        var profileimage = 'noimage.jpg';
    }

    // Form Validator
    req.checkBody('name', 'Name field is require').notEmpty();
    req.checkBody('email', 'Email field is require').notEmpty();
    req.checkBody('email', 'Email is not valid').isEmail();
    req.checkBody('username', 'Username field is require').notEmpty();
    req.checkBody('password', 'Password field is require').notEmpty();
    req.checkBody('password2', 'Password do not match').equals(req.body.password);

    //check Errors
    var errors = req.validationErrors();

    if(errors){
        res.render('signup', {
            errors: errors
        });
    } else {
        var newUser = new User({
           name: name,
           email: email,
           username: username,
           password: password,
           profileimage: profileimage 
        });

        User.createUser(newUser, function(err, user){
            if(err) throw err;
            console.log(user);
        });

        req.flash('success', 'You are now registered and can signin');

        res.location('/');
        res.redirect('/');
    }
});

router.get('/logout', function(req, res){
    req.logout();
    req.flash('success', 'You are now logged out');
    res.redirect('/users/signin');
});

module.exports = router;