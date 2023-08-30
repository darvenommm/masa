import {setNewItemByCategory} from './categories';

export const NEWS_HEADER_BUTTON_SELECTOR = '[data-header-opener-news]';

const NODE_FOR_SCROLLING_SELECTOR = '#news__title';

export const newsHeaderLinksCallback = (_, element) => {
  const nodeForScrolling = document.querySelector(NODE_FOR_SCROLLING_SELECTOR);

  if (!nodeForScrolling) {
    return;
  }

  nodeForScrolling.scrollIntoView({behavior: 'smooth'});
  setNewItemByCategory(element.dataset.newsCategory);
};
