// TODO use strict and MAKE THIS WORK!!!

define(
  ['pixi', '../base', '../input'],
  function(PIXI, engine, input){
    'use strict';

    function Game(width, height, startScreen) {
      if (typeof startScreen != "object") throw "Game requires Screen instance";

      this.canvas = document.createElement("canvas");
      this.canvas.className = 'display';
      this.canvas.width = width;
      this.canvas.height = height;

      this.stage = new PIXI.Stage(0x66CC99); // TODO some kind of debug color or something

      // create renderer instance
      // defaults to WebGL, falls back to Canvas on old/mobile devices
      this.renderer = PIXI.autoDetectRenderer(width, height, this.canvas);


      // set up variables to track timestep
      this.oldTime = new Date();
      this.newTime = new Date();

      // set up variables to track framerate
      this.deltas = [];
      this.framesBack = 60 * 3;
      this.updatesPerSec = 1;
      this.fps = 0;
      this.secToUpdate = 1 / this.updatesPerSec;
      this.delta = 0;

      this.setScreen(startScreen);
      this.animationCallback = this.loop.bind(this);
    };

    Game.prototype.init = function(parent) {
      var $parent = $(parent);
      if (!exists($parent[0])) throw "Valid Game parent required";
      $($parent[0]).append(this.canvas);

      // initialize custom input
      input.init({
        mouseAnchor : this.canvas,
      });

      // IMPORTANT: render the stageWorld once before calling an update
      // so all the PIXI variables and actors are updated properly
      this.renderer.render(this.stage);

      input.keyPressListeners.push(this.onKeyDown.bind(this));
      input.mousePressListeners.push(this.onMouseDown.bind(this));

      // reset timer
      this.oldTime = new Date();

      // let's-a go!
      requestAnimationFrame(this.animationCallback);
    };

    Game.prototype.onKeyDown = function(code) {
      this.currentScreen.onKeyDown(code);
    };

    Game.prototype.onMouseDown = function(point) {
      this.currentScreen.onMouseDown(point);
    };

    Game.prototype.setScreen = function(screen) {
      engine.log("setting screen...");
      engine.log(this.stage);
      engine.log(this.stage.children);
      for(var i = 0; i < this.stage.children.length; i++)
      {
        engine.log("removing a child...");
        this.stage.removeChild(this.stage.children[0]);
        if (i > 1)
        {
          throw "There are extraneous root objects on the stage!!";
          return;
        }
      }
      this.stage.setBackgroundColor(screen.backgroundColor);
      this.stage.addChild(screen.stage);
      this.stage.addChild(screen.ui);
      this.currentScreen = screen;
    };

    Game.prototype.loop = function() {

      // request an update approx. 60 times/second
      requestAnimationFrame(this.animationCallback);

      // calculate length of frame
      this.newTime = new Date();
      this.delta = (this.newTime.getTime() - this.oldTime.getTime()) / 1000.0;

      if (this.delta > engine.MAX_DELTA) this.delta = engine.MAX_DELTA;

      this.oldTime = this.newTime;

      // this is all framerate tracking stuff...
      this.deltas.push(this.delta);
      while (this.deltas.length > this.framesBack) {
        this.deltas.splice(0, 1);
      }

      if (this.secToUpdate <= 0) {

        var total = 0;
        for (var i = 0; i < this.deltas.length; i++) {
          total += this.deltas[i];
        }
        var avg = total / this.deltas.length;

        this.fps = 1 / avg;

        this.secToUpdate += 1 / this.updatesPerSec;
      }

      this.secToUpdate -= this.delta;

      this.currentScreen.update(this.delta);
      this.renderer.render(this.stage);

      var next = this.currentScreen.nextScreen;
      if (exists(next) && next !== this.currentScreen) {
        this.currentScreen.nextScreen = null; // TODO fix this
        this.setScreen(next);
      }
    };

    return Game;
  }
);