import './modules/nav.js';
import { initHeroSwiper } from './modules/hero-swiper.js';
import { initProgramsSwiper } from './modules/programs-swiper.js';
import { initNewsFilter } from './modules/news-filter.js';
import { toggleAccordion, openAccordion } from './modules/accordion.js';
import { initReviewsSwiper } from './modules/reviews-swiper.js';
import { initCitySelect, fixChoicesAccessibility } from './modules/select.js';
import './modules/callback-modal.js';

const buttonsToOpen = document.querySelectorAll('.accordion-button[data-open]');
const citySelectMain = document.querySelector('#city');

initHeroSwiper();
initProgramsSwiper();
initNewsFilter();
initReviewsSwiper();

document.addEventListener('click', (e) => {
  if (e.target.closest('.accordion-button')) {
    toggleAccordion(e.target);
  }
});

buttonsToOpen.forEach((button) => openAccordion(button));

initCitySelect(citySelectMain);
fixChoicesAccessibility(citySelectMain);
