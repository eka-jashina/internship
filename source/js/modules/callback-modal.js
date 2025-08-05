import { initCitySelect, fixChoicesAccessibility } from './select.js';

const modal = document.querySelector('.callback-modal');
const openCallbackModalButton = document.querySelector('.about__button');
const closeCallbackModalButton = document.querySelector(
  '.callback-modal__close'
);
const form = modal.querySelector('.callback-modal__form');
const body = document.querySelector('.body');
const citySelectModal = document.querySelector('#city-modal');

openCallbackModalButton.addEventListener('click', () => {
  modal.showModal();
  modal.classList.add('callback-modal--opened');
  body.classList.add('body--no-scroll');
  initCitySelect(citySelectModal);
  fixChoicesAccessibility(citySelectModal);
});

function closeModal() {
  modal.classList.add('callback-modal--closing');
  modal.classList.remove('callback-modal--opened');
  body.classList.remove('body--no-scroll');

  modal.addEventListener(
    'transitionend',
    () => {
      modal.classList.remove('callback-modal--closing');
      modal.close();
    },
    { once: true }
  );
}

closeCallbackModalButton.addEventListener('click', closeModal);

form.addEventListener('submit', (e) => {
  e.preventDefault();
  closeModal();
});

modal.addEventListener('click', (e) => {
  const rect = modal.getBoundingClientRect();
  const clickedOutside =
    e.clientX < rect.left ||
    e.clientX > rect.right ||
    e.clientY < rect.top ||
    e.clientY > rect.bottom;

  if (clickedOutside) {
    closeModal();
  }
});

modal.addEventListener('cancel', (e) => {
  e.preventDefault();
  closeModal();
});
