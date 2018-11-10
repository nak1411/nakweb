/**
 * © 2018 Justin Schlump
 * This code is licensed under MIT license (see LICENSE.txt for details)
 * 
 */

import '../sass/main.scss';
require('jquery');
require('jquery-ui-bundle');

let APP = (function () {
  let running = false;
  let canvas;
  let context;
  let particles = [];
  let maxP = 5000

  /**
   * Initialize Stuff
   */
  const init = () => {
    // Set up canvas
    canvas = document.querySelector('.site__canvas');
    context = canvas.getContext('2d');
    canvas.width = document.body.clientWidth;
    canvas.height = document.body.clientHeight;
    let screenWidth = canvas.width;
    let screenHeight = canvas.height;

    // Fill particle array
    for (let i = 0; i < maxP; i++) {
      particles.push(new Particle(screenWidth, screenHeight));
    }

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

    // Start loop
    if (running) {
      return;
    } else {
      running = true;
      run();
    }
  }

  /**
   * Main Loop
   */
  const run = () => {
    if (running) {
      requestAnimationFrame(run);
      render();
    }
  }

  /**
   * Rendering
   */
  const render = () => {
    // Clear screen
    context.fillStyle = '#000';
    context.fillRect(0, 0, canvas.width, canvas.height);

    for (const particle of particles) {
      context.fillStyle = '#222';
      context.fillRect(particle.x, particle.y, 2, 2);
    }
  }

  class Particle {
    constructor(screenWidth, screenHeight) {
      this.x = Math.floor(Math.random() * screenWidth);
      this.y = Math.floor(Math.random() * screenHeight);
    }
  }
  return {
    init: init
  }
})();

APP.init();