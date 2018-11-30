var express   = require("express");
var router    = express.Router();
var mongoose  = require('mongoose');
var User      = require("../models/User");
var async     = require('async');

// index
router.route("/").get(function(req, res) {
  User.find({})
  .sort({userId:1})
  .exec(function(err, users) {
    if(err) return res.json(err);
    res.render("users/userList", {users:users});
  });
});

// create
router.post("/actionJoin", checkUserRegValidation, function(req, res, next) {
  User.create(req.body.user, function(err, user) {
    if(err) return res.json({success:false, message:err});
    res.redirect("/users/userList");
  });
});

// update
router.put("/:userId", function(req, res, next) {
  User.findOne({userId:req.params.userId})
  .select("userPwd")
  .exec(function(err, user) {
    if(err) return res.json(err);

    // update user object
    user.originalPassword = user.userPwd;
    user.userPwd = req.body.rePwd? req.body.rePwd : user.userPwd;
    for(var p in req.body) {
      user[p] = req.body[p];
    }

    // save updated user
    user.save(function(err, user) {
      if(err) return res.json(err);
      res.redirect("users/" + req.params.userId);
    });
  });
});

// 유저를 새로 등록하거나 유저 정보를 변경하기 전에 DB에 email이 이미 등록되어 있는지,
// ID가 이미 등록되어있는지를 찾아보고 결과가 있으면 에러 메시지 출력
function checkUserRegValidation(req, res, next) {
  var isValid = true;
  // 비동기함수를 동기함수처럼 사용
  async.waterfall (
    [function(callback) {
      User.findOne({userId: req.body.user.userId, _id: {$ne: mongoose.Types.ObjectId(req.params.id)}},
        function(err, user) {
          if(user) {
            isValid = false;
            req.flash("idError", "- This id is already resistered");
          }
          callback(null, isValid);
        }
    );
  }, function(isValid, callback) {
    User.findOne({userEmail: req.body.user.userEmail, _id: {$ne: mongoose.Types.ObjectId(req.params.id)}},
        function(err, user) {
          if(user) {
            isValid = false;
            req.flash("emailError", "- This email is already resistered.");
          }
          callback(null, isValid);
        }
      );
    }], function(err, isValid) {
      if(err) return res.json({success:"false", message:err});
      if(isValid) {
        return next();
      } else {
        req.flash("formData", req.body.user);
        res.redirect("back");
      }
    }
  );
}

module.exports = router;
