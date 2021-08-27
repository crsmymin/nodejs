const express = require('express');
const router = express.Router();

/* GET About page. */
router.get('/', function(req, res, next){
  res.render('about',{
    title: "의원소개",
    id: "aboutPage",
    contents : "",
  })
});

module.exports = router;