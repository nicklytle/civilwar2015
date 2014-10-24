define({
  doRectanglesOverlap: function(a,b,error) { // error > 0 is easier to hit (bigger)
    var err = error || 0;

    var L1 = a.x - err;
    var L2 = b.x;

    var R1 = a.x + a.width + err;
    var R2 = b.x + b.width;

    var B1 = a.y - err;
    var B2 = b.y;

    var T1 = a.y + a.height + err;
    var T2 = b.y + b.height;

    if (R1<L2 || R2<L1 || T1<B2 || T2<B1) {
      return false;
    } else {
      return true;
    }
  },
  getRectangleOverlap: function(a, b, error) {
    var pad = (error || 0) / 2.0;
    var L1 = a.x - pad;
    var L2 = b.x - pad;
    var R1 = a.x + a.width + pad;
    var R2 = b.x + b.width + pad;
    var B1 = a.y - pad;
    var B2 = b.y - pad;
    var T1 = a.y + a.height + pad;
    var T2 = b.y + b.height + pad;
    var free = R1 <= L2 || R2 <= L1 || T1 <= B2 || T2 <= B1;
    if (free) {
      return false;
    } else {
      return {
        x: Math.max(L1, L2),
        y: Math.max(B1, B2),
        width: Math.abs(Math.max(L1, L2) - Math.min(R1, R2)),
        height: Math.abs(Math.max(B1, B2) - Math.min(T1, T2)),
      };
    }
  },
  resolveCollision: function(a, b, error, weight) {
    var wb = (typeof weight === 'number') ? weight : 0.5;
    var wa = 1-wb;
    var o = this.getRectangleOverlap(a, b, error);
    if (!o) return false;
    var horizontal = o.width >= o.height;
    var hMult = horizontal ? 1 : 0;
    var wMult = horizontal ? 0 : 1;
    return [
      {
        width: o.width * wa * wMult,
        height: o.height * wa * hMult,
      },
      {
        width: o.width * wb * wMult,
        height: o.height * wb * hMult,
      }
    ];
  }
});