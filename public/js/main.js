// import Swiper JS
import Swiper from 'swiper';

// import Swiper styles
import 'swiper/css';

$(function () {
  // 메인 페이지 배너 슬라이드
  const swiper = new Swiper('.slide-container', {
    // Optional parameters
    slidesPerView: 1,
    autoplay: {
      delay: 2500,
      disableOnInteraction: true
    },
    loop: true,
    // If we need pagination
    // pagination: {
    //   el: '.swiper-pagination',
    // },

    // Navigation arrows
    // navigation: {
    //   nextEl: '.swiper-button-next',
    //   prevEl: '.swiper-button-prev',
    // },
  });

})