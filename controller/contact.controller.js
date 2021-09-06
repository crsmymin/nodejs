const mailinfo = require('../config/mailinfo.json');
const nodemailer = require('nodemailer');

exports.contact = (req, res, next) => {
    res.render('contact', { 
      title: "1:1문의",
      id: "contactPage" 
  });
}

/** 
 * send mail 
 */
exports.sendmail = (req, res, next) => {
  
  // set transporter
  var transporter = nodemailer.createTransport({
    service: 'Naver',
    host: 'smtp.naver.com', // gmail server 사용
    port: 587,
    secure: false,
    auth: {
      user: mailinfo.user,
      pass: mailinfo.pass
    },
    tls: {
      rejectUnauthorized: false
    }
  })


  // set mail option set 
  var mailOption = {
    from: "\"From 스타치과의원 Website\" <crsmymin@naver.com>",
    to: "yeongmin.kang@cfind.co.kr",
    subject: req.body.contact_subject,
    html: "<div style='width:60%;margin:50px auto;padding:20px;border:1px solid #e3e3e3'>" +
          "<h1><img src='http://13.125.51.128/public/images/common/top_logo.png'></h1>" +
          "<h2 style='margin:0 0 15px;font-size:22px;'>스타치과의원 문의 메일입니다.</h2>" +  
          "<h4 style='margin:0 0 10px;font-size:17px;'>연락처 : " + req.body.contact_phone + "</h4>" +
          "<h4 style='margin:0 0 10px;font-size:17px;'>카테고리 : " + req.body.contact_type + "<h4/>" +
          "<pre style='font-size:15px;'>" + req.body.contact_content + "</pre>" +
          "</div>"
  }

  // send 
  transporter.sendMail(mailOption, function(error, info){
    if (error) {
      console.log(error);
    }
    else {
      console.log('Email sent: ' + info.response);
      res.send("<script>alert('전송완료'); window.location.href='/contact';</script>")
    }
  });
}
