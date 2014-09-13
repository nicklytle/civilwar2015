define({
  doRectanglesOverlap: function(a,b,error) { // error > 0 is easier to hit (bigger)
    if(!exists(error)) {
      error = 0;
    }

    var L1 = a.x - error;
    var L2 = b.x;

    var R1 = a.x + a.width + error;
    var R2 = b.x + b.width;

    var B1 = a.y - error;
    var B2 = b.y;

    var T1 = a.y + a.height + error;
    var T2 = b.y + b.height;

    if(R1<L2 || R2<L1 || T1<B2 || T2<B1) {
      return false;
    } else {
      return true;
    }
  },
});