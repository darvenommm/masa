import Swiper from '../../vendor/swiper';

import {isMobile} from 'is-mobile';

import {SwiperScrollbar} from '../../utils/swiper/scrollbar';

const SLIDER_SELECTOR = '#reviews__slider';
const PREV_BUTTON_SELECTOR = '#reviews__slider-prev';
const NEXT_BUTTON_SELECTOR = '#reviews__slider-next';
const SCROLLBAR_SELECTOR = '#reviews__scrollbar > span';

export const initReviewsSlider = () => {
  const scrollbar = new SwiperScrollbar(SCROLLBAR_SELECTOR);

  const slider = new Swiper(SLIDER_SELECTOR, {
    allowTouchMove: isMobile({
      tablet: true,
      featureDetect: true,
    }),
    autoHeight: true,

    breakpoints: {
      0: {
        spaceBetween: 20,
        slidesPerView: 1,
      },
      768: {
        spaceBetween: 30,
        slidesPerView: 1.2,
      },
      1440: {
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

  return slider;
};
