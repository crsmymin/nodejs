// use database
const db_config = require("../config/database");
const conn = db_config.init();
const moment = require('moment');

/**
 * index
 */ 
exports.index = (req, res, next) => {
  var session = req.session;
  // query
  var sql = 'select * from board where not deleted in(true) ORDER BY board_no DESC';
  conn.query(sql, function (err, rows, fields) {
    if(err) console.log('query is not excuted. select fail...\n' + err);
    else {
      res.render('board/list',{
        list : rows,
        title: "공지사항",
        id: "communityPage",
        moment: moment,
        session: session 
      });
    }
  })
}

/**
 * write
 */ 
exports.write = (req, res, next) => {
  var session = req.session;
  if(session.user) {
    res.render('board/write',{
      title: "공지사항",
      id: "communityPage",
    });
  } else {
    res.send("<script>alert('접근권한이 없습니다.'); window.location.href='/';</script>");
  }
}

/**
 * CREATE
 */ 
exports.create = (req, res, next) => {
  var currentTime = moment().format("YYYY-MM-DD HH:mm:ss");
  var boardTitle = req.body.board_title;
  var boardContent = req.body.board_content;
  var createdAt = currentTime;
  var author = req.body.author;
  // datas
  var datas = [boardTitle,boardContent,createdAt,author];
  
  // query
  var sql = "INSERT INTO board (board_title, board_content, created_at, author)" + 
            "VALUES(?, ?, ?, ?)";
  conn.query(sql, datas, function (err, result) {
    if(err) {
      console.log('query is not excuted. select fail...\n' + err);
      return next(err);
    }
    else {
     console.log("success"); 
     res.send("<script>alert('게시글이 등록 되었습니다.'); window.location.href='/board'; </script>") 
    }
  })
}

/**
 * VIEW
 */ 
exports.view = (req, res, next) => {
  var session = req.session;
  var boardNo = req.params.id;
  // query
  var sql = "select board_no, author, board_title, board_content," + 
            "date_format(created_at, '%Y-%m-%d %H:%i:%s') created_at," + 
            "date_format(updated_at, '%Y-%m-%d %H:%i:%s') updated_at from board where board_no=?";

  console.log("게시물읽기 : " + boardNo);
  conn.query(sql, [boardNo], function(err, row, fields) {
    if(err) console.log('query is not excuted. select fail...\n' + err);
    else res.render('board/view',{
      row : row[0],
      title: "공지사항",
      id: "communityPage",
      moment: moment,
      session: session 
    })
  })
}

/**
 * EDIT
 */ 
exports.edit = (req, res, next) => {
  var session = req.session;
  var boardNo = req.params.id;
  // query
  if(session.user) {
    var sql = "select board_no, author, board_title, board_content," + 
              "date_format(created_at, '%Y-%m-%d %H:%i:%s') created_at," + 
              "date_format(updated_at, '%Y-%m-%d %H:%i:%s') updated_at from board where board_no=?";
    conn.query(sql, [boardNo], function(err, row, fields) {
      if(err) console.log('query is not excuted. select fail...\n' + err);
      else res.render('board/edit',{
        row : row[0],
        title: "공지사항",
        id: "communityPage",
      })
    })
  } else {
    res.send("<script>alert('접근권한이 없습니다.'); window.location.href='/';</script>")
  }
}

/**
 * UPDATE
 */ 
exports.update = (req, res, next) => {
  var currentTime = moment().format("YYYY-MM-DD HH:mm:ss");
  var boardNo = req.body.board_no;
  var author = req.body.author;
  var boardTitle = req.body.board_title;
  var boardContent = req.body.board_content;
  var updatedAt = currentTime;
  // datas
  var datas = [boardTitle,boardContent,updatedAt,author,boardNo];

  console.log("수정 : " + boardNo);
  
  // query
  var sql = "update board set board_title=?, board_content=?, updated_at=?, author=? where board_no=?";
  conn.query(sql, datas, function (err, result) {
    if(err) {
      console.log('query is not excuted. select fail...\n' + err);
    }
    else {
     console.log("success"); 
     res.send("<script>alert('게시글이 수정 되었습니다.'); window.location.href='/board/view/"+boardNo+"'; </script>") ;
    }
  })
}

/**
 * DELETE
 */
exports.delete = (req, res, next) => {
  var currentTime = moment().format("YYYY-MM-DD HH:mm:ss");
  var boardNo = req.body.board_no;
  var resData = [currentTime,boardNo];
  res.status(201).json(resData);
  
  console.log("삭제 : " + boardNo);   
  console.log("시간 : " + currentTime);   
  // query
  var sql = "update board set deleted=1, deleted_at=? where board_no=?";
  conn.query(sql, resData, function (err, res) {
    if(err) {
      console.log('query is not excuted. select fail...\n' + err);
    }
    else {
     console.log("success"); 
    }
  })
}


