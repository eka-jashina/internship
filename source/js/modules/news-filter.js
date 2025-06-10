import { initNewsSwiper, getOriginalSlidesData } from "./news-swiper.js";

function initNewsFilter() {
  const filterButtons = document.querySelectorAll("[data-filter]");
  const swiperWrapper = document.querySelector(".news__swiper .swiper-wrapper");
  if (!swiperWrapper) return;

  let swiper = initNewsSwiper();

  function applyFilter(filter) {
    const slidesData = getOriginalSlidesData();
    const activeButton = document.querySelector(`[data-filter="${filter}"]`);

    // Обновление активной кнопки
    filterButtons.forEach((btn) =>
      btn.classList.remove("news__button--active")
    );
    if (activeButton) activeButton.classList.add("news__button--active");

    // Фильтрация слайдов
    const filtered = slidesData.filter(
      (slide) => filter === "all" || slide.category === filter
    );

    if (filtered.length === 0) {
      swiperWrapper.innerHTML =
        '<div class="no-results">Нет элементов для отображения</div>';
      if (swiper && typeof swiper.destroy === "function") {
        swiper.destroy(true, true);
        swiper = null;
      }
      return;
    }

    // Обновление DOM
    swiperWrapper.innerHTML = filtered.map((slide) => slide.html).join("");

    // Перезапуск свайпера
    if (swiper && typeof swiper.destroy === "function") {
      swiper.destroy(true, true);
    }
    swiper = initNewsSwiper(true);
  }

  // Навешиваем обработчики
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      applyFilter(button.dataset.filter);
    });
  });

  // Применяем фильтр по умолчанию
  applyFilter("all");
}

export { initNewsFilter };
