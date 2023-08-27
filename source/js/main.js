import {iosVhFix} from './utils/ios-vh-fix';
import {disableSvgFocusing} from './utils/svg/disable-svg-focusing';
import {initModals} from './modules/modals/init-modals';
import {Form} from './modules/form-validate/form';
import {initAccordions} from './modules/accordion/init-accordion';
import {CustomSelect} from './modules/custom-select/custom-select';

import {addBurgerHandlers} from './modules/header';
import {initHeroSlider} from './modules/hero';
import {initProgramsSlider} from './modules/programs';
import {initNewsSlider, addNewsButtonsHandlers} from './modules/news';
import {addQuestionsHandlers} from './modules/questions';
import {initReviewsSlider} from './modules/reviews';
import {createContactsMap} from './modules/contacts';

// ---------------------------------

window.addEventListener('DOMContentLoaded', () => {

  // Utils
  // ---------------------------------

  iosVhFix();
  disableSvgFocusing();

  // Modules
  // ---------------------------------

  window.addEventListener('load', () => {
    // header
    addBurgerHandlers();

    // hero
    initHeroSlider();

    // programs
    initProgramsSlider();

    // news
    addNewsButtonsHandlers();
    initNewsSlider();

    // questions
    addQuestionsHandlers();

    // questions
    initAccordions();

    // reviews
    initReviewsSlider();

    // contacts
    createContactsMap();

    // custom select
    new CustomSelect().init();

    // modals
    initModals();

    // forms
    const form = new Form();
    window.form = form;
    form.init();
  });
});
