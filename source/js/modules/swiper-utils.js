//Выравнивает свайпер по высоте самого высокого слайда
function setMaxSlideHeight(swiper) {
  if (!swiper || !swiper.slides || !swiper.slides.length) {
    return;
  }

  let maxHeight = 0;

  swiper.slides.forEach((slide) => {
    slide.style.height = 'auto';
    const height = slide.offsetHeight;
    if (height > maxHeight) {
      maxHeight = height;
    }
  });

  swiper.slides.forEach((slide) => {
    slide.style.height = `${maxHeight}px`;
  });
}

//Создает кастомную динамическую пагинацию
function createPagination(swiper, prefix = '') {
  const paginationEl = document.querySelector(`.${prefix}__pagination`);
  if (!paginationEl) {
    return;
  }

  const group = swiper.params.slidesPerGroup || 1;
  const gridRows = swiper.params.grid?.rows || 1;

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

  if (start < 1) {
    start = 1;
  }

  paginationEl.innerHTML = '';

  for (let i = start; i <= Math.min(start + 3, totalPages); i++) {
    const btn = document.createElement('button');
    btn.className = `${prefix}__bullet${
      i === currentPage ? ` ${prefix}__bullet--active` : ''
    }`;
    btn.textContent = i;
    btn.addEventListener('click', () => {
      swiper.slideTo((i - 1) * group);
    });
    paginationEl.appendChild(btn);
  }
}

function updateSlideTabIndices(swiper) {
  swiper.slides.forEach((slide) => {
    const isVisible = slide.classList.contains('swiper-slide-visible');
    slide.querySelectorAll('a, button, input, textarea, select, [tabindex]')
      .forEach((el) => {
        el.tabIndex = isVisible ? 0 : -1;
      });
  });
}

export {
  setMaxSlideHeight,
  createPagination,
  updateSlideTabIndices
};
