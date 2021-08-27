const express = require('express');
const router = express.Router();
const db_config = require("../config/database");
const conn = db_config.init();
const moment = require('moment');
// const controller = require('../controller/main.controller');

/* GET home page. */
router.get('/', function(req, res, next) {
  // query
  var sql = 'select * from board where not deleted in(true)';
  conn.query(sql, function (err, rows, fields) {
    if(err) console.log('query is not excuted. select fail...\n' + err);
    else {
      console.log(rows);
      res.render('main',{
        list : rows,
        title: "스타치과의원",
        id: "mainPage",
        moment: moment, 
      });
    }
  })
});

module.exports = router;