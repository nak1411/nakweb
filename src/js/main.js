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
  let maxP;

  let fps = 30;
  let now;
  let then = Date.now();
  let interval = 1000 / fps;
  let delta;

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

    if (screenWidth <= 800) {
      maxP = 1000;
    } else {
      maxP = 5000;
    }

    // Fill particle array
    for (let i = 0; i < maxP; i++) {
      particles.push(new Particle(context, screenWidth, screenHeight));
    }

    // Enable draggable elements
    $(".draggable").draggable({
      snap: true,
      snapTolerance: 5,
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
      now = Date.now();
      delta = now - then;
      if (delta > interval) {
        then = now - (delta % interval);
        update();
        render();
      }
    }
  }

  /**
   * Updating
   */
  const update = () => {
    for (const particle of particles) {
      particle.update();
    }

  }

  /**
   * Rendering
   */
  const render = () => {
    // Clear screen
    context.fillStyle = '#000';
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Render starfield
    for (const particle of particles) {
      particle.render();
    }
  }

  /**
   * Particle class aka stars
   */
  class Particle {
    constructor(context, screenWidth, screenHeight) {
      this.context = context;
      this.screenWidth = screenWidth;
      this.screenHeight = screenHeight;
      this.x = Math.floor(Math.random() * screenWidth);
      this.y = Math.floor(Math.random() * screenHeight);
      this.vx = Math.random() * (1 - (-1)) + (-1);
      this.vy = Math.random() * (1 - (-1)) + (-1);
      this.pSpeed = .01;
      this.width = 2;
      this.height = 2;
      this.r = Math.random() * 50;
      this.g = Math.random() * 50;
      this.b = Math.random() * 150;
      this.alpha = Math.random() * (1 - (.2)) + (.2);
    }

    render() {
      this.context.fillStyle = `rgba(${this.r}, ${this.g}, ${this.b}, ${this.alpha})`;
      this.context.fillRect(this.x, this.y, this.width, this.height);
    }

    update() {
      if (this.x >= this.screenWidth || this.x <= 0) {
        this.vx = -this.vx;
      }

      if (this.y >= this.screenHeight || this.y <= 0) {
        this.vy = -this.vy;
      }

      this.x += this.vx;
      this.y += this.vy;
    }
  }

  return {
    init: init
  }
})();

APP.init();