const db_config = require("../config/database");
const conn = db_config.init();

// index
exports.index = (req, res, next) => {
  var sql = 'SELECT * FROM board';
  conn.query(sql, function (err, rows, fields) {
    if(err) console.log('query is not excuted. select fail...\n' + err);
    else res.render('main',{
      list : rows,
      title: "Blog",
      id: "mainPage" 
    });
  })
}

// view
exports.view = (req, res, next) => {
  var boardNo = req.params.id;
  var sql = "select board_no, author, board_title, board_content, created_at, updated_at from board where board_no=?";
  console.log(boardNo);
  conn.query(sql, [boardNo], function(err, row, fields) {
    if(err) console.log('query is not excuted. select fail...\n' + err);
    else res.render('post/view',{
      row : row[0],
      title: "Blog",
      id: "mainPage" 
    })
  })
}

// post
exports.post = (req, res, next) => {
  var date = new Date();
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var seconds = date.getSeconds();
  var currentTime = year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;

  var boardTitle = req.body.board_title;
  var boardContent = req.body.board_content;
  var createdAt = currentTime;
  var author = req.body.author;

  var sql = 'INSERT INTO board (board_title, board_content, created_at, author) VALUES(?, ?, ?, ?)';
  var params = [boardTitle,boardContent,createdAt,author];
  
  console.log(req.body);

  var post = conn.query(sql, params, function (err, res) {
    if(err) {
      console.log('query is not excuted. select fail...\n' + err);
    }
    else {
     console.log("success"); 
    }
  })

  // 저장후 리다이렉트
  if(post) {
    res.send("<script>alert('게시글이 등록 되었습니다.'); window.location.href='/'; </script>")
  }
}
