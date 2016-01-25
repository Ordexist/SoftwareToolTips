var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/SignUp', function(req,res,next) {
   res.render('login', {title: 'Log In'});
});

router.get('/About', function(req,res,next) {
   res.render('about');
});

module.exports = router;
