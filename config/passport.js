var passport      = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User          = require('../models/User');

passport.serializeUser(function(user, done) {
  done(null, user.id);
});
// session으로부터 개체를 가져올때 설정하는 것으로 id를 넘겨받아 DB에서 user를 찾음
passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

passport.use('local-login',
  new LocalStrategy({
      usernameField : 'userId',
      passwordField : 'userPw',
      passReqToCallback : true
    },
    function(req, userId, userPw, done) {
      User.findOne({'userId': userId}, function(err, user) {
        console.log("아이디" + userId);

        if(err) return done(err);
        console.log("유저" + user); 
        if(!user) {
          req.flash("userId", req.body.userId);
          return done(null, false, req.flash('loginError', 'No user found'));
        }
        //if(user.userPw != userPw) {

        console.log("결과==" + user.authenticate(userPw));
        if(!user.authenticate(userPw)) {
          req.flash('userId', req.body.userId);
          return done(null, false, req.flash('loginError', 'Password does not Match'));
        }
        return done(null, user);
      });
    }
  )
);

module.exports = passport;
