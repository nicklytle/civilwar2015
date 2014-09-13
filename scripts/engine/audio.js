define(['engine/base', function(engine) {
  var Sounds = new Object();

  Sounds.files = {};
  Sounds.loadListeners = {};

  Sounds.load = function() {
    for (var i = 0; i < arguments.length; i++)
    {
      var sndFilename = arguments[i];
      var sndName = trimFilename(sndFilename);
      var snd = new Audio(ASSET_PATH+'snd/'+sndFilename);
      snd.dataName = sndName;

      // make sounds accessible by filename
      // with and without extension
      Sounds.files[sndName] = snd;
      Sounds.files[sndFilename] = snd;

      engine.log('loading sound: ' + sndName);
      snd.addEventListener('canplaythrough', function()
      {
        engine.log('loaded sound: ' + this.dataName);
        var lis = Sounds.loadListeners[this.dataName];
        if(exists(lis))
        {
          engine.log('calling sound load listener(s) for sound: ' + this.dataName);
          for(var j = 0; j < lis.length; j++)
          {
            lis[j].call(null);
          }
        }
      }, false);
    }
  }

  // only really necessary for long looping
  // sounds i.e. music
  Sounds.addLoadListener = function(name, fn)
  {
    if(!exists(Sounds.loadListeners[name]))
    {
      Sounds.loadListeners[name] = [];
    }
    Sounds.loadListeners[name].push(fn);
  }

  Sounds.play = function(name)
  {
    var sound = Sounds.files[name];
    if(exists(sound))
    {
      (new Audio(sound.src)).play();
    }
    else
    {
      engine.log('Sound not found: ' + name);
    }
  }

  // TODO this is currently inconsistent;
  // consider alternatives. streaming?
  Sounds.loop = function(name)
  {
    engine.log('requesting sound loop: ' + name)
    var sound = Sounds.files[name];
    if(exists(sound))
    {
      var ls = new Audio(sound.src);
      ls.loop = true;
      ls.play();

      // ls.addEventListener('ended', function() 
      // {
      //  engine.log('looping sound: ' + name);
      //  engine.log(getData(this));
      //  this.currentTime = 0;
      // }, false);
      // ls.play();

      // TODO store it somewhere so we can stop it later
    }
    else
    {
      engine.log('Sound not found: ' + name);
    }
  }

  return Sounds;
});