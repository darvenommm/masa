const OPENER_BUTTON_SELECTOR = '[data-header-opener]';
const CONTENT_INNER_LINK_SELECTOR = '.header__inner-link';

const BUTTON_ACTIVE_CLASS = 'header__link--active';
const OPENED_CONTENT_CLASS = 'header__inner-links--opened';

export const addHeaderButtonsHandlers = () => {
  const buttons = document.querySelectorAll(OPENER_BUTTON_SELECTOR);

  buttons.forEach((button) => {
    const content = button.nextElementSibling;

    if (!content) {
      return;
    }

    button.addEventListener('click', () => {
      button.classList.toggle(BUTTON_ACTIVE_CLASS);
      content.classList.toggle(OPENED_CONTENT_CLASS);
    });
  });
};

export const addHandlersForHeaderButton = (selector, callback) => {
  const button = document.querySelector(selector);
  const content = button.nextElementSibling;
  const innerLinks = content.querySelectorAll(CONTENT_INNER_LINK_SELECTOR);

  innerLinks.forEach((link, index) => {
    link.addEventListener('click', () => {
      callback(index, link);
    });
  });
};
