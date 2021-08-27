// use database
const db_config = require("../config/database");
const conn = db_config.init();
const moment = require('moment');
const crypto = require('crypto');

/**
 * login
 */
exports.login = (req,res,next) => {
  var loginName = req.body.login_name;
  var inputPassword = req.body.login_password;
  
  var sql = "SELECT user_name, user_email, password, salt FROM users WHERE user_name=?";
  conn.query(sql,[loginName], function(err,result) {
    if(err) {
      console.log('query is not excuted. select fail...\n' + err);
      return next(err);
    }
    else if(!result[0]) {
      res.send("<script>alert('아이디를 확인해주세요.'); window.location.href='/login';</script>"); 
    }
    else {
      var user = result[0];
      var userPassword = user.password;
      var salt = user.salt;
      var hashPassword = crypto.createHash("sha512").update(inputPassword + salt).digest("hex");
      console.log(userPassword);
      console.log(hashPassword);
      // 비밀번호 일치
      if(userPassword === hashPassword) {
        console.log("login success"); 
        req.session.user = {
          id: user.user_name,
          name: '관리자',
          email: user.user_email,
          authorized: true
        }
        res.send("<script>alert('로그인 되었습니다.'); window.location.href='/';</script>");
      } 
      // 비밀번호 불일치
      else {
        console.log("login failed"); 
        res.send("<script>alert('일치하는 회원정보가 없습니다.'); window.location.href='/login';</script>") 
      }
    }
  })
}

/**
 * signup
 */
exports.signup = (req,res,next) => {
  var body = req.body;
  var inputPassword = body.confirm_password;
  var userName = body.user_name;
  var userEmail = body.user_email;
  var salt = Math.round((new Date().valueOf() * Math.random())) + "";
  var hashPassword = crypto.createHash("sha512").update(inputPassword + salt).digest("hex");
  var currentTime = moment().format("YYYY-MM-DD HH:mm:ss");

  console.log(userName,userEmail,salt,hashPassword,currentTime);
  var datas = [userName,userEmail,hashPassword,salt,currentTime];

  // query
  var sql = "INSERT INTO users (user_name, user_email, password, salt, created_at)" + 
            "VALUES(?, ?, ?, ?, ?)";
  conn.query(sql, datas, function (err, result) {
    if(err) {
      console.log('query is not excuted. select fail...\n' + err);
      return next(err);
    }
    else {
     console.log("success"); 
     res.send("<script>alert('회원가입이 완료되었습니다.'); window.location.href='/login'; </script>") 
    }
  })
}