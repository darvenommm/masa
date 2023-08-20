import {iosVhFix} from './utils/ios-vh-fix';
import {initModals} from './modules/modals/init-modals';
import {Form} from './modules/form-validate/form';
import {initAccordions} from './modules/accordion/init-accordion';

import {addBurgerHandlers} from './modules/header';
import {initHeroSlider} from './modules/hero';
import {initProgramsSlider} from './modules/programs';
import {addQuestionsHandlers} from './modules/questions';
import {initReviewsSlider} from './modules/reviews';

// ---------------------------------

window.addEventListener('DOMContentLoaded', () => {

  // Utils
  // ---------------------------------

  iosVhFix();

  // Modules
  // ---------------------------------

  window.addEventListener('load', () => {
    // header
    addBurgerHandlers();

    // hero
    initHeroSlider();

    // programs
    initProgramsSlider();

    // questions
    addQuestionsHandlers();

    // questions
    initAccordions();

    // reviews
    initReviewsSlider();

    // other
    initModals();

    const form = new Form();
    window.form = form;
    form.init();
  });
});
