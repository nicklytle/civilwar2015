define(
  ['pixi', 'engine/classes/Screen', 'engine/graphics', 'engine/geometry'],
function(PIXI, Screen, Images, Collisions) {

	SampleMiniGame = new Screen({
		init: function(){
				//Need to declare a "ship" type to match questions, answers, and sprites
				function enemy_ship(sprite, name, question, answer){
					this.sprite = sprite;
					this.name = name;
					this.question = question;
					this.answer = answer;
					this.isCorrect = function(ans){
						if(ans == answer){
							return true;
						}else{
							return false;
						}
					}
				}
			  //Need to initialize a question box, an answer box, our ship, and start the enemies
			//var backMap = Images.getTexture("map.png");
			//var back = new PIXI.Sprite(backMap);
			//this.stage.addChild(back);
			//var this.enemySet = [];
			var this.questions = [];
			var this.num_questions = 0;
			var this.answers = [];
			var this.playerShip = enemy_ship(,"Player","","Q");
			var this.playerLives = 2;
			var this.round = 1;
			var this.enemies = 3;
			var this.yCoord = 0;
			var this.isActiveEnemy = false;
			//Array of questions, randomly chosen, 3 lives per round, round length increases
			//Keys A and B 65 and 66
		  },
		  update: function(delta)
		  {
		  //Need to make the ships update their position, stopping once they hit a threshold
		  //We should also include logic here to update points, end the game, or spawn enemies
			if(this.enemies < 1){
				if(this.round > 3){
					this.changeScreen(TestWorldScreen);
				}else{
					this.round = this.round + 1;
					this.enemies = this.round * 3;
				}
			}
			if(this.isActiveEnemy == false){
				this.isActiveEnemy = true;
				var this.randomIndex = Math.floor(Math.random() * this.num_questions) + 1;
				this.enemy = new enemy_ship(,"Enemy",this.questions[this.randomIndex],this.answers[this.randomIndex]);
				this.stage.addChild(enemy.sprite);
				tempnode.sprite.position.x = -100;
				this.yCoord = Math.floor(Math.random() * constants.STAGE_H) + 1;
				tempnode.sprite.position.y = this.yCoord;
			}
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