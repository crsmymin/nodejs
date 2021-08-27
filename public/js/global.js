$(function(){
  console.log("Namgu Start Dental");

  // Top 버튼
  $("#btnTop").on("click",function(){
    $("html, body").animate({
      scrollTop: 0
    },300)
    return false;
  })
})