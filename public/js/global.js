$(function(){
  console.log("Start Web App...");

  $("#btnDelete").on("click", function() {
    var boardNo = window.location.pathname.split("/")[3];
    console.log(boardNo);
    /**
     * DELETE Board Article
     */
    if(confirm("해당 게시물을 삭제 하시겠습니까?") === true) {
      $.ajax({
        url : "/board/delete",
        type : "POST",
        dataType : "JSON",
        data : {"board_no" : boardNo},
        success:function(args){
          console.log("success");
        },
        error:function(e){
          console.log(e.responseText);
        }
      })
      .done(function() {
        alert("게시물이 정상적으로 삭제되었습니다.");
        window.location.href = "/board";
      })
      .fail(function() {
        alert("something went wrong...");
      })
    }
  })
})