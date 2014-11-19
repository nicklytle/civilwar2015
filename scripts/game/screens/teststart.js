define(
  ['pixi', 'engine/classes/Screen', '../constants',
  'game/screens/GameHub'],
  function(PIXI, Screen, constants, GameHub) {
    return new Screen ({
      init: function() {
        var self = this;
        this.gameScreen = GameHub;
        // console.log($);
	  
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
		
		
        this.status = new PIXI.Text("Click to begin!", {
          font : "56px Times, Times New Roman, serif",
          fill: "#000000",
          wordWrap: true,
          wordWrapWidth: constants.STAGE_W,
          align: 'center',
        });
		
		    this.status.anchor.x = 0.5;
        this.status.anchor.y = 0.5;
        this.status.position.x = constants.STAGE_W/2;
        this.status.position.y = constants.STAGE_H/2 + 100;
        this.stage.addChild(this.testWords);
		    this.stage.addChild(this.status);

      },
	  
	  
	  
	  
      onMouseDown: function(point) {
        if (!this.gameScreen) return;
        this.changeScreen(this.gameScreen);
      },
    });
  }
);