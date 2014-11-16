define(
  ['pixi', 'engine/classes/Screen', 'engine/graphics', 'engine/geometry', 'engine/arrays', '../constants', 'engine/base', '../npcloader'],
   function(PIXI, Screen, Images, Collisions, Arrays, constants) {  


TestPauseScreen = new Screen({
  
init: function()
  {
   
    
    var background = Images.getTexture("testpausescreen.png");
    var back = new PIXI.Sprite(background);
    var pdoge = Images.getTexture("doge.png");
    var doge = new PIXI.Sprite(pdoge);

     
    var newClip = [];
    newClip.push(Images.getTexture("pressed_button.png"));
    newClip.push(Images.getTexture("unpressed_button.png"));
     

    var button; = new PIXI.MovieClip(newClip);

   // var ub = Images.getTexture("unpressed_button.png");
    //var pb = Images.getTexture("pressed_button.png");
    //var button = new PIXI.Sprite(ub);
    //var pbutton = new PIXI.Sprite(pb);



    // randomize their positions
    doge.position.x = 0 * constants.STAGE_W;
    doge.position.y = 1.03 * constants.STAGE_H;

    button.position.x = 0.6 * constants.STAGE_W; 
    button.position.y = 0.6 * constants.STAGE_H;

   // pbutton.position.x = 1 * constants.STAGE_W; 
   // pbutton.position.y = 1 * constants.STAGE_H; 


    // center their anchor points
    doge.anchor.x = 0.5;
    doge.anchor.y = 0.5;

    button.anchor.x = 0.5;
    button.anchor.y = 0.5; 

    // add a name var to track them
    doge.name = "doge";
   // pbutton.name = "pbutton";
   // button.name = "button";

    // put 'em onstage
     
    doge.interactive = true;
    doge.mousedown = function () {
    alert("much wow");
      };

    button.interactive = true; 
    button.mousedown = function () { 
      alert("button down clicked");
    };

    this.stage.addChild(back);
    this.stage.addChild(doge);
    
    //this.stage.addChild(pbutton);
   
    // create PIXI MovieClip
      var newClip = [];
      
     

      this.stage.addChild(button);
  
  },
 onKeyDown: function(keyCode)
  {
   if (Arrays.containsElement(constants.KEYS_EXIT,keyCode))
    {
      this.changeScreen(TestWorldScreen);
    } else if (Arrays.containsElement(constants.KEYS_INTERACT,keyCode)) { 
        this.changeScreen(SampleMiniGame);
    }

  }

  });

 return TestPauseScreen;

});