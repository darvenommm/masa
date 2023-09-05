const PARENT_SELECTOR = '#questions__accordion';
const ELEMENT_SELECTOR = '.questions__item';
const PARENT_ACTIVE_CLASS = 'questions__item--activated';
const ACTIVE_ELEMENTS_SELECTOR = '.questions__subtitle, .questions__button';

export const addQuestionsHandlers = () => {
  const parent = document.querySelector(PARENT_SELECTOR);
  const elements = (parent ? parent : document).querySelectorAll(ELEMENT_SELECTOR);

  elements.forEach((element) => {
    const activeElements = element.querySelectorAll(ACTIVE_ELEMENTS_SELECTOR);

    activeElements.forEach((activeElement) => {
      activeElement.addEventListener('mousedown', () => {
        element.classList.add(PARENT_ACTIVE_CLASS);
      });

      activeElement.addEventListener('mouseleave', () => {
        element.classList.remove(PARENT_ACTIVE_CLASS);
      });
    });
  });
};
