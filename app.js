require('dotenv').config()

const express = require('express'); // Express 임포트
const app = express();              // Express 앱 생성

const webpackDevMiddleware = require("webpack-dev-middleware");
const webpack = require("webpack");
const webpackConfig = require("./webpack.config.js");
const compiler = webpack(webpackConfig);

const bodyparser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');   // morgan 임포트
const expressLayouts = require('express-ejs-layouts');
const routes = require('./routes/index-router');  //라우터 파일을 임포트
const port = 3000; // 3000번 포트로 요청 수신

app.use(express.json());
app.disable('x-powered-by');
app.use(expressLayouts);   
app.use('/', routes);   // 라우트들을 할당
app.use(morgan('common'));          // morgan 미들웨어의 로그 출력을 common 포맷으로 설정해서 Express에 넘겨준다.
app.use(bodyparser.urlencoded({ extended: false }));    // 쿼리 스트링 형식 바디 파싱
app.use(bodyparser.json()); // json 형식 바디 파싱
app.use( webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    stats: { colors: true },
  })
);

app.use(express.static(__dirname + '/public/')); // 정적 리소스 경로 지정

app.set('view engine', 'ejs');          // 템플릿 엔진을 ejs로 설정
app.set('views', __dirname + '/views'); // views 폴더에서 ejs 템플릿을 가져오게 설정

app.set('layout', 'layout'); // 템플릿 layout 모듈 사용
app.set("layout extractScripts", true); // 템플릿 script 추출

app.listen(port, () => {            
  console.log('서버실행 : http://localhost:', port);
});
