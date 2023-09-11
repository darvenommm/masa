const PARENT_SELECTOR = '.header';
const BUTTON_SELECTOR = '#header__button';
const MENU_SELECTOR = '#header__menu';
const LINK_SELECTOR = 'a.header__link';
const ELEMENT_FOR_FOCUSING = '.header__link';

const ACTIVE_PARENT_CLASS = 'header--has-overlay';
const ACTIVE_BUTTON_CLASS = 'header__button--active';
const ACTIVE_MENU_CLASS = 'header__navigation--active';

const addMenuHandlersForHeight = () => {
  const button = document.querySelector(BUTTON_SELECTOR);
  const menu = document.querySelector(MENU_SELECTOR);

  if (!menu || !button) {
    return;
  }

  const setMenuHeight = () => {
    const menuChild = menu.children[0];

    menuChild.style.height = 'auto';

    setTimeout(() => {
      const top = menuChild.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      const height = windowHeight - top;

      const menuHeight = menuChild.scrollHeight;

      menuChild.style.height = `${menuHeight < height ? menuHeight : height}px`;
    });
  };

  window.addEventListener('resize', setMenuHeight);
  button.addEventListener('click', setMenuHeight);
  menu
      .querySelectorAll('a, button')
      .forEach((element) => void element.addEventListener('click', setMenuHeight));

  setMenuHeight();
};

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

  const hideLinksForTab = () => {
    links.forEach((link) => void (link.tabIndex = '-1'));
  };

  const openLinksForTab = () => {
    links.forEach((link) => void (link.tabIndex = '0'));
  };

  const hideLinksForFocusing = () => {
    parent
        .querySelectorAll(ELEMENT_FOR_FOCUSING)
        .forEach((element) => void (element.tabIndex = '-1'));
  };

  const enableLinksForFocusing = () => {
    parent
        .querySelectorAll(ELEMENT_FOR_FOCUSING)
        .forEach((element) => void (element.tabIndex = '0'));
  };

  const closeMenu = () => {
    parent.classList.remove(ACTIVE_PARENT_CLASS);
    button.classList.remove(ACTIVE_BUTTON_CLASS);
    menu.classList.remove(ACTIVE_MENU_CLASS);

    parent.removeEventListener('click', parentClickHandler);
    hideLinksForTab();
    window.scrollLock.enableScrolling();
    hideLinksForFocusing();
  };

  const openMenu = () => {
    parent.classList.add(ACTIVE_PARENT_CLASS);
    button.classList.add(ACTIVE_BUTTON_CLASS);
    menu.classList.add(ACTIVE_MENU_CLASS);

    parent.addEventListener('click', parentClickHandler);
    openLinksForTab();
    window.scrollLock.disableScrolling();

    enableLinksForFocusing();
  };

  const buttonClickHandler = () => {
    (!parent.classList.contains(ACTIVE_PARENT_CLASS) ? openMenu : closeMenu)();
  };

  button.addEventListener('click', buttonClickHandler);
  links.forEach((link) => link.addEventListener('click', linkClickHandler));
  hideLinksForTab();
  hideLinksForFocusing();
  addMenuHandlersForHeight();
};
