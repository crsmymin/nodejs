// env
require('dotenv').config()

// dependencies
const express = require('express'); // Express 임포트
const app = express();              // Express 앱 생성
const port = process.env.PORT || 3000;
const cors = require('cors');
const morgan = require('morgan');   // morgan 임포트
const path = ('path');
const fs = require('fs'); // file system 임포트
const cookieParser = require('cookie-parser'); 
const expressSession = require('express-session');
const nodemailer = require('nodemailer');
const expressLayouts = require('express-ejs-layouts');
const routes = require('./routes/index-router');  //라우터 파일을 임포트

app.use(expressSession({
  key: 'sid',
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 60 * 60 // 쿠키 유효기간 1시간
  }
}));

app.use(function(req,res,next) {
  res.locals.user = req.session.user;
  next();
})


// cookie parser
app.use(cookieParser());

// body parser
app.use(express.json({
	limit : "5mb"
})) // To parse the incoming requests with JSON payloads
app.use(express.urlencoded({
	limit : "5mb",
	extended: true
}));

// disabled x-powered
app.disable('x-powered-by');

// use layout template
app.use(expressLayouts);

// router
app.use('/', routes); // 라우트들을 할당

// morgan
app.use(morgan('common'));  // morgan 미들웨어의 로그 출력을 common 포맷으로 설정해서 Express에 넘겨준다.

// static dir
app.use(express.static(__dirname + '/')); // 정적 리소스 경로 지정

// set ejs template
app.set('view engine', 'ejs'); // 템플릿 엔진을 ejs로 설정
app.set('views', __dirname + '/views'); // views 폴더에서 ejs 템플릿을 가져오게 설정

// set layouts
app.set('layout', 'layout'); // 템플릿 layout 모듈 사용
app.set("layout extractScripts", true); // 템플릿 script 추출

// 서버실행
app.listen(port, () => {            
  console.log('서버실행 : http://localhost:', port);
});
