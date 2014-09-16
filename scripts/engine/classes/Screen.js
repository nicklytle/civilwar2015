define(
  ['pixi', '../base', '../helpers'],
  function(PIXI, engine, helpers) {
    'use strict';

    var Screen = function(cfg) {
      // TODO maybe check for invalid method names, so we don't accidentally
      // misspell one or something
      this.init = helpers.checkFunction(cfg.init);
      this.update = helpers.checkFunction(cfg.update);
      this.onKeyDown = helpers.checkFunction(cfg.onKeyDown);
      this.onMouseDown = helpers.checkFunction(cfg.onMouseDown);

      this.backgroundColor = helpers.getDefault(cfg.backgroundColor,
        engine.DEFAULT_BACKGROUND_COLOR);

      this.stage = new PIXI.DisplayObjectContainer();
      this.ui = new PIXI.DisplayObjectContainer();

      this.nextScreen = this;

      this.init();
    };

    // DON'T manually set position of the stage outside
    // of these instance methods
    helpers.updateObject(Screen.prototype, {
      setCameraPosition: function(x,y) {
        this.stage.position.x = -x;
        this.stage.position.y = -y;
      },

      translateCameraPosition: function(dx,dy) {
        this.stage.position.x -= dx;
        this.stage.position.y -= dy;
      },

      getCameraPosition: function() {
        var backwards = this.stage.position;
        return {x: -backwards.x, y: -backwards.y};
      },

      centerCameraPosition: function(x,y,w,h) {
        this.setCameraPosition(x-w/2.0,y-h/2.0);
      },

      changeScreen: function(scr) {
        this.nextScreen = scr;
      },
    });

    return Screen;
  }
);