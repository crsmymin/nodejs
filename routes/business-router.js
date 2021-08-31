const express = require('express');
const router = express.Router();

/* GET Business page. */
router.get('/implant', function(req, res, next) {
  res.render('business1/intro', {
    title: "임플란트",
    id: "businessPage1",
    contents : ""
  })
});
router.get('/implant/services', function(req, res, next) {
  res.render('business1/services', {
    title: "임플란트",
    id: "businessPage1",
    contents : ""
  })
});

router.get('/general', function(req, res, next) {
  res.render('business2/intro', {
    title: "종합진료",
    id: "businessPage2",
    contents : ""
  })
});

module.exports = router;