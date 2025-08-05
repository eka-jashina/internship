import '../vendor/choices.js';

function initCitySelect(element) {
  return new Choices(element, {
    searchEnabled: false,
    itemSelectText: '',
    a11y: {
      announceDropdownOpen: 'Список городов открыт',
      announceDropdownClose: 'Список городов закрыт',
      announceHighlightedOption: 'Выделен вариант',
      announceSelectedOption: 'Выбран вариант',
      itemSelected: 'выбран',
    },
  });
}

function fixChoicesAccessibility() {
  const choicesElements = document.querySelectorAll('.choices');

  choicesElements.forEach((choicesElement, index) => {
    const selectElement = choicesElement.querySelector('select');
    const innerElement = choicesElement.querySelector('.choices__inner');
    const inputElement = choicesElement.querySelector(
      '.choices__input--cloned'
    );
    const singleList = choicesElement.querySelector('.choices__list--single');

    // Генерирует уникальные ID
    const uniqueId = selectElement ? selectElement.id : `choices-${index}`;
    const dropdownId = `${uniqueId}-dropdown`;
    const labelId = `${uniqueId}-label`;

    // 1. Исправляет главный элемент choices
    if (choicesElement) {
      // Удаляет role с главного контейнера
      choicesElement.removeAttribute('role');
      choicesElement.removeAttribute('aria-haspopup');
      choicesElement.removeAttribute('aria-expanded');
    }

    // 2. Исправляет inner элемент
    if (innerElement) {
      // Переносит атрибуты combobox на правильный элемент
      innerElement.setAttribute('role', 'combobox');
      innerElement.setAttribute('aria-haspopup', 'listbox');
      innerElement.setAttribute('aria-expanded', 'false');
      innerElement.setAttribute('aria-owns', dropdownId);
      innerElement.setAttribute('aria-controls', dropdownId);

      // Добавляет label
      const label = document.querySelector(`label[for="${uniqueId}"]`);
      if (label) {
        label.setAttribute('id', labelId);
        innerElement.setAttribute('aria-labelledby', labelId);
      } else {
        innerElement.setAttribute('aria-label', 'Выберите значение');
      }
    }

    // 3. Исправляет input элемент
    if (inputElement) {
      inputElement.setAttribute('role', 'searchbox');
      inputElement.setAttribute('aria-autocomplete', 'list');
      inputElement.setAttribute('aria-controls', dropdownId);
      inputElement.setAttribute('aria-label', 'Поиск по списку');
    }

    // 4. Исправляет single list (отображаемое значение)
    if (singleList) {
      const placeholderItem = singleList.querySelector('.choices__placeholder');
      if (placeholderItem) {
        // Удаляет role="option" с placeholder
        placeholderItem.removeAttribute('role');
        placeholderItem.removeAttribute('aria-selected');
        placeholderItem.setAttribute('aria-hidden', 'true');

        // Добавляет accessible name для toggle элементов
        if (placeholderItem.classList.contains('is-highlighted')) {
          placeholderItem.setAttribute(
            'aria-label',
            placeholderItem.textContent.trim()
          );
        }
      }

      // Исправляет selected items
      const selectedItems = singleList.querySelectorAll(
        '.choices__item--selectable'
      );
      selectedItems.forEach((item) => {
        if (!item.hasAttribute('aria-label') && item.textContent.trim()) {
          item.setAttribute('aria-label', item.textContent.trim());
        }
      });
    }

    // 5. Добавляет обработчики событий для aria-expanded
    choicesElement.addEventListener('showDropdown', () => {
      if (innerElement) {
        innerElement.setAttribute('aria-expanded', 'true');
      }
    });

    choicesElement.addEventListener('hideDropdown', () => {
      if (innerElement) {
        innerElement.setAttribute('aria-expanded', 'false');
      }
    });
  });
}

export { initCitySelect, fixChoicesAccessibility };
