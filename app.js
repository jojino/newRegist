// 설치한 express module을 불러와서 변수에 담음
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var path = require('path');
var app = express(); // express를 실행하여 app object를 초기화
var passport = require('passport'); // 계정관리를 할때 쓰임(strategy 방식 사용)
var session = require('express-session'); // 로그인 데어티를 관리
var flash = require('connect-flash'); // session에 자료를 flash로 저장
var async = require('async');

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
app.use(passport.initialize());
app.use(passport.session());

// session생성 시 db사용자의 id를 저장
passport.serializeUser(function(user, done) {
  done(null, user.id);
});
// session으로부터 개체를 가져올때 설정하는 것으로 id를 넘겨받아 DB에서 user를 찾음
passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

var LocalStrategy = require('passport-local').Strategy;
passport.use('local-login',
  new LocalStrategy({
      usernameField : 'userId',
      passwordField : 'userPw',
      passReqToCallback : true
    },
    function(req, userId, userPw, done) {
      User.findOne({'userId': userId}, function(err, user) {
        if(err) return done(err);

        if(!user) {
          req.flash("userId", req.body.userId);
          return done(null, false, req.flash('loginError', 'No user found'));
        }
        if(user.passsword != userPw) {
          req.flash('userId', req.body.userPw);
          return done(null, false, req.flash('loginError', 'Password does not Match'));
        }
        return done(null, user);
      });
    }
  )
);


// Routes
app.use("/manage/user", require("./routes/users"));

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

app.get("/manage", function(req, res) {
  // Contact.find({}, function(err, contacts) {
  //   if(err) return res.json(err);
    res.render("users/userList");
  //});
});

// 로그인 루트
app.get('/login', function(req, res) {
  res.render('login/login', {userId:req.flash("userId")[0], loginError:req.flash('loginError')})
});
app.post('/login',
  function(req, res, next) {
    req.flash("useId");
    if(req.body.userId.length === 0 || req.body.userPw.length === 0) {
      req.flash("userId", req.body.userId);
      req.flash("loginError", "Please enter both id and password.");
      res.redirect('/index');
    } else {
      next();
    }
  }, passport.authenticate('local-login', {
    successRedirect : '/newRegist',
    failureRedirect : '/index',
    failureFlash : true
  })
);
app.get('/logout', function(req, res) {
  req.logout();
  req.redirect('/index');
});


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



// 3000번 포트를 사용
app.listen(3000, function() {
  console.log('Server On!!!!');
});
