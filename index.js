// 설치한 express module을 불러와서 변수에 담음
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var path = require('path');
var app = express(); // express를 실행하여 app object를 초기화

// DB 셋팅
// 1. 환경변수에 저장된 값을 사용하여 mongoDB에 접속
mongoose.connect(process.env.MONGO_DB);
// 2. mongoose의 db object를 가져와 db변수에 넣음
var db = mongoose.connection;
// 3. db가 성공적으로 연결된 경우 메시지 출력
db.once("open", function() {
  console.log("DB Connected!!");
});
// 4. db연결 중 에러가 있는 경우 메시지 출력
db.on("error", function(err) {
  console.log("DB ERROR : ", err);
});

app.set("view engine", "ejs");
// static폴더 추가
// __dirname : 프로그램이 실행중인 파일의 위치를 나타냄
app.use(express.static(path.join(__dirname , '/public')));
// bodyParser로 stream의 form data를 req.body애 옮겨 담음
app.use(bodyParser.json()); // jsonData
app.use(bodyParser.urlencoded({extended:true})); // urlencoded data를 분석해서 req.body생성
app.use(methodOverride("_method")); // _method의 query로 들어오는 값으로 HTTP method를 바꿈

// Routes
app.use("/manage/user", require("./routes/users"));

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
var Contact = mongoose.model("newregist", registSchema);


app.get("/", function(req, res) {
  res.redirect("/index");
});

app.get("/index", function(req, res) {
  res.render("index");
});

app.post("/index", function(req, res) {

});

app.get("/newRegist", function(req, res) {
  // Contact.find({}, function(err, contacts) {
  //   if(err) return res.json(err);
    res.render("newRegist/list");
  //});
});


// 3000번 포트를 사용
app.listen(3000, function() {
  console.log('Server On!!!!');
});
