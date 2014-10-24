define(
  ['pixi', 'engine/classes/Screen', 'engine/graphics', 'engine/geometry'],
function(PIXI, Screen, Images, Collisions) {

	SampleMiniGame = new Screen({
		init: function(){
				//Need to declare a "ship" type to match questions, answers, and sprites
				function enemy_ship(sprite, name, question, answer){
				
				}
			  //Need to initialize a question box, an answer box, our ship, and start the enemies

		  },
		  update: function(delta)
		  {
		  //Need to make the ships update their position, stopping once they hit a threshold
		  //We should also include logic here to update points, end the game, or spawn enemies
		  },
		  onKeyDown: function(keyCode)
		  {
		  //Need to add code to take in a key A, B, C, or D, and check it against the answer to the currently selected question
			if (arrayContains(KEYS_EXIT,keyCode))
			{
			  this.changeScreen(TestWorldScreen);
			}
		  },
		  onMouseDown: function(point)
		  {
		  //We can use the mouse to select enemies

		  }
	});
	  return SampleMiniGame;
  }
);