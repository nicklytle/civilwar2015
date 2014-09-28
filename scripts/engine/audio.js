// TODO use a third-party sound library instead of vanilla JS
define(
  ['./base','./helpers'],
  function(engine) {
    'use strict';
    return {
      muted: false,
      files: {},
      loadListeners: {},
      loadArray: function(array) {
        for (var i = 0; i < array.length; i++) {
          var sndFilename = array[i];
          var sndName = helpers.trimFilename(sndFilename);
          var snd = new Audio(engine.SOUNDS_PATH+sndFilename);
          snd.dataName = sndName;

          // make sounds accessible by filename
          // with and without extension
          this.files[sndName] = snd;
          this.files[sndFilename] = snd;

          engine.log('loading sound: ' + sndName);
          snd.addEventListener('canplaythrough', function() {
            engine.log('loaded sound: ' + this.dataName);
            var lis = this.loadListeners[this.dataName];
            if (exists(lis))
            {
              engine.log('calling sound load listener(s) for sound: ' + this.dataName);
              for(var j = 0; j < lis.length; j++)
              {
                lis[j].call(lis[j]); // TODO decide on a context
              }
            }
          }, false);
        }
      },
      load: function() {
        this.loadArray(arguments);
      },
      // only necessary for long looping sounds i.e. music
      addLoadListener: function(name, fn) {
        if (!exists(this.loadListeners[name])) {
          this.loadListeners[name] = [];
        }
        this.loadListeners[name].push(fn);
      },
      play: function(name) {
        var sound = this.files[name];
        if (exists(sound)) {
          if (!this.muted) {
	    (new Audio(sound.src)).play();
	  }	  
        } else {
          throw ('Sound effect not found: ' + name);
        }
      },
      // TODO this is totally broken and very inconsistent
      loop: function(name) {
        engine.log('requesting sound loop: ' + name);
        var sound = this.files[name];
        if (exists(sound)) {
          // // the old version
          // ls.addEventListener('ended', function() 
          // {
          //  engine.log('looping sound: ' + name);
          //  engine.log(getData(this));
          //  this.currentTime = 0;
          // }, false);
          // ls.play();
          var ls = new Audio(sound.src);
          ls.loop = true;
          ls.play();
        } else {
          throw ('Sound loop not found: ' + name);
        }
      },
    };
  }
);