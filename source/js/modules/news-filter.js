import { initNewsSwiper, getOriginalSlidesData, getNewsSwiper } from './news-swiper.js';

function initNewsFilter() {
  const filterButtons = document.querySelectorAll('[data-filter]');
  const swiperWrapper = document.querySelector('.news__swiper .swiper-wrapper');
  if (!swiperWrapper) return;

  // Инициализируем свайпер один раз при загрузке страницы
  let swiper = initNewsSwiper();

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;
      const slidesData = getOriginalSlidesData();

      // Убираем активный класс со всех кнопок и добавляем к текущей
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      // Фильтруем исходные слайды
      const filtered = slidesData.filter(slide => filter === 'all' || slide.category === filter);

      // Проверяем, есть ли отфильтрованные слайды
      if (filtered.length === 0) {
        swiperWrapper.innerHTML = '<div class="no-results">Нет элементов для отображения</div>';
        if (swiper && typeof swiper.destroy === 'function') {
          swiper.destroy(true, true);
          swiper = null;
        }
        return;
      }

      // Обновляем DOM слайдера
      swiperWrapper.innerHTML = filtered.map(slide => slide.html).join('');

      // Уничтожаем старый свайпер и создаём заново с флагом сохранения оригинальных данных
      if (swiper && typeof swiper.destroy === 'function') {
        swiper.destroy(true, true);
      }

      // Передаём флаг preserveOriginalData = true, чтобы не перезаписывать оригинальные данные
      swiper = initNewsSwiper(true);
    });
  });
}

export { initNewsFilter };
