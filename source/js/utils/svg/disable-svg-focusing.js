export const disableSvgFocusing = () => {
  const allSvg = document.querySelectorAll('svg, use');

  allSvg.forEach((svg) => {
    svg.tabIndex = '-1';
  });
};
