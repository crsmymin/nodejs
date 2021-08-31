$(function(){
  var hash  = window.location.hash;
  var servicePageNo = hash.split("#")[1];
  
  // implant sub page navigations
  if(servicePageNo != undefined) {
    console.log(servicePageNo);
    $("#businessPage1 .tab").eq(servicePageNo).addClass("active");
    $(".tab-cont").eq(servicePageNo - 1).addClass("show");
    $("#businessPage1 .tab").on("click", function() {
      $("#businessPage1 .tab").not($(this)).removeClass("active");
      $(this).addClass("active");
      var idx = $(this).index();
      console.log(idx);
      $(".tab-cont").removeClass("show");
      $(".tab-cont").eq(idx - 1).addClass("show");
    })
  }
})