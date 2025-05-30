import Swiper from 'swiper';
import {Navigation, Pagination } from 'swiper/modules';
import { addProgressbarClass, setMaxSlideHeight } from './swiper-utils.js'

function createReviewsSwiper() {
  return new Swiper('.reviews__swiper', {
    modules: [Navigation, Pagination],
    speed: 300,
    autoHeight: true,
    slidesPerView: 2,
    spaceBetween: 32,
    pagination: {
      el: '.reviews__pagination',
      type: 'progressbar',
    },
    navigation: {
      nextEl: '.reviews__button--next',
      prevEl: '.reviews__button--prev',
    },
    keyboard: {
      enabled: true,
      onlyInViewport: true,
    },
  });
}

function initReviewsSwiper() {
  const reviewsSwiper = createReviewsSwiper();

  addProgressbarClass(reviewsSwiper);
  setMaxSlideHeight(reviewsSwiper);

  reviewsSwiper.on('resize', setMaxSlideHeight);

  return reviewsSwiper;
}


export { initReviewsSwiper };