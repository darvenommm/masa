import {iosVhFix} from './utils/ios-vh-fix';
import {disableSvgFocusing} from './utils/svg/disable-svg-focusing';
import {initModals} from './modules/modals/init-modals';
import {Form} from './modules/form-validate/form';
import {initAccordions} from './modules/accordion/init-accordion';
import {CustomSelect} from './modules/custom-select/custom-select';

import {
  addBurgerHandlers,
  addHeaderButtonsHandlers,
  addHandlersForHeaderButton
} from './modules/header';
import {initHeroSlider} from './modules/hero';
import {
  initProgramsSlider,
  programsHeaderLinksCallback,
  PROGRAMS_HEADER_BUTTON_SELECTOR
} from './modules/programs';
import {
  initNewsSlider,
  addNewsButtonsHandlers,
  NEWS_HEADER_BUTTON_SELECTOR,
  newsHeaderLinksCallback
} from './modules/news';
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
    addHeaderButtonsHandlers();

    // hero
    initHeroSlider();

    // programs
    initProgramsSlider();
    addHandlersForHeaderButton(
        PROGRAMS_HEADER_BUTTON_SELECTOR,
        programsHeaderLinksCallback
    );

    // news
    addNewsButtonsHandlers();
    initNewsSlider();
    addHandlersForHeaderButton(
        NEWS_HEADER_BUTTON_SELECTOR,
        newsHeaderLinksCallback
    );

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
