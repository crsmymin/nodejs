const express = require('express');
const router = express.Router();

/* GET About page. */
router.get('/', function(req, res, next){
  res.render('about',{
    title: "About",
    id: "aboutPage",
    contents : 
    [
      {menu : "ap1"},
      {menu : "ap2"},
      {menu : "ap3"},
      {menu : "ap4"},
      {menu : "ap5"}
    ]
  })
});

module.exports = router;