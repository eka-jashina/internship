import Swiper from "swiper";
import { Navigation, Pagination, Grid } from "swiper/modules";

let originalSlidesData = [];
let swiperInstance = null;
let isOriginalDataSaved = false; // Флаг для отслеживания сохранения оригинальных данных

function initNewsSwiper(preserveOriginalData = false) {
  const container = document.querySelector(".news__swiper");
  if (!container) return null;

  // Сохраняем оригинальные слайды только при первой инициализации
  if (!isOriginalDataSaved && !preserveOriginalData) {
    const slides = Array.from(container.querySelectorAll(".swiper-slide"));
    originalSlidesData = slides.map((slide) => ({
      html: slide.outerHTML,
      category: slide.dataset.category,
    }));
    isOriginalDataSaved = true;
  }

  // Инициализация свайпера
  swiperInstance = new Swiper(container, {
    modules: [Navigation, Pagination, Grid],
    speed: 300,
    autoHeight: false,
    pagination: {
      el: ".news__pagination",
      bulletClass: "news__bullet",
      bulletActiveClass: "news__bullet--active",
      clickable: true,
      renderBullet: function (index, className) {
        return '<button class="' + className + '">' + (index + 1) + "</button>";
      },
    },
    navigation: {
      nextEl: ".news__button--next",
      prevEl: ".news__button--prev",
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: 20,
        grid: { rows: 2, fill: "column" },
      },
      768: {
        slidesPerView: 2,
        slidesPerGroup: 4,
        spaceBetween: 30,
        grid: { rows: 2, fill: "column" },
      },
      1440: {
        slidesPerView: "auto",
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
        if (window.innerWidth < 1440) {
          this.el.querySelectorAll(".swiper-slide").forEach((slide) => {
            slide.style.height = "";
          });
        }
      },
      resize() {
        if (window.innerWidth < 768) {
          this.el.querySelectorAll(".swiper-slide").forEach((slide) => {
            slide.style.height = "";
          });
        }
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
