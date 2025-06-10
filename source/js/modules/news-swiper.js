import Swiper from 'swiper';
import { Navigation, Pagination, Grid } from 'swiper/modules';

let originalSlidesData = [];
let swiperInstance = null;
let isOriginalDataSaved = false;

// Умная пагинация (до 4 кнопок, зависит от текущей страницы)

function updatePagination(swiper) {
  const paginationEl = document.querySelector('.news__pagination');
  if (!paginationEl) return;

  const group = swiper.params.slidesPerGroup || 1;
  const gridRows = swiper.params.grid?.rows || 1;

  // Считаем только видимые, НЕ дублированные и НЕ aria-hidden слайды
  const realSlides = Array.from(swiper.slides).filter(
    (slide) =>
      !slide.classList.contains('swiper-slide-duplicate') &&
      slide.getAttribute('aria-hidden') !== 'true' &&
      slide.style.display !== 'none'
  );

  const totalItems = realSlides.length;
  const itemsPerPage = group * gridRows;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const currentPage = Math.floor(swiper.realIndex / group) + 1;

  let start = 1;
  if (currentPage > 3 && currentPage < totalPages - 1) {
    start = currentPage - 2;
  } else if (currentPage >= totalPages - 1) {
    start = totalPages - 3;
  }

  if (start < 1) start = 1;

  paginationEl.innerHTML = '';

  for (let i = start; i <= Math.min(start + 3, totalPages); i++) {
    const btn = document.createElement('button');
    btn.className = 'news__bullet' + (i === currentPage ? ' news__bullet--active' : '');
    btn.textContent = i;
    btn.addEventListener('click', () => {
      swiper.slideTo((i - 1) * group);
    });
    paginationEl.appendChild(btn);
  }
}

function initNewsSwiper(preserveOriginalData = false) {
  const container = document.querySelector('.news__swiper');
  if (!container) return null;

  if (!isOriginalDataSaved && !preserveOriginalData) {
    const slides = Array.from(container.querySelectorAll('.swiper-slide'));
    originalSlidesData = slides.map((slide) => ({
      html: slide.outerHTML,
      category: slide.dataset.category,
    }));
    isOriginalDataSaved = true;
  }

  swiperInstance = new Swiper(container, {
    modules: [Navigation, Pagination, Grid],
    speed: 300,
    autoHeight: false,
    pagination: {
      el: '.news__pagination',
      type: 'custom',
      renderCustom: () => '', // Пусто, мы сами всё рендерим через updatePagination
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
        grid: { rows: 2, fill: 'column' },
      },
      768: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 30,
        grid: { rows: 2, fill: 'row' },
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
      init() {
        if (window.innerWidth < 1440) {
          this.el.querySelectorAll('.swiper-slide').forEach((slide) => {
            slide.style.height = '';
          });
        }
        updatePagination(this);
      },
      slideChange() {
        updatePagination(this);
      },
      resize() {
        if (window.innerWidth < 768) {
          this.el.querySelectorAll('.swiper-slide').forEach((slide) => {
            slide.style.height = '';
          });
        }
        updatePagination(this);
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
