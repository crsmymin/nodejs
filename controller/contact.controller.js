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
    service: 'gmail',
    port: 465,
    auth: {
      user: mailinfo.user,
      pass: mailinfo.pass
    }
  })

  // set mail option set 
  var mailOption = {
    from: "스타치과의원",
    to: "yeongmin.kang@cfind.co.kr",
    subject: req.body.contact_subject,
    html: "<h2 style='font-size:24px;'>스타치과의원 문의 메일입니다.</h2>" +  
          "<h4 style='font-size:18px;'>연락처 : " + req.body.contact_phone + "</h4>" +
          "<h4 style='font-size:18px;'>카테고리 : " + req.body.contact_type + "<h4/>" +
          "<pre style='font-size:15px;'>" + req.body.contact_content + "</pre>",
  }

  console.log(mailOption);
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
