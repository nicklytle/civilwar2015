define(
  ['pixi', '../base', '../input', '../helpers', './Screen'],
  function(PIXI, engine, input, helpers, Screen){
    'use strict';

    function Game(width, height, startScreen) {
      this.canvas = document.createElement("canvas");
      this.canvas.className = 'display';
      this.canvas.width = width;
      this.canvas.height = height;
      this.stage = new PIXI.Stage(0x000000);
      this.currentScreen = null;

      // defaults to WebGL, falls back to Canvas on old/mobile devices
      this.renderer = PIXI.autoDetectRenderer(width, height, this.canvas);

      // variables to track timestep
      this.oldTime = new Date();
      this.newTime = new Date();

      this.setScreen(startScreen);
      this.animationCallback = this.loop.bind(this);
    };

    helpers.updateObject(Game.prototype, {
      init: function(parent) {

        var $parent = $(parent);
        if (!exists($parent[0])) throw "Valid Game parent required";
        $($parent[0]).append(this.canvas);

        // initialize custom input
        input.init({
          mouseAnchor : this.canvas,
        });

        // IMPORTANT: render the stage once before calling an update
        // so all the PIXI variables and actors are updated properly
        this.renderer.render(this.stage);

        // add input listeners
        // ".bind(this)" makes sure they are called with appropriate
        // JavaScript context (i.e. "this" points to the right thing)
        input.keyPressListeners.push(this.onKeyDown.bind(this));
        input.mousePressListeners.push(this.onMouseDown.bind(this));

        // reset timer
        this.oldTime = new Date();

        // start update loop
        window.requestAnimationFrame(this.animationCallback);
      },

      onKeyDown: function(code) {
        this.currentScreen.onKeyDown(code);
      },

      onMouseDown: function(point) {
        this.currentScreen.onMouseDown(this.stage.getMousePosition());
      },

      setScreen: function(screen) {
        if (!(screen instanceof Screen)) {
          throw "Game requires valid Screen instance";
        }
        // remove current screen objects
        if (this.currentScreen) {
          this.stage.removeChild(this.currentScreen.stage);
          this.stage.removeChild(this.currentScreen.ui);
        }
        // if the stage isn't empty, we have a bug; abort
        if (this.stage.children.length > 0) {
          throw "There are extraneous root objects on the stage!";
        }
        // change bg color and add current screen
        // containers to stage
        this.stage.setBackgroundColor(screen.backgroundColor);
        this.stage.addChild(screen.stage);
        this.stage.addChild(screen.ui);
        this.currentScreen = screen;
      },

      loop: function() {
        window.requestAnimationFrame(this.animationCallback);
        this.newTime = new Date();
        this.delta = (this.newTime.getTime() - this.oldTime.getTime()) / 1000.0;
        if (this.delta > engine.MAX_DELTA) {
          this.delta = engine.MAX_DELTA;
        }
        this.oldTime = this.newTime;
        this.currentScreen.update(this.delta);
        this.renderer.render(this.stage);
        var next = this.currentScreen.nextScreen;
        if (next !== this.currentScreen && exists(next)) {
          this.currentScreen.nextScreen = this.currentScreen;
          this.setScreen(next);
        }
      },
    });

    return Game;
  }
);