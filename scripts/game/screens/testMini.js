define(
  ['pixi', 'engine/classes/Screen', 'engine/graphics', 'engine/geometry'],
function(PIXI, Screen, Images, Collisions) {
console.log("GETHERE");
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
	var SampleMiniGame = new Screen({
		init: function(){
				//Need to declare a "ship" type to match questions, answers, and sprites
			  //Need to initialize a question box, an answer box, our ship, and start the enemies
			var backMap = Images.getTexture("minibg.png");
			var back = new PIXI.Sprite(backMap);
			back.scale.x *= .7;
			back.scale.y *= .7;
			this.stage.addChild(back);
			//var this.enemySet = [];
			this.questions = ["What is your name?","What is your quest?"];
			this.num_questions = 2;
			this.answers = ['A','B'];
			this.playerShip = new enemy_ship(new PIXI.Sprite(Images.getTexture("ironclad.png")),"Player","","Q");
			this.playerShip.sprite.position.x = 370;
			this.playerShip.sprite.position.y = 200;
			this.stage.addChild(this.playerShip.sprite);
			this.playerLives = 2;
			this.round = 1;
			this.enemies = 3;
			this.yCoord = 0;
			this.isActiveEnemy = false;
			this.enemyTexture = [];
			this.enemyTexture.push(Images.getTexture("woodship.png"));
			this.answerText1 = new PIXI.Text("A: UNION",{font:"30px Arial ", fill:"blue"});
			this.answerText1.position.x = 500;
			this.answerText1.position.y = 500;
			this.stage.addChild(this.answerText1);
			this.answerText2 = new PIXI.Text("B: CONFEDERACY",{font:"30px Arial ", fill:"gray"});
			this.answerText2.position.x = 500;
			this.answerText2.position.y = 550;
			this.stage.addChild(this.answerText2);
			//Array of questions, randomly chosen, 3 lives per round, round length increases
			//Keys A and B 65 and 66
		  },
		  update: function(delta)
		  {
		  //Need to make the ships update their position, stopping once they hit a threshold
		  //We should also include logic here to update points, end the game, or spawn enemies
			if(this.enemies < 1){
				if(this.round > 3){
					alert("YOU WIN!");
					this.changeScreen(TestWorldScreen);
				}else{
					this.round = this.round + 1;
					this.enemies = this.round * 3;
				}
			}
			if(this.isActiveEnemy == false){
				this.isActiveEnemy = true;
				this.randomIndex = Math.floor(Math.random() * this.num_questions);
				console.log(this.randomIndex);
				this.enemy = new enemy_ship(new PIXI.MovieClip(this.enemyTexture),"Enemy",this.questions[this.randomIndex],this.answers[this.randomIndex]);
				this.stage.addChild(this.enemy.sprite);
				this.enemy.sprite.position.x = -100;
				this.yCoord = Math.floor(Math.random() * 100) + 1;
				this.enemy.sprite.position.y = this.yCoord + 300;
				this.questionText = new PIXI.Text(this.enemy.question,{font:"40px Arial", fill:"black"});
				this.stage.addChild(this.questionText);
			}
			if(this.isActiveEnemy == true){
				if(this.enemy.sprite.position.x < 300){
					this.enemy.sprite.position.x++;
				}
			}
		  },
		  onKeyDown: function(keyCode)
		  {
			  this.answerSubmitted = 'A';
			  if(keyCode == 65){
					console.log("PRESSED A");
					/*if(this.enemy.answer == 'A'){
						this.isActiveEnemy = false;
						this.stage.removeChild(this.enemy.sprite);
						this.stage.removeChild(this.questionText);
					}*/
			  }
			  if(keyCode == 66){
					console.log("PRESSED B");
					this.answerSubmitted = 'B';
					/*if(this.enemy.answer == 'B'){
						this.isActiveEnemy = false;
						this.stage.removeChild(this.enemy.sprite);
						this.stage.removeChild(this.questionText);
					}*/
			  }
			  if(this.enemy.isCorrect(this.answerSubmitted)){
						this.isActiveEnemy = false;
						this.stage.removeChild(this.enemy.sprite);
						this.stage.removeChild(this.questionText);
						this.enemies--;
			  }else{
						this.playerLives--;
						if(this.playerLives < 1){
							alert("YOU LOSE!");
							this.changeScreen(TestWorldScreen);
						}
			  }
		  //Need to add code to take in a key A, B, C, or D, and check it against the answer to the currently selected question
			/*if (arrayContains(KEYS_EXIT,keyCode))
			{
			  this.changeScreen(TestWorldScreen);
			}*/
		  },
		  onMouseDown: function(point)
		  {
		  //We can use the mouse to select enemies

		  }
	});
	console.log("WTFMATE");
	  return SampleMiniGame;
  }
);