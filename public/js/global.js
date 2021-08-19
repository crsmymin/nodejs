$(function(){
  console.log("Start Web App...");
  /**
   * use summernote
   */
  $(".summernote").summernote({
    height: 300,                 // set editor height
    minHeight: null,             // set minimum height of editor
    maxHeight: null,             // set maximum height of editor
    focus: true                  // set focus to editable area after initializing summernote
  })

  /**
   * validation write board
   */

  /**
   * DELETE Board Article
   */
  $("#btnDelete").on("click", function() {
    var boardNo = window.location.pathname.split("/")[3];
    console.log(boardNo);
    // use ajax 
    if(confirm("해당 게시물을 삭제 하시겠습니까?") === true) {
      $.ajax({
        url : "/board/delete",
        type : "POST",
        dataType : "JSON",
        data : {
          "board_no" : boardNo
        },
        success:function(args){
          console.log("success");
          alert("게시물이 정상적으로 삭제되었습니다.");
          window.location.href = "/board";
        },
        error:function(e){
          console.log(e.responseText);
          alert("something went wrong...");
        }
      })
      .done(function() {
        console.log("done");
      })
      .fail(function() {
        console.log("fail");
      })
    }
  })
})