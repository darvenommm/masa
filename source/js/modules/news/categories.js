const BUTTON_SELECTOR = '.news__button';
const NEWS_SELECTOR = '.news__slide';

const DISABLED_NEWS_CLASS = 'news__slide--disabled';
const ACTIVE_BUTTON_CLASS = 'news__button--active';
const FIRST_NEWS_CLASS = 'news__slide--first';

const ALL_CATEGORY = 'all';

const buttons = document.querySelectorAll(BUTTON_SELECTOR);
const news = document.querySelectorAll(NEWS_SELECTOR);

const changeNewsItems = (buttonCategory = ALL_CATEGORY) => {
  const visibleItems = [];

  news.forEach((newItem) => {
    const newCategory = newItem.dataset.newsCategory
      ? newItem.dataset.newsCategory
      : ALL_CATEGORY;

    if (buttonCategory === ALL_CATEGORY || buttonCategory === newCategory) {
      newItem.classList.remove(DISABLED_NEWS_CLASS);
      visibleItems.push(newItem);
    } else {
      newItem.classList.add(DISABLED_NEWS_CLASS);
    }
  });

  visibleItems.forEach((item, index) => {
    if (index === 0) {
      item.classList.add(FIRST_NEWS_CLASS);
    } else {
      item.classList.remove(FIRST_NEWS_CLASS);
    }
  });
};

const changeActiveButton = (category) => {
  buttons.forEach((button) => {
    if (category === button.dataset.newsCategory) {
      button.classList.add(ACTIVE_BUTTON_CLASS);
    } else {
      button.classList.remove(ACTIVE_BUTTON_CLASS);
    }
  });
};

export const setNewItemByCategory = (category) => {
  changeActiveButton(category);
  changeNewsItems(category);
};

export const addNewsButtonsHandlers = () => {
  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      setNewItemByCategory(button.dataset.newsCategory);
    });
  });
};
