const express = require('express');
const router = express.Router();
const controller = require('../controller/users.controller');

router.get('/login', function(req, res, next){
  var session = req.session;
  console.log(session);
  res.render('users/login_form',{
    title: "Blog",
    id: "loginPage",
    session: session 
  })
});

router.get('/logout', function(req, res, next) {
  req.session.destroy();
  res.clearCookie('sid');
  res.send("<script>alert('로그아웃 되었습니다.'); window.location.href='/';</script>")
})

router.post('/login', controller.login);
router.post('/signup', controller.signup);

module.exports = router;