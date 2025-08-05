const burger = document.querySelector('.head__menu-toggle');
const menu = document.querySelector('.head__nav');
const menuLinks = menu.querySelectorAll('.main-nav__link');
const body = document.querySelector('.body');

function openMenu() {
  burger.classList.add('head__menu-toggle--active');
  menu.classList.add('head__nav--active');
  body.classList.add('body--no-scroll');
}

function closeMenu() {
  burger.classList.remove('head__menu-toggle--active');
  menu.classList.remove('head__nav--active');
  body.classList.remove('body--no-scroll');
}

burger.addEventListener('click', () => {
  if (menu.classList.contains('head__nav--active')) {
    closeMenu();
  } else {
    openMenu();
  }
});

menuLinks.forEach((link) => {
  link.addEventListener('click', () => {
    closeMenu();
  });
});

document.addEventListener('click', (e) => {
  if (!menu.classList.contains('head__nav--active')) {
    return;
  }

  if (!menu.contains(e.target) && !burger.contains(e.target)) {
    closeMenu();
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && menu.classList.contains('head__nav--active')) {
    closeMenu();
  }
});
