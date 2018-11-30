var mongoose = require('mongoose');

// DB Schema
// mongoose.Schema 함수를 사용해서 schema object생성
var registSchema = mongoose.Schema({
  corpNm:{type:String},
  conNo:{type:String, required:true, unique:true},
  carSt:{type:String},
  makerNm:{type:String},
  modelNm:{type:String},
  vidNo:{type:String},
  carNo:{type:String},
  cusNm:{type:String},
  relNm:{type:String},
  conDt:{type:String},
  relDt:{type:String},
  regDt:{type:String},
  carNoAddr:{type:String},
  tmpLpnGb:{type:String}
});
// mongoose.model 함수를 사용하여 contact schema의 model을 생성
// 첫번쨰 파라미터 : mongoDB에서 사용될 document이름
// 두번쨰 파라미터 : 프로그램에서 설정한 schma
var Regist = mongoose.model("newregist", registSchema);

module.exports = Regist;
