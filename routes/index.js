var express = require('express');
var router = express.Router();

// GET home page. 

router.get('/', function(req, res, next){
    res.render('index', { title: 'Express' });
});

router.get('/car', function (req, res, next) {
    res.render('car', {
        title: 'car'
    });
});

router.get('/about', function (req, res, next) {
    res.render('about', {
        title: 'about'
    });
});

router.get('/contact', function (req, res, next) {
    res.render('contact', {
        title: 'contact'
    });
});

//hiding a route
// router.get('/', ensureAuthenticated, function (req, res, next) {
//     res.render('index', {
//         title: 'Express'
//     });
// });

// function ensureAuthenticated(req, res, next) {
//     if (req.isAuthenticated()) {
//         return next();
//     }
//     res.redirect('/users/signin');
// }

module.exports = router;