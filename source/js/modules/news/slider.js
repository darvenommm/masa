import Swiper from '../../vendor/swiper';

import {isMobile} from 'is-mobile';
import normalizeHTML from 'normalize-html-whitespace';

import {settings} from '../../settings';

const SLIDER_SELECTOR = '#news__slider';
const PREV_BUTTON_SELECTOR = '#news__slider-prev';
const NEXT_BUTTON_SELECTOR = '#news__slider-next';
const PAGINATION_SELECTOR = '#news__slider-pagination';
const PAGINATION_LIST_CLASS = 'news__pagination-list';
const PAGINATION_BUTTON_CLASS = 'news__pagination-button';
const PAGINATION_BUTTON_CLASS_ACTIVE = 'news__pagination-button--active';

const renderCustom = (_, current, total) => {
  let result = '';

  for (let i = 0; i < total; i += 1) {
    const classes = [
      PAGINATION_BUTTON_CLASS,
      (current - 1) === i ? PAGINATION_BUTTON_CLASS_ACTIVE : ''
    ].join(' ');

    result += normalizeHTML(`
      <li>
        <button class="${classes}" type="button">${i + 1}</button>
      </li>
    `);
  }

  return `<ol class="${PAGINATION_LIST_CLASS}">${result}</ol>`;
};

const addPaginationHandlers = (swiper) => {
  const buttons = document.querySelectorAll(`.${PAGINATION_BUTTON_CLASS}`);

  buttons.forEach((button, index) => {
    button.addEventListener('click', () => {
      const slidesCount = swiper.params.slidesPerView === 'auto' ? 4 : swiper.params.slidesPerView;
      swiper.slideTo(index * slidesCount);
    });
  });
};

let wasFirstRun = false;
const sliderResizeHandler = (swiper) => {
  if (!wasFirstRun) {
    wasFirstRun = true;
    return swiper;
  } else {
    swiper.destroy();
    wasFirstRun = false;
    return new Swiper(SLIDER_SELECTOR, options);
  }
};

const options = {
  allowTouchMove: isMobile({
    tablet: true,
    featureDetect: true,
  }),

  breakpoints: {
    0: {
      slidesPerView: 1,
      slidesPerGroup: 1,
      spaceBetween: 20,
      grid: {
        rows: 2,
        fill: 'row',
      },
    },
    [settings.tabletBreakpoint]: {
      slidesPerView: 2,
      slidesPerGroup: 2,
      spaceBetween: 30,
      grid: {
        rows: 2,
        fill: 'row',
      },
    },
    [settings.desktopBreakpoint]: {
      slidesPerView: 'auto',
      slidesPerGroup: 4,
      spaceBetween: 32,
      grid: null,
    },
  },

  pagination: {
    el: PAGINATION_SELECTOR,
    clickable: true,
    type: 'custom',
    renderCustom,
  },

  on: {
    init: addPaginationHandlers,
    slideChange: addPaginationHandlers,
    resize: sliderResizeHandler,
  },

  navigation: {
    nextEl: NEXT_BUTTON_SELECTOR,
    prevEl: PREV_BUTTON_SELECTOR,
  },
};

export const initNewsSlider = () => {
  return new Swiper(SLIDER_SELECTOR, options);
};
