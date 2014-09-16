define({
  DEBUG_MODE: false, // enable debug logging
  DEBUG_INPUT: false, // enable input debuggings
  ASSET_PATH: "/assets/", // path to general assets
  IMAGE_PATH: "/assets/images/", // path to images
  SOUND_PATH: "/assets/sounds/", // path to sounds
  MUSIC_PATH: "/assets/music/", // path to music
  MAX_DELTA: 1.0/15, // max time elapsed per frame
  DEFAULT_BACKGROUND_COLOR: 0xBEEFEE, // default bg color of screen
  log: function() {
    if (this.DEBUG_MODE === true) {
      console.log.apply(console, arguments);
    }
  },
  logInput: function() {
    if (this.DEBUG_INPUT === true) {
      this.log.apply(this, arguments);
    }
  },
  getData: function(obj) {
    return Object.keys(obj).sort();
  },
});