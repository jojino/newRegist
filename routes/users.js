var express = require("express");
var router = express.Router();
var User = require("../models/User");

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
router.post("/actionJoin", function(req, res) {
  User.create(req.body, function(err, user) {
    if(err) return res.json(err);
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
      res.redirect("/users/" + req.params.userId);
    });
  });
});

module.exports = router;
