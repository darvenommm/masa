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
const SLIDE_SELECTOR = '.news__slide';

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

const addHandlersForEqualHeight = (slider) => {
  const callback = () => {
    const width = window.innerWidth;
    const slides = document.querySelectorAll(SLIDE_SELECTOR);

    if (width < settings.desktopBreakpoint) {
      slides.forEach((slide) => {
        slide.style.height = 'auto';
      });

      return;
    }

    let maxHeight = 0;
    slides.forEach((slide) => {
      const height = slide.offsetHeight;

      if (maxHeight < height) {
        maxHeight = height;
      }
    });

    slides.forEach((slide) => {
      slide.style.height = `${maxHeight}px`;
    });
  };

  const observer = new MutationObserver(callback);
  observer.observe(slider, {childList: true, subtree: true, characterData: true});
};

const addSliderHandlersForRightOrder = (slider) => {
  const parent = slider.el;
  const length = slider.slides.length;
  const firstIndexOfElementsInSecondOrder = Math.ceil(length / 2) + 1;

  if (!(parent instanceof Node)) {
    return;
  }

  const changeItemsOrderForTablet = () => {
    const elements = parent.querySelectorAll('li');

    elements.forEach((element, index) => {
      switch (index) {
        case 0:
          element.style.order = '0';
          break;
        case 1:
          element.style.order = firstIndexOfElementsInSecondOrder.toString();
          break;
        case 2:
          element.style.order = (firstIndexOfElementsInSecondOrder + 1).toString();
          break;
        case 3:
          element.style.order = '1';
          break;
      }

      if (Number(element.style.order) < firstIndexOfElementsInSecondOrder) {
        element.style.marginTop = '0';
      } else {
        element.style.marginTop = '30px';
      }
    });
  };

  const changeItemsOrderForMobile = () => {
    const elements = parent.querySelectorAll('li');

    elements.forEach((element, index) => {
      if (index % 2 === 0) {
        element.style.order = (0 + Math.floor(index / 2)).toString();
        element.style.marginTop = '0';
      } else {
        element.style.order =
          (firstIndexOfElementsInSecondOrder + Math.floor(index / 2)).toString();
        element.style.marginTop = '20px';
      }
    });
  };

  const changeItemsOrderForDesktop = () => {
    const elements = parent.querySelectorAll('li');

    elements.forEach((element, index) => {
      element.style.order = index.toString();
      element.style.marginTop = '0';
    });
  };

  const config = {
    attributes: true,
    subtree: true,
  };

  const changeItemsOrder = () => {
    const width = window.innerWidth;
    if (settings.tabletBreakpoint <= width && width < settings.desktopBreakpoint) {
      changeItemsOrderForTablet();
    } else if (width < settings.tabletBreakpoint) {
      changeItemsOrderForMobile();
    } else {
      changeItemsOrderForDesktop();
    }
  };

  const callback = (mutations) => {
    let hasAttributesMutations = false;
    for (let mutation of mutations) {
      if (mutation.type === 'attributes') {
        hasAttributesMutations = true;
        break;
      }
    }

    if (!hasAttributesMutations) {
      return;
    }

    changeItemsOrder();
  };

  const observer = new MutationObserver(callback);
  observer.observe(parent, config);
  changeItemsOrder();
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
  const slider = new Swiper(SLIDER_SELECTOR, options);
  addSliderHandlersForRightOrder(slider);
  addHandlersForEqualHeight(slider.el);

  return slider;
};
