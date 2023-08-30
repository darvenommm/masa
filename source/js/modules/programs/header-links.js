import {getProgramsSlider} from './slider';

export const PROGRAMS_HEADER_BUTTON_SELECTOR = '[data-header-opener-programs]';

const NODE_FOR_SCROLLING_SELECTOR = '#programs__title';

export const programsHeaderLinksCallback = (index) => {
  const nodeForScrolling = document.querySelector(NODE_FOR_SCROLLING_SELECTOR);
  const swiper = getProgramsSlider();

  if (!nodeForScrolling || !swiper) {
    return;
  }

  nodeForScrolling.scrollIntoView({behavior: 'smooth'});
  swiper.slideTo(index);
};
