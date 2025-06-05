import Swiper from 'swiper';
import {Navigation, Pagination } from 'swiper/modules';
import { setMaxSlideHeight } from './swiper-utils.js'

function createReviewsSwiper() {
  return new Swiper('.reviews__swiper', {
    modules: [Navigation, Pagination],
    speed: 300,
    autoHeight: true,
    pagination: {
      el: '.reviews__pagination',
      type: 'progressbar',
    },
    navigation: {
      nextEl: '.reviews__button--next',
      prevEl: '.reviews__button--prev',
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 1.275,
        spaceBetween: 30,
      },
      1440: {
        slidesPerView: 2,
        spaceBetween: 32,
      },
    },
    keyboard: {
      enabled: true,
      onlyInViewport: true,
    },
  });
}

function initReviewsSwiper() {
  const reviewsSwiper = createReviewsSwiper();

  setMaxSlideHeight(reviewsSwiper);

  reviewsSwiper.on('resize', setMaxSlideHeight);

  return reviewsSwiper;
}


export { initReviewsSwiper };