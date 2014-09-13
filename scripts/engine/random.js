define({
  nextInt: function(n) { // max is exclusive; returns integer in range [0, n)
    if (Math.floor(n) != n || n <= 1) {
      throw "nextInt requires an integer > 1";
    }
    return Math.floor(Math.random()*n);
  },
  sampleArray: function(array) {
    if (!exists(array) || array.length == 0) {
      throw "sampleArray requires a non-null, non-empty array";
    }
    return array[Random.nextInt(array.length)];
  },
});