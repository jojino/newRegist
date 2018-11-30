var express   = require('express');
var router    = express.Router();
var mongoose  = require('mongoose');
var passport  = require('../config/passport.js');

// 로그인 루트
router.get('/login', function(req, res) {
  res.render('index', {userId:req.flash("userId")[0], loginError:req.flash('loginError')});
});
router.post('/login',
  function(req, res, next) {
    req.flash("useId");
    if(req.body.userId.length === 0 || req.body.userPw.length === 0) {
      req.flash("userId", req.body.userId);
      req.flash("loginError", "Please enter both id and password.");
      res.redirect('/login');
    } else {
      console.log("통과!!!");
      next(); // passport.authenticate()로 넘어감
    }
  }, passport.authenticate('local-login', {
    successRedirect : '/newRegist',
    failureRedirect : '/index',
    failureFlash : true
  })
);
router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

module.exports = router;
