export class SwiperScrollbar {
  constructor(scrollbarSelector) {
    this._scrollbar = document.querySelector(scrollbarSelector);
  }

  setNewScrollbarValue(newValue = 0) {
    if (!this._scrollbar) {
      return;
    }

    this._scrollbar.style.width = `${newValue}%`;
  }

  swiperInitHandler() {
    this.setNewScrollbarValue();
  }

  swiperChangeHandler(progress) {
    this.setNewScrollbarValue(progress * 100);
  }
}
