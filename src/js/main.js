/**
 * © 2018 Justin Schlump
 * This code is licensed under MIT license (see LICENSE.txt for details)
 * 
 */

import '../sass/main.scss';
require('jquery');
require('jquery-ui-bundle');

let APP = (function () {

  const init = () => {
    $(".draggable").draggable({
      snap: true,
      containment: "document"
    });

    let prev = false;
    $(".draggable").click(function () {
      $(this).css("position", "relative");
      if (prev) {
        prev.style.zIndex = 1;
      }
      this.style.zIndex = 1000;
      prev = this;
    });
  }
  return {
    init: init
  }
})();

APP.init();