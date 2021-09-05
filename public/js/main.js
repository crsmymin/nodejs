// import Swiper JS
import Swiper from 'swiper';

// import Swiper styles
  import 'swiper/css';  

  $(function() {
    // 메인 페이지 배너 슬라이드
    const swiper = new Swiper('.slide-container', {
      // Optional parameters
      loop: true,
      autoplay: {
        delay: 3000,
      },
      slidesPerView: 1, 
      // If we need pagination
      pagination: {
        el: '.swiper-pagination',
      },

      // Navigation arrows
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },

    });

  })