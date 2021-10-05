import "../lib/jquery-ui.min";

var css_z_idx = 99;

$(".popup").draggable()
.css( 'cursor', 'move' )
.mousedown(function(){ // mousedown 이벤트 생성
    $(this).css('z-index', css_z_idx); // 클릭한 이미지만 z-index 증가시킴
    css_z_idx++;
});

$(".popup").each(function(index, item) {
  var popupNo = index + 1;
  if(window.innerWidth < 719) {
    $(".popup" + popupNo).css({
      left : 0,
      top : 35 * index,
      "z-index" : 100 - index
    })
  } else {
    $(".popup" + popupNo).css({
      left : 350 * index
    })
  }
})

$(window).on("resize", function() {
  $(".popup").each(function(index, item) {
    var popupNo = index + 1;
    if(window.innerWidth < 719) {
      $(".popup" + popupNo).css({
        left : 0,
        top : 35 * index,
        "z-index" : 100 - index
      })
    } else {
      $(".popup" + popupNo).css({
        left : 350 * index
      })
    }
  })
})

function setCookie(name, value, expiredays) {
  var todayDate = new Date();
  todayDate.setDate(todayDate.getDate() + expiredays);
  document.cookie = name + "=" + escape(value) + "; path=/; expires=" + todayDate.toGMTString() + ";"
}

function getCookie() {
  var cookiedata = document.cookie;
  if (cookiedata.indexOf("todayCookie=done") < 0) {
    $(".popup").show();
  } else {
    $(".popup").hide();
  }
}

getCookie();

$(".popup-close").on("click", function() {
  $(this).parents(".popup").hide();
})

$(".today-popup-close").on("click", function() {
  setCookie("todayCookie", "done", 1);
  $(this).parents(".popup").hide();
})
