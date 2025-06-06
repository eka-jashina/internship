import Swiper from 'swiper';
import {Navigation, Pagination, Grid } from 'swiper/modules';

function initNewsSwiper() {
  const newsSwiper = new Swiper('.news__swiper', {
    modules: [Navigation, Pagination, Grid],
    speed: 300,
    autoHeight: false,

    pagination: {
      el: '.news__pagination',
      bulletClass: 'news__bullet',
      bulletActiveClass: 'news__bullet--active',
      clickable: true,
      renderBullet: function (index, className) {
          return '<button class="' + className + '">' + (index + 1) + "</button>";
        },
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
          fill: 'column',
        },
      },
      768: {
        slidesPerView: 2,
        slidesPerGroup: 4,
        spaceBetween: 30,
        grid: {
          rows: 2,
          fill: 'row',
        },
      },
      1440: {
        slidesPerView: 'auto',
        slidesPerGroup: 3,
        spaceBetween: 32,
      },
    },

    keyboard: {
      enabled: true,
      onlyInViewport: true,
    },

    on: {
      init: function () {
        if (window.innerWidth < 768) {
          // Убрать встроенные высоты слайдов
          this.el.querySelectorAll('.swiper-slide').forEach(slide => {
            slide.style.height = '';
          });
        }
      },
      resize: function () {
        if (window.innerWidth < 768) {
          this.el.querySelectorAll('.swiper-slide').forEach(slide => {
            slide.style.height = '';
          });
        }
      }
    }

  });

  return newsSwiper;
}

export { initNewsSwiper };