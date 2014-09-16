// TODO key/mouse RELEASE listeners, possibly maps of arbitrary string
//      listeners i.e. ['mousePress','mouseRelease',...]
// TODO scroll wheel?
define(
  ['./base','./helpers'],
  function(engine, helpers){
    return {
      on: false,
      keys: {},
      mouse: {
        x: 0,
        y: 0,
        down: false,
      },
      keyPressListeners: [],
      mousePressListeners: [],
      keyAnchor: document,
      mouseAnchor: document,
      init: function(options) {
        if (this.on === true) {
          throw "Input already initialized";
          return false;
        }
        if (exists(options)) {
          if (exists(options.mouseAnchor)) {
            this.mouseAnchor = options.mouseAnchor;
          }
          if (exists(options.keyAnchor)) {
            this.keyAnchor = options.keyAnchor;
          }
        }
        var keyObj = this.keyAnchor;
        var mouseObj = this.mouseAnchor;
        $(keyObj).keydown(this.keyPress.bind(this));
        $(keyObj).keyup(this.keyRelease.bind(this));
        $(mouseObj).mousedown(this.mousePress.bind(this));
        $(mouseObj).mouseup(this.mouseRelease.bind(this));
        $(mouseObj).mousemove(this.mouseMove.bind(this));
        // if we want to disable context menu
        // this may or may not enable right-click functionality
        // $(mouseObject).bind('contextmenu', function(e) { return false; });
        return true;
      },
      keyPress: function(e) {
        var code = e.which;
        if (this.isKeyUp(code)) {
          this.keys[code] = true;
          engine.logInput('key press: ' + code);
          for (var i = 0; i < this.keyPressListeners.length; i++) {
            this.keyPressListeners[i].call(null, code);
          }
        }
      },
      keyRelease: function(e) {
        var code = e.which;
        if (this.isKeyDown(code)) {
          delete this.keys[code];
          engine.logInput('key release: ' + code);
        }
      },
      mouseMove: function(e) {
        this.mouse.x = e.offsetX;
        this.mouse.y = e.offsetY;
        // engine.log("mouse move: " + this.mouse.x + ", " + this.mouse.y);
      },
      mousePress: function(e) {
        if (e.which != 1) return;
        var coords = {
          x: e.offsetX,
          y: e.offsetY,
        };
        engine.logInput('mouse press: ' + coords.x + ', ' + coords.y);
        for (var i = 0; i < this.mousePressListeners.length; i++) {
          this.mousePressListeners[i].call(null, coords);
        }
        this.mouse.down = true;
      },
      mouseRelease: function(e) {
        if (e.which != 1) return;
        engine.logInput('mouse release');
        this.mouse.down = false;
      },
      isKeyDown: function(code) {
        return exists(this.keys[code]);
      },
      anyKeyDown: function(codes) {
        for (var i = 0; i < codes.length; i++) {
          if (this.isKeyDown(codes[i])) {
            return true;
          }
        }
        return false;
      },
      isKeyUp: function(code) {
        return !this.isKeyDown(code);
      },
    };
  }
);