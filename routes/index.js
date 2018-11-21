var express = require('express');
var router = express.Router();

// GET home page. 

router.get('/', function(req, res, next){
    res.render('index', { title: 'Express' });
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