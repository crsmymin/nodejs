const db = require("../../config/database");

exports.main = (req, res, next) => {
  res.render('main', { 
    title: "Blog",
    id: "mainPage" 
  });
}
