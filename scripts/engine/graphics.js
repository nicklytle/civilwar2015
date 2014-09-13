define(['pixi', './base'], function(PIXI, engine) {
  return {
    getTexture: function(filename) {
      // TODO some kind of texture atlasing, etc......
      return PIXI.Texture.fromImage(engine.IMAGE_PATH + filename, false, PIXI.scaleModes.NEAREST);
    },
    createSprite: function(tex) {
      return new PIXI.Sprite(tex instanceof PIXI.Texture ? tex : this.getTexture(tex));
    },
  };
});