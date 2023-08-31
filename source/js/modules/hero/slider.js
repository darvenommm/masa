import {isMobile} from 'is-mobile';

import Swiper from '../../vendor/swiper';

const SLIDER_SELECTOR = '#hero__slider';
const PARENT_SELECTOR = '.hero';
const PAGINATION_BUTTONS_SELECTOR = '.hero__pagination-buttons';
const PAGINATION_BUTTON_SELECTOR = '.hero__pagination-button';
const PAGINATION_BUTTON_ACTIVE_CLASS = 'hero__pagination-button--active';

const AUTOPLAY_SPEED = 3000; // this must be in ms

const heroClasses = [
  'hero--first-picture',
  'hero--second-picture',
  'hero--third-picture'
];

const clearParentFromClasses = (parent) => {
  heroClasses.forEach((heroClass) => void parent.classList.remove(heroClass));
};

let nextSlideTimeout = null;
const resetChangingToNextSlide = () => {
  if (nextSlideTimeout) {
    clearTimeout(nextSlideTimeout);
    nextSlideTimeout = null;
  }
};

const scheduleChangingToNextSlide = (swiper, time = AUTOPLAY_SPEED) => {
  resetChangingToNextSlide();
  nextSlideTimeout = setTimeout(() => void swiper.slideNext(), time);
};

const changePaginationButtons = (swiper, index) => {
  const containers = document.querySelectorAll(PAGINATION_BUTTONS_SELECTOR);

  containers.forEach((container) => {
    const buttons = container.querySelectorAll(PAGINATION_BUTTON_SELECTOR);

    buttons.forEach((button, buttonIndex) => {
      if (index === buttonIndex) {
        button.classList.add(PAGINATION_BUTTON_ACTIVE_CLASS);
      } else {
        button.classList.remove(PAGINATION_BUTTON_ACTIVE_CLASS);
      }

      button.addEventListener('click', () => {
        swiper.slideTo(buttonIndex + 1);
        // scheduleChangingToNextSlide(swiper);
      });
    });
  });
};

const sliderChangeHandler = (swiper) => {
  const parent = document.querySelector(PARENT_SELECTOR);

  if (!parent) {
    return;
  }

  const currentSlideIndex = swiper.realIndex;
  const currentClass = heroClasses[currentSlideIndex];

  clearParentFromClasses(parent);
  parent.classList.add(currentClass);

  changePaginationButtons(swiper, currentSlideIndex);

  // scheduleChangingToNextSlide(swiper);
};

export const initHeroSlider = () => {
  const swiper = new Swiper(SLIDER_SELECTOR, {
    allowTouchMove: isMobile({
      tablet: true,
      featureDetect: true,
    }),
    spaceBetween: 30,
    loop: true,
    on: {
      slideChange: sliderChangeHandler,
    },
  });

  return swiper;
};
