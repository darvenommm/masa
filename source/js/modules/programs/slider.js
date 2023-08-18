import Slider from '../../vendor/swiper';
import {isMobile} from 'is-mobile';

import {setNewScrollbarValue} from './scrollbar';

const SLIDER_SELECTOR = '#programs__slider';
const PREV_BUTTON_SELECTOR = '#programs__slider-prev';
const NEXT_BUTTON_SELECTOR = '#programs__slider-next';

const sliderInitHandler = () => void setNewScrollbarValue();
const sliderChangeHandler = (swiper) => {
  setNewScrollbarValue(swiper.progress * 100);
};

export const initProgramsSlider = () => {
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
      768: {
        spaceBetween: 30,
        slidesPerView: 2.005,
      },
      1440: {
        spaceBetween: 32,
        slidesPerView: 3,
      },
    },

    on: {
      init: sliderInitHandler,
      slideChange: sliderChangeHandler,
    },

    navigation: {
      nextEl: NEXT_BUTTON_SELECTOR,
      prevEl: PREV_BUTTON_SELECTOR,
    },
  });

  return slider;
};
