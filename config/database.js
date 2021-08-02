require('dotenv').config();

const mysql = require('mysql2');

const dbInfo = {
  host: process.env.DB_HOST,
  port: 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PW,
  database: process.env.DB_NAME
}

module.exports = {
  init: function() {
    return mysql.createConnection(dbInfo);
  },
  connect: function(conn) {
    conn.connect(function(err) {
      if(err) console.error('mysql connection error : ' + err);
      else console.log('mysql is connected successfully!');
    });
  }
}