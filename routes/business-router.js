const express = require('express');
const router = express.Router();

/* GET Business page. */
router.get('/', function(req, res, next) {
  res.render('business', {
    title: "Blog",
    id: "businessPage",
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