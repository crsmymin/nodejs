// use database
const db_config = require("../config/database");
const conn = db_config.init();
const moment = require('moment');

/**
 * index
 */ 
exports.index = (req, res, next) => {
  // query
  var sql = 'select * from board where not deleted in(true)';
  conn.query(sql, function (err, rows, fields) {
    if(err) console.log('query is not excuted. select fail...\n' + err);
    else {
      res.render('main',{
        list : rows,
        title: "스타치과의원",
        id: "mainPage",
        moment: moment, 
      });
    }
  })
}