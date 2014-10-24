define(
  ['pixi', 'engine/classes/Screen', '../constants', './testhub'],
  function(PIXI, Screen, constants, hub) {
    return new Screen ({
      init: function() {
	  
	  
        this.testWords = new PIXI.Text("A NATION DIVIDED", {
          font : "80px Times, Times New Roman, bold",
          fill: "#000000",
          wordWrap: true,
          wordWrapWidth: constants.STAGE_W,
          align: 'center',
        });
		
        this.testWords.anchor.x = 0.5;
        this.testWords.anchor.y = 0.5;
        this.testWords.position.x = constants.STAGE_W/2;
        this.testWords.position.y = constants.STAGE_H/2 - 25;
		
		
		this.testWords2 = new PIXI.Text("Click to begin", {
          font : "56px Times, Times New Roman, serif",
          fill: "#000000",
          wordWrap: true,
          wordWrapWidth: constants.STAGE_W,
          align: 'center',
        });
		
		this.testWords2.anchor.x = 0.5;
        this.testWords2.anchor.y = 0.5;
        this.testWords2.position.x = constants.STAGE_W/2;
        this.testWords2.position.y = constants.STAGE_H/2 + 100;

        this.stage.addChild(this.testWords);
		this.stage.addChild(this.testWords2);

      },
	  
	  
	  
	  
      onMouseDown: function(point) {
        this.changeScreen(hub);
      },
    });
  }
);