import { toggleAccordion } from './accordion.js';

const burger = document.querySelector('.head__menu-toggle');
const menu = document.querySelector('.head__nav');
const menuLinks = menu.querySelectorAll('.nav__link');
const navButtons = document.querySelectorAll('.nav__button');
const body = document.querySelector('.body');

burger.addEventListener('click', () => {
  burger.classList.toggle('head__menu-toggle--active');
  menu.classList.toggle('head__nav--active');
  body.classList.toggle('body--no-scroll');
});

menuLinks.forEach((link) => {
  link.addEventListener('click', () => {
    menu.classList.remove('head__nav--active');
    burger.classList.remove('head__menu-toggle--active');
    body.classList.remove('body--no-scroll');
  });
});

navButtons.forEach((button) => {
  button.addEventListener('click', (event) => {
    if (event.target.tagName === 'BUTTON') {
      toggleAccordion(event.target);
    }
  });
});