var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// schema
var userSchema = mongoose.Schema({
  corpCd:{type:String, required:true},
  userAuth:{type:String},
  userNm:{type:String, required:[true, "Name is required!"]},
  userId:{type:String, required:[true, "UserId is required!"], unique:true},
  userPw:{type:String, required:[true, "Password us required!"], select:false},
  userPhone:{type:String},
  userEmail:{type:String},
  useYN:{type:String}
}, {
  toObject:{virtuals:true}
});
userSchema.pre("save", function(next) {
  var user = this;
  // DB값과 비교
  if(!user.isModified("userPw")) {
    return next();
  } else {
    user.userPw = bcrypt.hashSync(user.userPw);
    return next();
  }
});
userSchema.methods.authenticate = function(userPw) {
  var user = this;
  return bcrypt.compareSync(userPw, user.userPw);
};

var User = mongoose.model("user", userSchema);

// virtuals - DB에 값이 저장이 되지 않음
/*
userSchema.virtual("rePwd")
.get(function() {return this.user.rePwd;})
.set(function(value) {this.user.rePwd=value; });

userSchema.virtual("originalPassword")
.get(function() {return this._originalPassword;})
.set(function(value) {this._originalPassword=value;});

userSchema.virtual("currentPassword")
.get(function() {return this._currentPassword;})
.set(function(value) {this._currentPassword=value;});

userSchema.virtual("newPassword")
.get(function() {return this._newPassword;})
.set(function(value) {this._newPassword=value;});
*/

// password validation
userSchema.path("userPw").validate(function(v) {
  var user = this;

  // create user
  if(user.isNew) {
    console.log("패스워드 == " + user.userPw);
    console.log("패스워드재입력 == " + user.rePwd);
    if(!user.rePwd) {
      user.invalidate("rePwd", "rePwd Confimation is required!");
    }
    if(user.userPw !== user.rePwd) {
      user.invalidate("rePwd", "rePwd Confimation does not matched!");
    }
  }

  // update user
  if(!user.isNew) {
    if(!user.rePwd) {
      user.invalidate("currentPassword", "Current Password is required!");
    }
    if(user,currentPassword && user.currentPassword != user.originalPassword) {
      user.invalidate("currentPassword", "Current Password us invalid!");
    }
    if(user.userPw !== user.rePwd) {
      user.invalidate("rePwd", "Password Confimation does not matched!");
    }
  }
});

// model & export

module.exports = User;
