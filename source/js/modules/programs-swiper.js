import Swiper from 'swiper';
import {Navigation, Pagination } from 'swiper/modules';
import { addProgressbarClass } from './swiper-utils.js'

function initProgramsSwiper() {
  const programsSwiper = new Swiper('.programs__swiper', {
    modules: [Navigation, Pagination],
    speed: 300,
    autoHeight: true,
    slidesPerView: 3,
    spaceBetween: 32,

    pagination: {
      el: '.programs__pagination',
      type: "progressbar",
    },

    navigation: {
      nextEl: '.programs__button--next',
      prevEl: '.programs__button--prev',
    },

    keyboard: {
      enabled: true,
      onlyInViewport: true,
    },

    on: {
      init: addProgressbarClass,
    },
  });

  return programsSwiper;
}

export { initProgramsSwiper };