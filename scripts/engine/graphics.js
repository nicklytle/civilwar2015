define(['pixi', './base'], function(PIXI, engine) {
  return {
    getTexture: function(filename, smooth) {
      // TODO some kind of texture atlasing, etc......
      var scaleMode = (smooth === false) ? PIXI.scaleModes.NEAREST : PIXI.scaleModes.LINEAR;
      console.log("scl:" + scaleMode);
      return PIXI.Texture.fromImage(engine.IMAGE_PATH + filename, false, scaleMode);
    },
    createSprite: function(tex, smooth) {
      return new PIXI.Sprite(tex instanceof PIXI.Texture ? tex : this.getTexture(tex, smooth));
    },
  };
});