var mongoose = require('mongoose');

// schema
var userSchema = mongoose.Schema({
  corpCd:{type:String, required:true, unique:true},
  userGb:{type:String},
  userNm:{type:String, required:[true, "Name is required!"]},
  userId:{type:String, required:[true, "UserId is required!"], unique:true},
  userPwd:{type:String, required:[true, "Password us required!"], select:false},
  userPhone:{type:String},
  userEmail:{type:String},
  useGb:{type:String}
}, {
  toObject:{virtuals:true}
});

// virtuals - DB에 값이 저장이 되지 않음
userSchema.virtual("rePwd")
.get(function() {return this.rePwd;})
.set(function(value) {this.rePwd=value; });

userSchema.virtual("originalPassword")
.get(function() {return this._originalPassword;})
.set(function(value) {this._originalPassword=value;});

userSchema.virtual("currentPassword")
.get(function() {return this._currentPassword;})
.set(function(value) {this._currentPassword=value;});

userSchema.virtual("newPassword")
.get(function() {return this._newPassword;})
.set(function(value) {this._newPassword=value;});

// password validation
userSchema.path("userPwd").validate(function(v) {
  var user = this;

  // create user
  if(user.isNew) {
    if(!user.rePwd) {
      user.invalidate("rePwd", "rePwd Confimation is required!");
    }
    if(user.userPwd !== user.rePwd) {
      user.invalidate("rePwd", "rePwd Confimation does not matched!");
    }
  }

  // update user
  if(!user.isNew) {
    if(!user.currentPassword) {
      user.invalidate("currentPassword", "Current Password is required!");
    }
    if(user,currentPassword && user.currentPassword != user.originalPassword) {
      user.invalidate("currentPassword", "Current Password us invalid!");
    }
    if(user.newPassword !== user.rePwd) {
      user.invalidate("rePwd", "Password Confimation does not matched!");
    }
  }
});

// model & export
var User = mongoose.model("user", userSchema);
module.exports = User;
