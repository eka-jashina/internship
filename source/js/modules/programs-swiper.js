import Swiper from 'swiper';
import {Navigation, Pagination } from 'swiper/modules';

function initProgramsSwiper() {
  const programsSwiper = new Swiper('.programs__swiper', {
    modules: [Navigation, Pagination],
    speed: 300,
    autoHeight: true,

    pagination: {
      el: '.programs__pagination',
      type: "progressbar",
    },

    navigation: {
      nextEl: '.programs__button--next',
      prevEl: '.programs__button--prev',
    },

    breakpoints: {
      320: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 2.13,
        spaceBetween: 30,
      },
      1440: {
        slidesPerView: 3,
        spaceBetween: 32,
      },
    },

    keyboard: {
      enabled: true,
      onlyInViewport: true,
    },
  });

  return programsSwiper;
}

export { initProgramsSwiper };