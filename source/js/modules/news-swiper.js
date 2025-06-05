import Swiper from 'swiper';
import {Navigation, Pagination, Grid } from 'swiper/modules';

function initNewsSwiper() {
  const newsSwiper = new Swiper('.news__swiper', {
    modules: [Navigation, Pagination, Grid],
    speed: 300,

    pagination: {
      el: '.news__pagination',
      type: "progressbar",
    },

    navigation: {
      nextEl: '.news__button--next',
      prevEl: '.news__button--prev',
    },

    breakpoints: {
      320: {
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: 20,
        grid: {
          rows: 2,
          fill: 'row',
        },
      },
      768: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 30,
        grid: {
          rows: 2,
          fill: 'row',
        },
      },
      1440: {
        slidesPerView: 3,
        slidesPerGroup: 3,
        spaceBetween: 32,
        grid: {
          rows: 1,
          fill: 'row',
        },
      },
    },

    keyboard: {
      enabled: true,
      onlyInViewport: true,
    },
  });

  return newsSwiper;
}

export { initNewsSwiper };