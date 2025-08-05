import Swiper from 'swiper';
import { Navigation, Pagination, A11y, Grid } from 'swiper/modules';
import { createPagination, updateSlideTabIndices } from './swiper-utils.js';

let originalSlidesData = [];
let swiperInstance = null;
let isOriginalDataSaved = false;

function initNewsSwiper(preserveOriginalData = false) {
  const container = document.querySelector('.news__swiper');
  if (!container) {
    return null;
  }

  if (!isOriginalDataSaved && !preserveOriginalData) {
    const slides = Array.from(container.querySelectorAll('.swiper-slide'));
    originalSlidesData = slides.map((slide) => ({
      html: slide.outerHTML,
      category: slide.dataset.category,
    }));
    isOriginalDataSaved = true;
  }

  swiperInstance = new Swiper(container, {
    modules: [Navigation, Pagination, Grid, A11y],
    speed: 300,
    autoHeight: false,
    watchSlidesProgress: true,
    pagination: {
      el: '.news__pagination',
      type: 'custom',
      renderCustom: () => '',
    },
    navigation: {
      nextEl: '.news__button--next',
      prevEl: '.news__button--prev',
    },
    a11y: {
      enabled: true,
      paginationBulletMessage: 'Перейти к слайду {{index}}',
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: 20,
        grid: { rows: 2, fill: 'column' },
      },
      768: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 30,
        grid: { rows: 2, fill: 'row' },
      },
      1440: {
        slidesPerView: 3,
        slidesPerGroup: 3,
        spaceBetween: 32,
      },
    },
    keyboard: {
      enabled: true,
      onlyInViewport: true,
    },
    on: {
      init() {
        if (window.innerWidth < 768) {
          this.el.querySelectorAll('.swiper-slide').forEach((slide) => {
            slide.style.height = '';
          });
        }
        if (window.innerWidth > 1439) {
          this.el.querySelectorAll('.swiper-slide').forEach((slide) => {
            slide.style.width = '';
          });
        }
        createPagination(this, 'news');
        updateSlideTabIndices(this);
      },
      slideChange() {
        createPagination(this, 'news');
        updateSlideTabIndices(this);
      },
      resize() {
        if (window.innerWidth < 768) {
          this.el.querySelectorAll('.swiper-slide').forEach((slide) => {
            slide.style.height = '';
          });
        }
        if (window.innerWidth > 1439) {
          this.el.querySelectorAll('.swiper-slide').forEach((slide) => {
            slide.style.width = '';
          });
        }
        createPagination(this, 'news');
      },
    },
  });

  return swiperInstance;
}

function getOriginalSlidesData() {
  return originalSlidesData;
}

function getNewsSwiper() {
  return swiperInstance;
}

export { initNewsSwiper, getOriginalSlidesData, getNewsSwiper };
