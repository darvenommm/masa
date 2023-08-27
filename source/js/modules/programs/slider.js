import Slider from '../../vendor/swiper';
import {isMobile} from 'is-mobile';

import {SwiperScrollbar} from '../../utils/swiper/scrollbar';
import {settings} from '../../settings';

const SLIDER_SELECTOR = '#programs__slider';
const PREV_BUTTON_SELECTOR = '#programs__slider-prev';
const NEXT_BUTTON_SELECTOR = '#programs__slider-next';
const SCROLLBAR_SELECTOR = '#programs__scrollbar > span';

export const initProgramsSlider = () => {
  const scrollbar = new SwiperScrollbar(SCROLLBAR_SELECTOR);

  const slider = new Slider(SLIDER_SELECTOR, {
    autoHeight: true,
    allowTouchMove: isMobile({
      tablet: true,
      featureDetect: true,
    }),

    breakpoints: {
      0: {
        spaceBetween: 30,
        slidesPerView: 1,
      },
      [settings.tabletBreakpoint]: {
        spaceBetween: 30,
        slidesPerView: 2.005,
      },
      [settings.desktopBreakpoint]: {
        spaceBetween: 32,
        slidesPerView: 3,
      },
    },

    on: {
      init: () => void scrollbar.swiperInitHandler(),
      slideChange: (swiper) => void scrollbar.swiperChangeHandler(swiper.progress),
    },

    navigation: {
      nextEl: NEXT_BUTTON_SELECTOR,
      prevEl: PREV_BUTTON_SELECTOR,
    },
  });

  return slider;
};
