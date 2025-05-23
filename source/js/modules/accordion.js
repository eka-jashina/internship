function openAccordion(button) {
  const panel = button.nextElementSibling;
  button.classList.add('accordion--open');
  panel.style.maxHeight = `${panel.scrollHeight }px`;
}

function toggleAccordion(button) {
  const panel = button.nextElementSibling;
  const isActive = button.classList.contains('accordion--open');

  if (isActive) {
    button.classList.remove('accordion--open');
    panel.style.maxHeight = null;
  } else {
    openAccordion(button);
  }
}

export { toggleAccordion };