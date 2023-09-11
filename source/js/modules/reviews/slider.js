import Swiper from '../../vendor/swiper';

import {isMobile} from 'is-mobile';

import {SwiperScrollbar} from '../../utils/swiper/scrollbar';
import {settings} from '../../settings';

const SLIDER_SELECTOR = '#reviews__slider';
const PREV_BUTTON_SELECTOR = '#reviews__slider-prev';
const NEXT_BUTTON_SELECTOR = '#reviews__slider-next';
const SCROLLBAR_SELECTOR = '#reviews__scrollbar > span';

const SLIDE_SELECTOR = '.reviews__slide';

const addHandlersForEqualHeight = (slider) => {
  const callback = () => {
    const slides = document.querySelectorAll(SLIDE_SELECTOR);

    slides.forEach((slide) => {
      slide.style.height = 'auto';
    });

    setTimeout(() => {
      let maxHeight = 0;
      slides.forEach((slide) => {
        const slideHeight = slide.clientHeight;

        if (maxHeight < slideHeight) {
          maxHeight = slideHeight;
        }
      });

      slides.forEach((slide) => {
        slide.style.height = `${maxHeight}px`;
      });
    });
  };

  window.addEventListener('resize', callback);
  const observer = new MutationObserver(callback);
  observer.observe(slider, {childList: true, subtree: true, characterData: true});
};

export const initReviewsSlider = () => {
  const scrollbar = new SwiperScrollbar(SCROLLBAR_SELECTOR);

  const slider = new Swiper(SLIDER_SELECTOR, {
    allowTouchMove: isMobile({
      tablet: true,
      featureDetect: true,
    }),

    breakpoints: {
      0: {
        spaceBetween: 20,
        slidesPerView: 1,
      },
      [settings.tabletBreakpoint]: {
        spaceBetween: 30,
        slidesPerView: 1.2,
      },
      [settings.desktopBreakpoint]: {
        spaceBetween: 32,
        slidesPerView: 2,
      },
    },

    navigation: {
      nextEl: NEXT_BUTTON_SELECTOR,
      prevEl: PREV_BUTTON_SELECTOR,
    },

    on: {
      init: () => void scrollbar.swiperInitHandler(),
      slideChange: (swiper) => void scrollbar.swiperChangeHandler(swiper.progress),
    },
  });

  if (!slider.el) {
    return;
  }

  addHandlersForEqualHeight(slider.el);
};
