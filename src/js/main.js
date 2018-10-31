/**
 * © 2018 Justin Schlump
 * This code is licensed under MIT license (see LICENSE.txt for details)
 * 
 */

import '../sass/main.scss';

let APP = (function () {

  const init = () => {
    console.log('Hello World');
  }
  return {
    init: init
  }
})();

APP.init();