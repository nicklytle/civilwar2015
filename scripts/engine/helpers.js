define({
  trimFilename: function(input) {
    return input.substr(0, input.lastIndexOf('.')) || input;
  },
  spriteZSort: function(a, b) {
    return a.position.y - b.position.y;
  },
  getDefault: function(o, defaultValue) {
    return exists(o) ? o : defaultValue;
  },
  nop: function() {
    // an empty function
    // a command to do nothing
    // such sweet irony
  },
  checkFunction: function(fn) {
    return this.getDefault(fn, this.nop);
  },
});