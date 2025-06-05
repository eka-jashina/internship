import "./modules/nav.js";
import { initHeroSwiper } from "./modules/hero-swiper.js";
import { initProgramsSwiper } from "./modules/programs-swiper.js";
import { initNewsSwiper } from "./modules/news-swiper.js";
import { toggleAccordion, openAccordion } from "./modules/accordion.js";
import { initReviewsSwiper } from "./modules/reviews-swiper.js";
import "./vendor/slimselect.min.js";

const buttonsToOpen = document.querySelectorAll(".accordion-button[data-open]");

initHeroSwiper();
initProgramsSwiper();
initNewsSwiper();
initReviewsSwiper();

document.addEventListener("click", function (e) {
  if (e.target.closest(".accordion-button")) {
    toggleAccordion(e.target);
  }
});

buttonsToOpen.forEach((button) => openAccordion(button));

new SlimSelect({
  select: '#city',
  settings: {
    showSearch: false,
  }
});
