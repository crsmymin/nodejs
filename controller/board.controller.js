// use database
const db_config = require("../config/database");
const conn = db_config.init();

/**
 * index
 */ 
exports.index = (req, res, next) => {
  // query
  var sql = 'SELECT * FROM board where not deleted in(true)';
  conn.query(sql, function (err, rows, fields) {
    if(err) console.log('query is not excuted. select fail...\n' + err);
    else {
      res.render('board/list',{
        list : rows,
        title: "Blog",
        id: "communityPage" 
      });
    }
  })
}

/**
 * write
 */ 
exports.write = (req, res, next) => {
  res.render('board/write',{
    title: "Blog",
    id: "communityPage" 
  });
}

/**
 * CREATE
 */ 
exports.create = (req, res, next) => {
  
  var date = new Date().toISOString();
  var currentTime = date.replace(/T/, ' ').replace(/\..+/, '');
  var boardTitle = req.body.board_title;
  var boardContent = req.body.board_content;
  var createdAt = currentTime;
  var author = req.body.author;
  // datas
  var datas = [boardTitle,boardContent,createdAt,author];

  // query
  var sql = "INSERT INTO board (board_title, board_content, created_at, author)" + 
            "VALUES(?, ?, ?, ?)";
  var post = conn.query(sql, datas, function (err, res) {
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

/**
 * VIEW
 */ 
exports.view = (req, res, next) => {
  var boardNo = req.params.id;
  // query
  var sql = "select board_no, author, board_title, board_content," + 
            "date_format(created_at, '%Y-%m-%d %H:%i:%s') created_at," + 
            "date_format(updated_at, '%Y-%m-%d %H:%i:%s') updated_at from board where board_no=?";

  console.log("게시물 아이디 : " + boardNo);
  conn.query(sql, [boardNo], function(err, row, fields) {
    if(err) console.log('query is not excuted. select fail...\n' + err);
    else res.render('board/view',{
      row : row[0],
      title: "Blog",
      id: "communityPage" 
    })
  })
}

/**
 * EDIT
 */ 
exports.edit = (req, res, next) => {
  var boardNo = req.params.id;
  // query
  var sql = "select board_no, author, board_title, board_content," + 
            "date_format(created_at, '%Y-%m-%d %H:%i:%s') created_at," + 
            "date_format(updated_at, '%Y-%m-%d %H:%i:%s') updated_at from board where board_no=?";
  conn.query(sql, [boardNo], function(err, row, fields) {
    if(err) console.log('query is not excuted. select fail...\n' + err);
    else res.render('board/edit',{
      row : row[0],
      title: "Blog",
      id: "communityPage" 
    })
  })
}

/**
 * UPDATE
 */ 
exports.update = (req, res, next) => {
  var date = new Date().toISOString();
  var currentTime = date.replace(/T/, ' ').replace(/\..+/, '');
  var boardNo = req.body.board_no;
  var author = req.body.author;
  var boardTitle = req.body.board_title;
  var boardContent = req.body.board_content;
  var updatedAt = currentTime;
  // datas
  var datas = [boardTitle,boardContent,updatedAt,author,boardNo];

  console.log("수정 게시물 아이디 : " + boardNo);
  
  // query
  var sql = "update board set board_title=?, board_content=?, updated_at=?, author=? where board_no=?";
  var update = conn.query(sql, datas, function (err, res) {
    if(err) {
      console.log('query is not excuted. select fail...\n' + err);
    }
    else {
     console.log("success"); 
    }
  })
  
  // 저장후 리다이렉트
  if(update) {
    res.send("<script>alert('게시글이 수정 되었습니다.'); window.location.href='/board/view/"+boardNo+"'; </script>") ;
  }

}

/**
 * DELETE
 */
exports.delete = (req, res, next) => {
  
  var date = new Date().toISOString();
  var currentTime = date.replace(/T/, ' ').replace(/\..+/, '');
  var boardNo = req.body.board_no;
  var resData = [currentTime,boardNo];
  res.json(boardNo);
  
  console.log("삭제 게시물 아이디 : " + boardNo);   
  // query
  var sql = "update board set deleted=1, deleted_at=? where board_no=?";
  var post = conn.query(sql, resData, function (err, res) {
    if(err) {
      console.log('query is not excuted. select fail...\n' + err);
    }
    else {
     console.log("success"); 
    }
  })
}


