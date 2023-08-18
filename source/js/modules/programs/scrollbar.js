const SCROLLBAR_SELECTOR = '#programs__scrollbar';
const LINE_SELECTOR = 'span';
const DEFAULT_LINE_VALUE = 0;

// The value that you're giving should be in percent
export const setNewScrollbarValue = (newValue = DEFAULT_LINE_VALUE) => {
  const scrollbar = document.querySelector(SCROLLBAR_SELECTOR);
  const line = (scrollbar ? scrollbar : document).querySelector(LINE_SELECTOR);

  if (!scrollbar || !line) {
    return;
  }

  line.style.width = `${newValue}%`;
};
