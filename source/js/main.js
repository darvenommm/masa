import {iosVhFix} from './utils/ios-vh-fix';
import {initModals} from './modules/modals/init-modals';
import {Form} from './modules/form-validate/form';

import {addBurgerHandlers} from './modules/header';

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

    initModals();

    const form = new Form();
    window.form = form;
    form.init();
  });
});
