// 설치한 express module을 불러와서 변수에 담음
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var path = require('path');
var app = express(); // express를 실행하여 app object를 초기화
var session = require('express-session'); // 로그인 데어티를 관리
var flash = require('connect-flash'); // session에 자료를 flash로 저장

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
app.use(flash());
app.use(session({secret:"MySecret"}));  // 암호화시 비밀 키 값

// passport
var passport = require('./config/passport'); // 계정관리를 할때 쓰임(strategy 방식 사용)
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/', require('./routes/home'));
app.use('/manage/user', require('./routes/users'));
// session생성 시 db사용자의 id를 저장

app.get('/', function(req, res) {
  res.redirect('/index');
});
app.get("/index", function(req, res) {
  res.render("index");
});

/*
app.get("/newRegist", function(req, res) {
  User.find({}).sort('-createdAt').exec(function(err, posts) {
    if(err) return res.json({success:false, message:err});
    res.render("/index", {data:posts, user:req.user});
  });
});
*/

app.post("/index", function(req, res) {

});

app.get("/newRegist", function(req, res) {
  // Contact.find({}, function(err, contacts) {
  //   if(err) return res.json(err);
    res.render("newRegist/list");
  //});
});

app.get("/manage", function(req, res) {
  // Contact.find({}, function(err, contacts) {
  //   if(err) return res.json(err);
    res.render("users/userList");
  //});
});



// 3000번 포트를 사용
app.listen(3000, function() {
  console.log('Server On!!!!');
});
