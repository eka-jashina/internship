import './modules/nav.js';
import { initHeroSwiper } from './modules/hero-swiper.js';
import { initProgramsSwiper } from './modules/programs-swiper.js';
import { toggleAccordion, openAccordion } from './modules/accordion.js';

const buttonsToOpen = document.querySelectorAll('.accordion-button[data-open]');

initHeroSwiper();
initProgramsSwiper();

document.addEventListener('click', function(e) {
  if (e.target.closest('.accordion-button')) {
    toggleAccordion(e.target);
  }
});

buttonsToOpen.forEach(button => openAccordion(button));



