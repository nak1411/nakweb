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
    // Set up canvas
    let canvas = document.querySelector('.site__canvas');
    let context = canvas.getContext('2d');
    canvas.width = document.body.clientWidth;
    canvas.height = document.body.clientHeight;

    // Enable draggable elements
    $(".draggable").draggable({
      snap: true,
      containment: "document"
    });

    // Keep focused draggable elements on top and in correct z-order
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