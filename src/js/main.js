/**
 * © 2018 Justin Schlump
 * This code is licensed under MIT license (see LICENSE.txt for details)
 * 
 * NakDev is a Front-End Developer web portfolio for Justin Schlump.  Site includes
 * various projects section, skill section, education section, and contact section.
 * 
 */

import '../sass/pages/home/main.scss';
require('jquery');
require('jquery-ui-bundle');

let APP = (function () {
  let running = false;
  let canvas;
  let context;
  let particles = [];

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

    if (document.body.clientWidth >= 800) {
      initDraggable(true);
      initParticles(5000);
    } else {
      initDraggable(false);
      initParticles(1000);
    }

    // Start loop
    if (running) {
      return;
    } else {
      running = true;
      run();
    }
  }

  /**
   * Listen for window resizing
   */
  $(window).resize(() => {
    canvas.width = document.body.clientWidth;
    canvas.height = document.body.clientHeight;

    if (document.body.clientWidth <= 800) {
      initDraggable(false);
      particles = [];
      initParticles(1000);

    } else {
      initDraggable(true);
      particles = [];
      initParticles(5000);
    }
  })

  /**
   * Listen for submit click and handle
   * email submissions
   */
  $(".site__submit").click(function (e) {
    e.preventDefault();

    let data = {
      name: $("input[name='name']").val(),
      email: $("input[name='email']").val(),
      phone: $("input[name='phone']").val(),
      message: $("textarea[name='message']").val()
    };

    $.ajax({
      method: "POST",
      url: "email.php",
      data: data,
      success: function () {
        console.log("Email Sent");
      }
    })
  });

  /**
   * Initialize particle array
   */
  const initParticles = (maxP) => {
    // Fill particle array
    for (let i = 0; i < maxP; i++) {
      particles.push(new Particle(context, canvas.width, canvas.height));
    }
  }

  /**
   * Setup draggable elements and check window size to
   * determine if elements are too small to drag
   */
  const initDraggable = (isDraggable) => {

    if (isDraggable) {
      // Enable draggable elements
      $(".draggable").draggable({
        disabled: false,
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

    } else {
      $(".draggable").draggable({
        disabled: true
      });
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
    constructor(context, canvasWidth, canvasHeight) {
      this.context = context;
      this.canvasWidth = canvasWidth;
      this.canvasHeight = canvasHeight;
      this.x = Math.floor(Math.random() * canvasWidth);
      this.y = Math.floor(Math.random() * canvasHeight);
      this.vx = Math.random() * (1 - (-1)) + (-1);
      this.vy = Math.random() * (1 - (-1)) + (-1);
      this.pSpeed = .01;
      this.width = 2;
      this.height = 2;
      this.r = Math.random() * 100;
      this.g = Math.random() * 200;
      this.b = Math.random() * 250;
      this.alpha = Math.random() * (1 - (.2)) + (.2);
    }

    render() {
      this.context.fillStyle = `rgba(${this.r}, ${this.g}, ${this.b}, ${this.alpha})`;
      this.context.fillRect(this.x, this.y, this.width, this.height);
    }

    update() {
      if (this.x >= this.canvasWidth || this.x <= 0) {
        this.vx = -this.vx;
      }

      if (this.y >= this.canvasHeight || this.y <= 0) {
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