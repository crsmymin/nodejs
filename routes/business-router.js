const express = require('express');
const router = express.Router();

/* GET Business page. */
router.get('/1', function(req, res, next) {
  res.render('business1', {
    title: "임플란트",
    id: "businessPage1",
    contents : ""
  })
});

router.get('/2', function(req, res, next) {
  res.render('business2', {
    title: "종합진료",
    id: "businessPage2",
    contents : ""
  })
});

module.exports = router;