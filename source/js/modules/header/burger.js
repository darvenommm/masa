const PARENT_SELECTOR = '.header';
const BUTTON_SELECTOR = '#header__button';
const MENU_SELECTOR = '#header__menu';
const LINK_SELECTOR = 'a.header__link';

const ACTIVE_PARENT_CLASS = 'header--has-overlay';
const ACTIVE_BUTTON_CLASS = 'header__button--active';
const ACTIVE_MENU_CLASS = 'header__navigation--active';

export const addBurgerHandlers = () => {
  const parent = document.querySelector(PARENT_SELECTOR);
  const button = (parent ? parent : document).querySelector(BUTTON_SELECTOR);
  const menu = (parent ? parent : document).querySelector(MENU_SELECTOR);

  if (!parent || !button || !menu) {
    return;
  }

  const links = menu.querySelectorAll(LINK_SELECTOR);

  const parentClickHandler = (event) => {
    if (event.target.contains(menu)) {
      closeMenu();
    }
  };

  const linkClickHandler = () => void closeMenu();

  const closeMenu = () => {
    parent.classList.remove(ACTIVE_PARENT_CLASS);
    button.classList.remove(ACTIVE_BUTTON_CLASS);
    menu.classList.remove(ACTIVE_MENU_CLASS);

    parent.removeEventListener('click', parentClickHandler);
    document.body.style.overflow = '';
  };

  const openMenu = () => {
    parent.classList.add(ACTIVE_PARENT_CLASS);
    button.classList.add(ACTIVE_BUTTON_CLASS);
    menu.classList.add(ACTIVE_MENU_CLASS);

    parent.addEventListener('click', parentClickHandler);
    document.body.style.overflow = 'hidden';
  };

  const buttonClickHandler = () => {
    (!parent.classList.contains(ACTIVE_PARENT_CLASS) ? openMenu : closeMenu)();
  };

  button.addEventListener('click', buttonClickHandler);
  links.forEach((link) => link.addEventListener('click', linkClickHandler));
};
