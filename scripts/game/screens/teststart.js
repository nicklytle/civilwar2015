define(
  ['pixi', 'engine/classes/Screen', '../constants', './testhub'],
  function(PIXI, Screen, constants, hub) {
    return new Screen ({
      init: function() {
        this.testWords = new PIXI.Text("A NATION DIVIDED\nClick to begin", {
          font : "56px Times, Times New Roman, serif",
          fill: "#001166",
          wordWrap: true,
          wordWrapWidth: constants.STAGE_W,
          align: 'center',
        });
        this.testWords.anchor.x = 0.5;
        this.testWords.anchor.y = 0.5;
        this.testWords.position.x = constants.STAGE_W/2;
        this.testWords.position.y = constants.STAGE_H/2;
        this.stage.addChild(this.testWords);
      },
      onMouseDown: function(point) {
        this.changeScreen(hub);
      },
    });
  }
);