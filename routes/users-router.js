const express = require('express');
const router = express.Router();
const controller = require('../controller/users.controller');

/* GET login page.*/
router.get('/login', function(req, res, next){
  var session = req.session;
  console.log(session);
  res.render('users/login_form',{
    title: "Blog",
    id: "loginPage",
    session: session 
  })
});

// router.get('/signup', function(req, res, next){
//   res.render('users/signup_form',{
//     title: "Blog",
//     id: "signupPage",
//   })
// });

/* GET logout page.*/
router.get('/logout', function(req, res, next) {
  req.session.destroy();
  res.clearCookie('sid');
  res.send("<script>alert('로그아웃 되었습니다.'); window.location.href='/';</script>")
})

/* POST login.*/
router.post('/login', controller.login);
/* POST signup.*/
router.post('/signup', controller.signup);

module.exports = router;