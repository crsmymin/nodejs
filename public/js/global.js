$(function(){
  console.log("Namgu Start Dental");

  // Top 버튼
  $("#btnTop").on("click",function(){
    $("html, body").animate({
      scrollTop: 0
    },300)
    return false;
  })

  // sub menu sticky 이벤트
  $(window).on("scroll", function() {
    var windowTop = $(window).scrollTop();
    var headerHeight = $("header").height();
    var objPosition = (windowTop + headerHeight);
    var targetPosion =( headerHeight + $(".subpage-visual").height());    
    if(objPosition >= targetPosion) {
      $(".tab-menu").addClass("sticky");
    } 
    if(objPosition < targetPosion) {
      $(".tab-menu").removeClass("sticky");
    }
  })

  // mobile gnb toggle
  $("#mobileGnbBtn").on("click", function() {
    $(this).toggleClass("open");
    $("#mobileGnb").toggleClass("open");
  })
})