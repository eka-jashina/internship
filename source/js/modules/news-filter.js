import { initNewsSwiper, getOriginalSlidesData } from './news-swiper.js';

function initNewsFilter() {
  const filterButtons = document.querySelectorAll('[data-filter]');
  const swiperWrapper = document.querySelector('.news__swiper .swiper-wrapper');
  if (!swiperWrapper) {
    return;
  }

  let swiper = initNewsSwiper();

  function applyFilter(filter) {
    const slidesData = getOriginalSlidesData();
    const activeButton = document.querySelector(`[data-filter="${filter}"]`);

    // Обновление активной кнопки
    filterButtons.forEach((btn) =>
      btn.classList.remove('news__button--active')
    );
    if (activeButton) {
      activeButton.classList.add('news__button--active');
    }

    // Фильтрация слайдов
    const filtered = slidesData.filter(
      (slide) => filter === 'all' || slide.category === filter
    );

    if (filtered.length === 0) {
      swiperWrapper.innerHTML =
        '<div class="no-results">Нет элементов для отображения</div>';
      if (swiper?.destroy) {
        swiper.destroy(true, true);
        swiper = null;
      }
      return;
    }

    // Обновление DOM
    swiperWrapper.innerHTML = filtered.map((slide) => slide.html).join('');

    // Перезапуск свайпера
    if (swiper?.destroy) {
      swiper.destroy(true, true);
    }
    swiper = initNewsSwiper(true);
  }

  // Обработчики кликов
  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;
      applyFilter(filter);

      const url = new URL(window.location);
      url.searchParams.set('filter', filter);
      window.history.pushState({}, '', url);
    });
  });

  // Применение фильтра из URL
  const isInitialLoad = performance.navigation.type === 1; // 1 = reload

  const params = new URLSearchParams(window.location.search);
  const filterFromUrl = params.get('filter');

  const initialFilter = isInitialLoad ? 'all' : filterFromUrl || 'all';
  applyFilter(initialFilter);

  // И при обновлении чистим URL
  if (isInitialLoad && filterFromUrl) {
    const cleanUrl = new URL(window.location);
    cleanUrl.searchParams.delete('filter');
    window.history.replaceState({}, '', cleanUrl);
  }
}

export { initNewsFilter };
