export const getCurrentDataIndex = (swiper) => {
  const slidesLength = swiper.slides.length;
  const activeIndex = swiper.activeIndex;

  if (swiper.params.loop) {
    switch (swiper.activeIndex) {
      case 0:
        return slidesLength - 3;
      case slidesLength - 1:
        return 0;
      default:
        return activeIndex - 1;
    }
  }

  return activeIndex;
};
